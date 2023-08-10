import {
  Column,
  Table,
  AllowNull,
  Unique,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'data',
  updatedAt: false,
  createdAt: false,
})
export class Data extends Model {
  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  favourites: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  cart: string;
}
