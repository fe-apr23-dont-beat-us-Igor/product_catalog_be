import { Column, Table, AllowNull, Unique, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  createdAt: 'false',
  updatedAt: 'false',
})

export class Product extends Model {
  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING
  })
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  capacity: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  priceRegular: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  priceDiscount: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  screen: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  ram: string;
}