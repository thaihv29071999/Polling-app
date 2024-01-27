import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PollingEntity } from 'src/polling/entities/polling.entity';
import { PollingOptionEntity } from './polling-option.entity';

@Entity('polling-option-user')
export class PollingOptionUserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.optionUsers, {
    onDelete: 'CASCADE',
  })
  public user!: UserEntity;

  @ManyToOne(
    () => PollingOptionEntity,
    (pollingOption) => pollingOption.optionUsers,
    { onDelete: 'CASCADE' },
  )
  public options!: PollingOptionEntity;
}
