export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export interface UpdateableItem {
  updateItem(): void;
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (this.isUpdateableItem(item)) {
        item.updateItem();
      } else {
        this.updateItem(item);
      }
    }

    return this.items;
  }

  private isUpdateableItem(item: any): item is UpdateableItem {
    return item && typeof item.updateItem === 'function';
  }

  private updateItem(item: Item) {
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
          if (item.name === 'Conjured Mana Cake') {
            item.quality = item.quality - 2
          } else {
            item.quality = item.quality - 1
          }
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
        }
      }
    }
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
              item.quality = item.quality - 1
            }
          }
        } else {
          item.quality = item.quality - item.quality
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
        }
      }
    }
  }
}

export class AgedBrie extends Item implements UpdateableItem {
  updateItem() {
    if (this.quality < 50) {
      this.quality++;
    }
    this.sellIn--;
    if (this.sellIn < 0) {
      if (this.quality < 50) {
        this.quality++;
      }
    }
  }
}

export class BackstagePasses extends Item implements UpdateableItem {
  updateItem() {
    if (this.quality < 50) {
      this.quality++;
      if (this.sellIn < 11 && this.quality < 50) {
        this.quality++;
      }
      if (this.sellIn < 6 && this.quality < 50) {
        this.quality++;
      }
    }
    if (this.sellIn <= 0) {
      this.quality = 0;
    }
    this.sellIn--;
  }
}

export class Sulfuras extends Item implements UpdateableItem {
  updateItem() {
    // Do nothing, as quality and sellIn never change
  }
}

export class ConjuredManaCake extends Item implements UpdateableItem {
  updateItem() {
    if (this.quality > 0) {
      this.quality -= 2;
    }
    this.sellIn--;
  }
}
