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
}