import PricingRule from '../src/check-out/pricing-rules/pricing-rule';
import BundlePricingRule from '../src/check-out/pricing-rules/bundle-pricing-rule';

import SKU_IDS from '../src/check-out/sku-ids';
import SkuItem from '../src/check-out/sku-item';

test('BundlePricingRule buffers vga and mbp items', () => {
  const bundlePricingRule = new BundlePricingRule([SKU_IDS.mbp, SKU_IDS.vga]);
  const skuItem = new SkuItem(SKU_IDS.mbp, 'MacBook Pro', 139999);
  const skuItem2 = new SkuItem(SKU_IDS.atv, 'Apple TV', 10950);
  const skuItem3 = new SkuItem(SKU_IDS.vga, 'VGA adapter', 3000);
  bundlePricingRule.memoSkuItem(skuItem);
  bundlePricingRule.memoSkuItem(skuItem2);
  bundlePricingRule.memoSkuItem(skuItem3);
  expect(bundlePricingRule.bufferHasSkuItem(skuItem)).toBeTruthy();
  expect(bundlePricingRule.bufferHasSkuItem(skuItem2)).not.toBeTruthy();
  expect(bundlePricingRule.bufferHasSkuItem(skuItem3)).toBeTruthy();
});

test('BundlePricingRule checking out 1 mbp ends up without price changes', () => {
  const bundlePricingRule = new BundlePricingRule([SKU_IDS.mbp, SKU_IDS.vga]);
  const skuItem = new SkuItem(SKU_IDS.mbp, 'MacBook Pro', 139999);
  const skuItem2 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem3 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  bundlePricingRule.checkOut(skuItem);
  bundlePricingRule.checkOut(skuItem2);
  bundlePricingRule.checkOut(skuItem3);
  expect(skuItem.price).toBe(139999);
  expect(skuItem2.price).toBe(54999);
  expect(skuItem3.price).toBe(54999);
});

test('BundlePricingRule checking out 1 vga and 0 mbp ends up without price changes', () => {
  const bundlePricingRule = new BundlePricingRule([SKU_IDS.mbp, SKU_IDS.vga]);
  // const skuItem = new SkuItem(SKU_IDS.mbp, 'MacBook Pro', 139999);
  const skuItem = new SkuItem(SKU_IDS.vga, 'VGA adapter', 3000);
  const skuItem2 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem3 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  bundlePricingRule.checkOut(skuItem);
  bundlePricingRule.checkOut(skuItem2);
  bundlePricingRule.checkOut(skuItem3);
  expect(skuItem.price).toBe(3000);
  expect(skuItem2.price).toBe(54999);
  expect(skuItem3.price).toBe(54999);
});

test('BundlePricingRule checking out 2 vga and 1 mbp ends up with 1 vga paid', () => {
  const bundlePricingRule = new BundlePricingRule([SKU_IDS.mbp, SKU_IDS.vga]);
  // const skuItem = new SkuItem(SKU_IDS.mbp, 'MacBook Pro', 139999);
  const skuItem = new SkuItem(SKU_IDS.vga, 'VGA adapter', 3000);
  const skuItem2 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem3 = new SkuItem(SKU_IDS.mbp, 'MacBook Pro', 139999);
  const skuItem4 = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  const skuItem5 = new SkuItem(SKU_IDS.vga, 'VGA adapter', 3000);
  bundlePricingRule.checkOut(skuItem);
  bundlePricingRule.checkOut(skuItem2);
  bundlePricingRule.checkOut(skuItem3);
  bundlePricingRule.checkOut(skuItem4);
  bundlePricingRule.checkOut(skuItem5);
  expect(skuItem.price).toBe(0);
  expect(skuItem2.price).toBe(54999);
  expect(skuItem3.price).toBe(139999);
  expect(skuItem5.price).toBe(3000);
});


