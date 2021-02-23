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
    const originalPage: Page<number> = Page.build([1, 2, 3], 1, 2, 3);

    const newPage: Page<number> = originalPage.map((value: number) => value * 2);
    expect(originalPage[0]).toEqual(1);
    expect(originalPage[1]).toEqual(3);
    expect(originalPage[2]).toEqual(3);
    expect(originalPage.totalItems).toEqual(3);
    expect(originalPage.itemsPerPage).toEqual(2);
    expect(originalPage.currentPage).toEqual(1);
  });
});
