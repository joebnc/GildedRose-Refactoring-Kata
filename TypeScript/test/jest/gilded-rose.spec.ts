import {Item, GildedRose} from '@/gilded-rose';
import gildedRosePlay from './gilded-rose.json';

describe('Gilded Rose', () => {
  function assertItem(dayNumber: string, item: Item, sellIn: number, quality: number) {
    expect(item.sellIn, `${dayNumber}, ${item.name} sellIn: ${item.sellIn} to be ${sellIn}`).toBe(sellIn);
    expect(item.quality, `${dayNumber}, ${item.name} quality: ${item.quality} to be ${quality}`).toBe(quality);
  }

  function assertItems(dayNumber: string, gildedRose: GildedRose) {
    const dayPlay = gildedRosePlay[dayNumber];
    for (let i: number = 0; i < gildedRose.items.length; i++) {
      let dayItems = dayPlay.items[i];
      assertItem(dayNumber, gildedRose.items[i], dayItems.sellIn, dayItems.quality);
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
      new Item("Conjured Mana Cake", 3, 6),
      new Item("Conjured Mana Cake", 3, 8)
    ]);

    for (let day = 0; day < 10; day++) {
      assertItems("day " + day, gildedRose);
      gildedRose.updateQuality();
    }
  });
});
