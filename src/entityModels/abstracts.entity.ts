import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


export abstract class AbstractsEntity {
  @PrimaryGeneratedColumn()
  id: number
  @CreateDateColumn()
  createdAt
  @UpdateDateColumn()
  updatedAt
  @DeleteDateColumn()
  deletedAt
}