Moralis.Cloud.afterSave('ItemListed', async (request) => {
  const confirmed = request.object.get('confirmed');
  const logger = Moralis.Cloud.getLogger();
  logger.info(`Marketplace ! Object ${request.object}`);

  if (confirmed) {
    logger.info('Item found');
    const ActiveItem = Moralis.Object.extend('ActiveItem');

    const query = new Moralis.Query(ActiveItem);
    query.equalTo('marketplaceAddress', request.object.get('address'));
    query.equalTo('nftAddress', request.object.get('nftAddress'));
    query.equalTo('tokenId', request.object.get('tokenId'));
    query.equalTo('seller', request.object.get('seller'));

    const alreadyListed = await query.first();
    if (alreadyListed) {
      logger.info(
        'Deleting already listed items. Will be recreated with updated values',
      );
      await alreadyListed.destroy();
      logger.info(
        `Deleted item with tokenId ${request.object.get(
          'tokenId',
        )} at address ${request.object.get(
          'address',
        )} since it has aleady been listed. `,
      );
    }

    const activeItem = new ActiveItem();
    activeItem.set('marketplaceAddress', request.object.get('address'));
    activeItem.set('nftAddress', request.object.get('nftAddress'));
    activeItem.set('price', request.object.get('price'));
    activeItem.set('tokenId', request.object.get('tokenId'));
    activeItem.set('seller', request.object.get('seller'));

    logger.info(
      `Addeding address: ${request.object.get(
        'address',
      )}, tokenId: ${request.object.get('tokenId')}`,
    );

    logger.info('Saving...');
    await activeItem.save();
  }
});

Moralis.Cloud.afterSave('ItemCancelled', async (request) => {
  const confirmed = request.object.get('confirmed');
  logger.info(`Marketplace | Object: ${request.object}`);
  if (confirmed) {
    const logger = Moralis.Cloud.getLogger();
    const ActiveItem = Moralis.Object.extend('ActiveItem');
    const query = new Moralis.Query(ActiveItem);
    query.equalTo('marketplaceAddress', request.object.get('address'));
    query.equalTo('nftAddress', request.object.get('nftAddress'));
    query.equalTo('tokenId', request.object.get('tokenId'));
    logger.info(`Marketplace | Query: ${query}`);
    const canceledItem = await query.first();
    logger.info(`Marketplace | CanceledItem: ${JSON.stringify(canceledItem)}`);
    if (canceledItem) {
      logger.info(`Deleting ${canceledItem.id}`);
      await canceledItem.destroy();
      logger.info(
        `Deleted item with tokenId ${request.object.get(
          'tokenId',
        )} at address ${request.object.get('address')} since it was canceled. `,
      );
    } else {
      logger.info(
        `No active item found with address: ${request.object.get(
          'address',
        )} and tokenId: ${request.object.get('tokenId')}.`,
      );
    }
  }
});

Moralis.Cloud.afterSave('ItemSold', async (request) => {
  const confirmed = request.object.get('confirmed');
  logger.info(`Marketplace | Object: ${request.object}`);
  if (confirmed) {
    const logger = Moralis.Cloud.getLogger();
    const ActiveItem = Moralis.Object.extend('ActiveItem');
    const query = new Moralis.Query(ActiveItem);
    query.equalTo('marketplaceAddress', request.object.get('address'));
    query.equalTo('nftAddress', request.object.get('nftAddress'));
    query.equalTo('tokenId', request.object.get('tokenId'));
    logger.info(`Marketplace | Query: ${query}`);
    const soldItem = await query.first();
    logger.info(`Marketplace | soldItem: ${JSON.stringify(soldItem)}`);
    if (soldItem) {
      logger.info(`Deleting ${soldItem.id}`);
      await soldItem.destroy();
      logger.info(
        `Deleted item with tokenId ${request.object.get(
          'tokenId',
        )} at address ${request.object.get('address')} since it was sold. `,
      );
    } else {
      logger.info(
        `No active item found with address: ${request.object.get(
          'address',
        )} and tokenId: ${request.object.get('tokenId')}.`,
      );
    }
  }
});
