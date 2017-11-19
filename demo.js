import {
  CheckOut,
  SkuItem,
  SKU_IDS,
  PricingRule,
  NthFreePricingRule,
  BundlePricingRule,
  BulkDiscountPricingRule
} from './src/check-out';

import prompt from 'prompt';

prompt.start();
prompt.get(['skus'], function (err, result) {
  if (err) { return onErr(err); }
  console.log('SKUs Scanned: ' + result.skus);

  const co = new CheckOut(createPricingRules());
  const skus = result.skus.split(',').map(sku => sku.trim()).filter(sku => sku);
  console.log(`type: ${typeof skus}, skus: ${skus[1]}`);
  const skuItems = skus.map((sku) => {
    const skuItem = generateSkuItem(sku);
    console.log(`sku: ${sku}, skuItem: ${JSON.stringify(skuItem)}`);
    return skuItem;
  });
  console.log(`skuItesm: ${JSON.stringify(skuItems)}`);

  skuItems.forEach((skuItem) => co.checkOut(skuItem));

  console.log('Total expected: ', co.total());
});

function onErr(err) {
  console.log(err);
  return 1;
}

function createPricingRules() {
  return [
    new NthFreePricingRule([SKU_IDS.atv], 3),
    new BulkDiscountPricingRule([SKU_IDS.ipd], 4, 49999),
    new BundlePricingRule([SKU_IDS.mbp, SKU_IDS.vga]),
  ]
}

// const items = ['ipd', 'ipd', 'ipd'].map((sku) => generateSkuItem(sku));
// console.log(`items: ${JSON.stringify(items)}`);

function generateSkuItem(sku) {
  switch(sku) {
    case 'ipd':
     return new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);

    case 'mbp':
     return new SkuItem(SKU_IDS.mbp, 'MacBook Pro', 139999);
    
    case 'atv':
     return new SkuItem(SKU_IDS.atv, 'Apple TV', 10950);
    
    case 'vga':
     return new SkuItem(SKU_IDS.vga, 'VGA adapter', 3000);

    default:
     return new Error(`invalid sku '${sku}'`);
  }
}
