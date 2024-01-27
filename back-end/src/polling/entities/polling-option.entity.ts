import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PollingEntity } from 'src/polling/entities/polling.entity';
import { PollingOptionUserEntity } from './polling-option-user.entity';

@Entity('polling-options')
export class PollingOptionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => PollingEntity, (polling) => polling.pollingOptions, {
    onDelete: 'CASCADE',
  })
  public polling!: PollingEntity;

  @OneToMany(
    () => PollingOptionUserEntity,
    (optionUser) => optionUser.options,
    { cascade: true },
  )
  public optionUsers!: PollingOptionUserEntity[];
}
