export class CreatePicnicDto {
  readonly name: string;
  readonly _userId: string;
  readonly date: Date;
  readonly location: string;
  readonly activities?: ReadonlyArray<string>;
}
