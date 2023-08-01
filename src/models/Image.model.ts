import {
  Column,
  Table,
  AllowNull,
  Unique,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'images',
  updatedAt: false,
  createdAt: false,
})
export class Image extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  link1: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  link2: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  link3: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  link4: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  link5: string;
}
