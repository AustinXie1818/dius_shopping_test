import {
  CheckOut,
  SkuItem,
  SKU_IDS,
  PricingRule,
  NthFreePricingRule,
  BundlePricingRule,
  BulkDiscountPricingRule
} from '../src/check-out';

function createPricingRules() {
  return [
    new NthFreePricingRule([SKU_IDS.atv], 3),
    new BulkDiscountPricingRule([SKU_IDS.ipd], 4, 49999),
    new BundlePricingRule([SKU_IDS.mbp, SKU_IDS.vga]),
  ]
}

test('Check out atv, atv, atv, vga returns $249', () => {
  const co = new CheckOut(createPricingRules());
  const skuItems = [];

  skuItems.push(new SkuItem(SKU_IDS.atv, 'Apple TV', 10950));
  skuItems.push(new SkuItem(SKU_IDS.atv, 'Apple TV', 10950));
  skuItems.push(new SkuItem(SKU_IDS.atv, 'Apple TV', 10950));
  skuItems.push(new SkuItem(SKU_IDS.vga, 'VGA adapter', 3000));

  skuItems.forEach((skuItem) => co.checkOut(skuItem));
  expect(co.total()).toBe('$249.00');
});


test('Check out atv, ipd, ipd, atv, ipd, ipd, ipd returns $2718.95', () => {
  const co = new CheckOut(createPricingRules());
  const skuItems = [];

  skuItems.push(new SkuItem(SKU_IDS.atv, 'Apple TV', 10950));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.push(new SkuItem(SKU_IDS.atv, 'Apple TV', 10950));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  
  skuItems.forEach((skuItem) => co.checkOut(skuItem));
  expect(co.total()).toBe('$2718.95');
});

test('Check out mbp, vga, ipd returns $1949.98', () => {
  const co = new CheckOut(createPricingRules());
  const skuItems = [];

  skuItems.push(new SkuItem(SKU_IDS.mbp, 'MacBook Pro', 139999));
  skuItems.push(new SkuItem(SKU_IDS.vga, 'VGA adapter', 3000));
  skuItems.push(new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999));
  skuItems.forEach((skuItem) => co.checkOut(skuItem));
  
  expect(co.total()).toBe('$1949.98');
});