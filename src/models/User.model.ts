import {
  Column,
  Table,
  AllowNull,
  Unique,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Image } from './Image.model';
import { Data } from './Data.model';


@Table({
  tableName: 'users',
  updatedAt: false,
  createdAt: false,
})
export class User extends Model {
  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  username: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @AllowNull(false)
  @ForeignKey(() => Data)
  @Column({
    type: DataType.INTEGER,
    field: 'data_id',
  })
  data_id: number;

  @BelongsTo(() => Data)
  data: Data | null;
}