import PricingRule from '../src/check-out/pricing-rules/pricing-rule';
import SKU_IDS from '../src/check-out/sku-ids';
import SkuItem from '../src/check-out/sku-item';

test('PricingRule for [ipad, mbp] does not match atv', () => {
  const pricingRule = new PricingRule([SKU_IDS.ipd, SKU_IDS.mbp], 3);
  const skuItem = new SkuItem(SKU_IDS.atv, 'Apple TV', 10950);
  expect(pricingRule.matchingSku(skuItem)).not.toBeTruthy();

  const skuMbp = new SkuItem(SKU_IDS.mbp, 'MacBook Pro', 139999);
  expect(pricingRule.matchingSku(skuMbp)).toBeTruthy();
});
