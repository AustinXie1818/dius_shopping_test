export default class PricingRule  {
  
  constructor(skus) {
    this._skus = [...skus];
    this._buffer = [];
  }

  matchingSku(skuItem) {
    return this._skus.includes(skuItem.sku);
  }

  memoSkuItem(skuItem) {
    if (!this._skus.includes(skuItem.sku)) {
      return;
    }
    // memoize this matching item to wait for the trigger of this rule
    this._buffer.push(skuItem);
  }

  matchPricingRule(skuItem) {
    // this method should be overriden by child pricing rule classes.
    return undefined;
  }

  applyPricingRule(skuItem) {
    return skuItem && [skuItem.id] || [];
  }

  clearBuffer(skuItemIds) {
    //this._buffer = this._buffer.filter((skuItem) => !skuItemIds.includes(skuItem.id));
    this._buffer = [];
  }

  bufferHasSkuItem(skuItem) {
    return !!this._buffer.find((item) => item.id === skuItem.id);
  }

  checkOut(skuItem) {
    if (!this.matchingSku(skuItem)) {
      // this item is not handled by this rule
      return false;
    }
    // memonize this sku item
    this.memoSkuItem(skuItem);
    // does this sku time match the pricing rule?
    const matchingResult = this.matchPricingRule(skuItem);
    if (!matchingResult) {
      // not yet. continue waiting for new sku items.
      // but return true to indicate this itme has been handled by this rule
      return true;
    }
    // pricing rule met and then apply this rule to amend price
    const skuItemIds = this.applyPricingRule(skuItem, matchingResult);
    // clear memo buffer after applying the rule to get ready for the next trigger
    this.clearBuffer(skuItemIds);
    // return true to indicate this itme has been handled by this rule
    return true;
  }
}
