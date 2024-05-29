import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { UserEntity } from '../entities';

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
    author: UserEntity;

    @Column()
    likes: number;
}