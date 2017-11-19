import SkuItem from '../src/check-out/sku-item';
import SKU_IDS from '../src/check-out/sku-ids';

test('SkuItem constructed and set price to 100', () => {
  const skutItem = new SkuItem(SKU_IDS.ipd, 'Super iPad', 54999);
  expect(skutItem.price).toBe(54999);
});

test('SkuItem cahnges price from 100 to 200 res', () => {
  const skutItem = new SkuItem(SKU_IDS.ipd, 'Super iPad', 100);
  expect(skutItem.price).toBe(100);
  expect(skutItem.historyPrice).toBe(100);
  skutItem.price = 200;
  expect(skutItem.historyPrice).toBe(100);
  expect(skutItem.price).toBe(200);
});