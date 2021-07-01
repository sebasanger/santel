export class Image {
  constructor(
    public id: number,
    public path: string,
    public type: 'ROOM' | 'PRODUCT',
    public size: number,
    public title: String
  ) {}
}
