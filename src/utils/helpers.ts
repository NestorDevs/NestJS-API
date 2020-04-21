export default class Helpers {
  static calculatePages(elements: number, perPage: number): number {
    const isRest = (elements % perPage) > 0;

    return isRest ?
      Math.floor((elements) / perPage) + 1 :
      Math.floor((elements) / perPage);
  }
}
