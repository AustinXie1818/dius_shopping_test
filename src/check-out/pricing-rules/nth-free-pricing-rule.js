import PricingRule from './pricing-rule';

export default class NthFreePricingRule extends PricingRule {
  constructor(sku, freeThreshold) {
    super(sku);
    this._freeThreshold = freeThreshold;
  }

  applyPricingRule(skuItem, matchingResult) {
    const freeItem = this._buffer[this._buffer.length - 1];
    skuItem.price = 0;
    // return all ids to clear them from buffer
    return this._buffer.map((skuItem) => skuItem.id);
  }

  matchPricingRule() {
    return this._buffer.length === this._freeThreshold;
  }
}
