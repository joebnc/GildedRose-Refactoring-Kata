import {Item, GildedRose} from '@/gilded-rose';

describe('Gilded Rose', () => {
  function assertItem(item: Item, sellIn: number, quality: number) {
    expect(item.sellIn).toBe(sellIn);
    expect(item.quality).toBe(quality);
  }

  it('should update item quality and sellIn values correctly', () => {
    const gildedRose = new GildedRose([
      new Item("+5 Dexterity Vest", 10, 20), //
      new Item("Aged Brie", 2, 0), //
      new Item("Elixir of the Mongoose", 5, 7), //
      new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6)]
    );

    // day 1
    gildedRose.updateQuality();


    // Assert the updated item values
    assertItem(gildedRose.items[0], 9, 19)
    assertItem(gildedRose.items[1], 1, 1);
    assertItem(gildedRose.items[2], 4, 6);
    assertItem(gildedRose.items[3], 0, 80);
    assertItem(gildedRose.items[4], -1, 80);
    assertItem(gildedRose.items[5], 14, 21);
    assertItem(gildedRose.items[6], 9, 50);
    assertItem(gildedRose.items[7], 4, 50);

    // day 2
    gildedRose.updateQuality();

    // Assert the updated item values
    assertItem(gildedRose.items[0], 8, 18)
    assertItem(gildedRose.items[1], 0, 2);
    assertItem(gildedRose.items[2], 3, 5);
    assertItem(gildedRose.items[3], 0, 80);
    assertItem(gildedRose.items[4], -1, 80);
    assertItem(gildedRose.items[5], 13, 22);
    assertItem(gildedRose.items[6], 8, 50);
    assertItem(gildedRose.items[7], 3, 50);

  });
});
