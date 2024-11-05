import { Page } from './page';

describe('Page', () => {

  it('should map a page to another page with additional informations', () => {
    const originalPage: Page<number> = new Page<number>([1, 2, 3]);
    originalPage.totalItems = 3;
    originalPage.itemsPerPage = 2;
    originalPage.currentPage = 1;

    const newPage: Page<number> = originalPage.map((value: number) => value * 2);
    expect(newPage[0]).toEqual(2);
    expect(newPage[1]).toEqual(4);
    expect(newPage[2]).toEqual(6);
    expect(newPage.totalItems).toEqual(3);
    expect(newPage.itemsPerPage).toEqual(2);
    expect(newPage.currentPage).toEqual(1);
  });

  it('should build a page', () => {
    const page: Page<number> = Page.build([1, 2, 3], 1, 2, 3);

    expect(page[0]).toEqual(1);
    expect(page[1]).toEqual(2);
    expect(page[2]).toEqual(3);
    expect(page.totalItems).toEqual(3);
    expect(page.itemsPerPage).toEqual(2);
    expect(page.currentPage).toEqual(1);
  });
});
