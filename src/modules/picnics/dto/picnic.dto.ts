export class PicnicDto {
  _id: string;
  name: string;
  _userId: string;
  date: Date;
  location: string;
  activities: ReadonlyArray<string>;
}
