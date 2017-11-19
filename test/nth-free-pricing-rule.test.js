import PricingRule from '../src/check-out/pricing-rules/pricing-rule';
import NthFreePricingRule from '../src/check-out/pricing-rules/nth-free-pricing-rule';

import SKU_IDS from '../src/check-out/sku-ids';
import SkuItem from '../src/check-out/sku-item';


test('NthFreePricingRule for atv buffers atv item', () => {
  const freePricingRule = new NthFreePricingRule([SKU_IDS.atv], 3);
  const skuItem = new SkuItem(SKU_IDS.atv, 'Apple TV', 10950);
  const skuItem2 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  freePricingRule.memoSkuItem(skuItem);
  freePricingRule.memoSkuItem(skuItem2);
  expect(freePricingRule.bufferHasSkuItem(skuItem)).toBeTruthy();
  expect(freePricingRule.bufferHasSkuItem(skuItem2)).not.toBeTruthy();
});

test('NthFreePricingRule checking out 3 ipads with 3rd ipad being free', () => {
  const freePricingRule = new NthFreePricingRule([SKU_IDS.ipd], 3);
  const skuItem = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem2 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem3 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  freePricingRule.checkOut(skuItem);
  freePricingRule.checkOut(skuItem2);
  freePricingRule.checkOut(skuItem3);
  expect(skuItem.price).toBe(54999);
  expect(skuItem2.price).toBe(54999);
  expect(skuItem3.price).toBe(0);
});

test('NthFreePricingRule checking out 4 ipads end up with 3rd being free and 4th being at full price', () => {
  const freePricingRule = new NthFreePricingRule([SKU_IDS.ipd], 3);
  const skuItem = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem2 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem3 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem4 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  freePricingRule.checkOut(skuItem);
  freePricingRule.checkOut(skuItem2);
  freePricingRule.checkOut(skuItem3);
  freePricingRule.checkOut(skuItem4);
  expect(skuItem.price).toBe(54999);
  expect(skuItem2.price).toBe(54999);
  expect(skuItem3.price).toBe(0);
  expect(skuItem4.price).toBe(54999);
});

test('NthFreePricingRule checking out 7 ipads end up with all prices set to bulk price', () => {
  const freePricingRule = new NthFreePricingRule([SKU_IDS.ipd], 3);
  const skuItems = [];
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.push(new SkuItem(SKU_IDS.mbp, 'MacBook Pro', 139999));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.push(new SkuItem(SKU_IDS.atv, 'Apple TV', 10950));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.push(new SkuItem(SKU_IDS.vga, 'VGA adapter', 3000));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.forEach((skuItem) => freePricingRule.checkOut(skuItem));
  expect(skuItems[0].price).toBe(54999);
  expect(skuItems[2].price).toBe(0);
  expect(skuItems[3].price).toBe(54999);
  expect(skuItems[7].price).toBe(0);
});

