import PricingRule from '../src/check-out/pricing-rules/pricing-rule';
import BulkDiscountPricingRule from '../src/check-out/pricing-rules/bulk-discount-pricing-rule';

import SKU_IDS from '../src/check-out/sku-ids';
import SkuItem from '../src/check-out/sku-item';

test('BulkDiscountPricingRule for ipad buffers ipad item', () => {
  const bulkDiscountPricingRule = new BulkDiscountPricingRule([SKU_IDS.ipd], 4, 49999);
  const skuItem = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem2 = new SkuItem(SKU_IDS.atv, 'Apple TV', 10950);
  bulkDiscountPricingRule.memoSkuItem(skuItem);
  expect(bulkDiscountPricingRule.bufferHasSkuItem(skuItem)).toBeTruthy();
  expect(bulkDiscountPricingRule.bufferHasSkuItem(skuItem2)).not.toBeTruthy();
});

test('BulkDiscountPricingRule checking out 3 ipads ends up without price changes', () => {
  const bulkDiscountPricingRule = new BulkDiscountPricingRule([SKU_IDS.ipd], 4, 49999);
  const skuItem = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem2 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem3 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  bulkDiscountPricingRule.checkOut(skuItem);
  bulkDiscountPricingRule.checkOut(skuItem2);
  bulkDiscountPricingRule.checkOut(skuItem3);
  expect(skuItem.price).toBe(54999);
  expect(skuItem2.price).toBe(54999);
  expect(skuItem3.price).toBe(54999);
});

test('BulkDiscountPricingRule checking out 6 ipads ends up with 5th, 6th prices set to 499.99', () => {
  const bulkDiscountPricingRule = new BulkDiscountPricingRule([SKU_IDS.ipd], 4, 49999);
  const skuItems = [];
  for(let i = 0; i < 6; i++) {
    const skuItem = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
    skuItems.push(skuItem);
    bulkDiscountPricingRule.checkOut(skuItem);
  }

  skuItems.forEach((skuItem) => expect(skuItem.price).toBe(49999));
});
