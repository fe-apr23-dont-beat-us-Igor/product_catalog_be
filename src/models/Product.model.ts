import { Column, Table, AllowNull, Unique, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: 'products'
})

export class Product extends Model {
  @AllowNull
  @Unique
  @Column({
    type: DataType.STRING
  })
  name: string;

  @Column({
    type: DataType.STRING
  })
  capacity: string;

  @Column({
    type: DataType.NUMBER
  })
  priceRegular: number;

  @Column({
    type: DataType.STRING
  })
  screen: string;

  @Column({
    type: DataType.STRING
  })
  ram: string;
}