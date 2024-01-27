import {
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
