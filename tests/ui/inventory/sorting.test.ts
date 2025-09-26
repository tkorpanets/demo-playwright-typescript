import { loggedUserFixture } from '../fixtures/ui.fixture';
import type { SortByValue } from '../../../src/ui/types/sorting.type';

const cases: Array<{ title: string; sortByValue: SortByValue }> = [
  { title: 'Products are sorted by name from A to Z', sortByValue: 'Name (A to Z)' },
  { title: 'Products are sorted by name from Z to A', sortByValue: 'Name (Z to A)' },
  { title: 'Products are sorted by price from low to high', sortByValue: 'Price (low to high)' },
  { title: 'Products are sorted by price from high to low', sortByValue: 'Price (high to low)' },
];

for (const { title, sortByValue } of cases) {
  loggedUserFixture(title, { tag: '@inventory' }, async ({ app: { header, inventory } }) => {
    await header.productSort.sortBy(sortByValue);
    await inventory.checkSortingBy(sortByValue);
  });
}
