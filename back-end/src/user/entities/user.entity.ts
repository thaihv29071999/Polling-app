import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { PollingEntity } from 'src/polling/entities/polling.entity';
import { PollingOptionEntity } from 'src/polling/entities/polling-option.entity';
import { PollingOptionUserEntity } from 'src/polling/entities/polling-option-user.entity';

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

  @OneToMany(() => PollingEntity, (polling) => polling.user, { cascade: true })
  public pollings!: PollingEntity[];

  @OneToMany(() => PollingOptionUserEntity, (optionUser) => optionUser.user, {
    cascade: true,
  })
  public optionUsers!: PollingOptionUserEntity[];
}
