import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PostCreationAttrs {
  title: string;
  description: string;
  categories: string;
  image: string;
  author: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Post Title', description: 'Post title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Post Description', description: 'Post description' })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ApiProperty({ example: 'home|google', description: 'Post categories' })
  @Column({ type: DataType.STRING })
  categories: string;

  @ApiProperty({
    example: 'https://example.com/test.jpg',
    description: 'Main post image',
  })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({
    example: 'Name LastName',
    description: 'Post author',
  })
  @Column({ type: DataType.STRING })
  author: string;
}
