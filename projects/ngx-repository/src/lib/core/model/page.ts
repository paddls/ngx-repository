export class Page<T = any> extends Array<T> {

  public currentPage: number;

  public itemsPerPage: number;

  public totalItems: number;

  public constructor(args?: any) {
    if (Array.isArray(args)) {
      super(...args);
    } else {
      super(args);
    }

    Object.setPrototypeOf(this, Page.prototype);
  }

  public static build<U>(items: U[] = [], currentPage: number = null, itemsPerPage: number = null, totalItems: number = null): Page<U> {
    const page: Page<U> = new Page<U>(items);

    page.currentPage = currentPage != null ? currentPage : 0;
    page.itemsPerPage = itemsPerPage != null ? itemsPerPage : items.length;
    page.totalItems = totalItems != null ? totalItems : items.length;

    return page;
  }

  public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Page<U> {
    const newPage: Page<U> = new Page(super.map<U>(callbackfn, thisArg));

    newPage.currentPage = this.currentPage;
    newPage.itemsPerPage = this.itemsPerPage;
    newPage.totalItems = this.totalItems;

    return newPage;
  }
}
