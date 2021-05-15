export class Room {
  constructor(
    public id: number,
    public number: number,
    public floor: number,
    public capacity: number,
    public singleBed: number,
    public doubleBed: number,
    public available: boolean,
    public enabled: boolean,
    public deleted: boolean,
    public iamge: string,
    public iamge2: string,
    public iamge3: string
  ) {}
}
