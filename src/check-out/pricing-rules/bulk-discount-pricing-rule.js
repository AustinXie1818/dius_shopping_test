import PricingRule from './pricing-rule';

export default class BulkDiscountPricingRule extends PricingRule {
  constructor(sku, bulkThreshold, bulkPrice) {
    super(sku);
    this._bulkThreshold = bulkThreshold;
    this._bulkPrice = bulkPrice;
  }

  applyPricingRule(skuItem) {
    if (this._buffer.length === this._bulkThreshold + 1) {
      // If the current item is bulkQuantity + 1, such as 4 + 1, then change the prices of all the previous
      // items
      this._buffer.slice(0, this._bulkThreshold).forEach((skuItem) => skuItem.price = this._bulkPrice);
    }
    skuItem.price = this._bulkPrice;
  }

  matchPricingRule(skuItem) {
    //check pricing rule for the new item
    // note: this item has been pushed to buffer
    return this._buffer.length > this._bulkThreshold;
  }

  clearBuffer() {
    // do not clear buffer
  }
}
