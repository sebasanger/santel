export class Room {
  constructor(
    public number: number,
    public floor: number,
    public capacity: number,
    public singleBed: number,
    public doubleBed: number,
    public available: boolean,
    public enabled: boolean,
    public id?: number,
    public deleted?: boolean,
    public iamge?: string,
    public iamge2?: string,
    public iamge3?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
