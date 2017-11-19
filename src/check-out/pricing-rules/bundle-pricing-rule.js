import PricingRule from './pricing-rule';
import SKU_IDS from '../sku-ids';

export default class BundlePricingRule extends PricingRule {
  constructor(skus) {
    super(skus);
    this._mainSku = skus[0];
    this._freeSku = skus[1];
  }

  applyPricingRule(skuItem, matchingResult) {
    const skuItem2 = matchingResult;
    if (skuItem.sku === this._freeSku) {
      skuItem.price = 0;
    } else {
      skuItem2.price = 0;
    }

    return [skuItem.id, skuItem2.id];
  }

  matchPricingRule(skuItem) {
    if (skuItem.sku === this._mainSku) {
      const freeSkuItem = this._buffer.find((skuItem) => skuItem.sku === this._freeSku);
      return freeSkuItem;
    } else if(skuItem.sku === this._freeSku) {
      const freeSkuItem = this._buffer.find((skuItem) => skuItem.sku === this._mainSku);
      return freeSkuItem;
    }

    return undefined;
  }
}
