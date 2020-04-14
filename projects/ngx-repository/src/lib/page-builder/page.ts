export class Page<T> extends Array<T> {

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

  public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Page<U> {
    const newPage: Page<U> = new Page(super.map<U>(callbackfn, thisArg));

    newPage.currentPage = this.currentPage;
    newPage.itemsPerPage = this.itemsPerPage;
    newPage.totalItems = this.totalItems;

    return newPage;
  }
}
