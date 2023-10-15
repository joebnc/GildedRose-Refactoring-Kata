import {Item, GildedRose} from '@/gilded-rose';
import gildedRosePlay from './gilded-rose.json';

describe('Gilded Rose', () => {
  function assertItem(item: Item, sellIn: number, quality: number) {
    expect(item.sellIn).toBe(sellIn);
    expect(item.quality).toBe(quality);
  }

  function assertItems(dayNumber: string, gildedRose: GildedRose) {
    const dayPlay = gildedRosePlay[dayNumber];
    for (let i = 0; i < gildedRose.items.length; i++) {
      let dayItems = dayPlay.items[i];
      assertItem(gildedRose.items[i], dayItems.sellIn, dayItems.quality);
    }
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

    for (let day = 1; day < 10; day++) {
      gildedRose.updateQuality();
      assertItems("day " + day, gildedRose);
    }
  });
});
