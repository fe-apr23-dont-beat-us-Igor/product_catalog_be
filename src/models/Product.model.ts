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
  tableName: 'products',
  updatedAt: false,
  createdAt: false,
})
export class Product extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  itemId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  category: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name: string;
  
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  capacity: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  fullPrice: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  color: string;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  screen: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  ram: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  year: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  available_colors: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  available_capacity: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  image_catalog: string;

  @AllowNull(false)
  @ForeignKey(() => Image)
  @Column({
    type: DataType.INTEGER,
    field: 'image_id',
  })
  image_id: number;

  @BelongsTo(() => Image)
  image: Image | null;
}
