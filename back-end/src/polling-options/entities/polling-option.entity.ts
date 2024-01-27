import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PollingEntity } from 'src/polling/entities/polling.entity';

@Entity('polling-option')
export class PollingOptionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.pollingOptions)
  public user!: UserEntity;

  @ManyToOne(() => PollingEntity, (polling) => polling.pollingOptions)
  public polling!: UserEntity;
}
