import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AbstractsEntity } from './abstracts.entity';


@Entity()

export class User extends AbstractsEntity{
  @PrimaryGeneratedColumn()
  id: number
  // @CreateDateColumn()
  // createdAt
  // @UpdateDateColumn()
  // updatedAt
  // @DeleteDateColumn()
  // deletedAt
  @Column({unique: true, nullable: true})
  email: string
  @Column()
  password: string

}