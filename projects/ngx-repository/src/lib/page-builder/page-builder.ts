export interface PageBuilder<RS> {

  buildPage(response: RS): any;
}
