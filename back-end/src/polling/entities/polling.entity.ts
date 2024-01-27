import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PollingOptionEntity } from 'src/polling/entities/polling-option.entity';

@Entity('polling')
export class PollingEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.pollings, { onDelete: 'CASCADE' })
  public user!: UserEntity;

  @OneToMany(
    () => PollingOptionEntity,
    (pollingOption) => pollingOption.polling,
    { cascade: true },
  )
  public pollingOptions!: PollingOptionEntity[];
}
