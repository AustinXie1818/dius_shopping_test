import uuidv4 from 'uuid/v4';

export default class SkuItem {
  constructor(sku, name, price) {
    this._id = uuidv4();
    this._sku = sku;
    this._name = name;
    this._historyPrice = price;
    this._price = price;
  }

  get id() {
    return this._id;
  }

  get sku() {
    return this._sku;
  }

  set price(value) {
    this._historyPrice = this._price;
    this._price = value;
  }

  get price() {
    return this._price;
  }

  get historyPrice() {
    return this._historyPrice;
  }

  get name() {
    return this._name;
  }
};
