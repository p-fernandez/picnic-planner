import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PicnicDocument = HydratedDocument<Picnic>;

@Schema()
export class Picnic {
  @Prop({ required: true })
  name: string;

  // TODO: [SHORTCUT] Missing User document to relate to picnics
  @Prop({ required: true })
  _userId: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ required: true })
  location: string;

  @Prop()
  activities: ReadonlyArray<string>;
}

export const PicnicSchema = SchemaFactory.createForClass(Picnic);
