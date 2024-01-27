
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { PollingEntity } from 'src/polling/entities/polling.entity';
import { PollingOptionEntity } from 'src/polling-options/entities/polling-option.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @OneToMany(() => PollingEntity, (polling) => polling.user)
  public pollings!: PollingEntity[];

  @OneToMany(() => PollingOptionEntity, (pollingOption) => pollingOption.user)
  public pollingOptions!: PollingOptionEntity[];
}
