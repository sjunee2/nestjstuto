import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Rank } from 'src/common/enums/rank.enum';
import * as bcrypt from 'bcrypt';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: Rank, default: Rank.Bronze })
    rank: Rank;

    @Column({ nullable: false })
    image?: string;

    @Column({ nullable: false })
    token?: string;

    @BeforeInsert()
    private beforeInsert() {
      this.password = bcrypt.hashSync(this.password, 10);
    }

    @CreateDateColumn({ type: 'date' })
    createdAt: Date;
}