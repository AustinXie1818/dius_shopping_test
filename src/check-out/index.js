
import SkuItem from './sku-item';
import SKU_IDS from './sku-ids';

import PricingRule from './pricing-rules/pricing-rule';
import NthFreePricingRule from './pricing-rules/nth-free-pricing-rule';
import BundlePricingRule from './pricing-rules/bundle-pricing-rule';
import BulkDiscountPricingRule from './pricing-rules/bulk-discount-pricing-rule';

export default class CheckOut {
  constructor(pricingRules) {
    this._pricingRules = pricingRules;
    this._checkedItems = [];
  }

  checkOut(skuItem) {
    this._checkedItems.push(skuItem);
    for(let i = 0; i < this._pricingRules.length; i++) {
      const pricingRule = this._pricingRules[i];
      const checked = pricingRule.checkOut(skuItem);
      if (checked) {
        break;
      }
    }
  }

  total() {
    const totalPrice = this.totalPrice();
    return `$${(totalPrice / 100).toFixed(2)}`;
  }

  totalPrice() {
    return this._checkedItems.reduce((sum, skuItem) => sum + skuItem.price, 0);
  }
}

export {
  CheckOut,
  SkuItem,
  SKU_IDS,
  PricingRule,
  NthFreePricingRule,
  BundlePricingRule,
  BulkDiscountPricingRule
};