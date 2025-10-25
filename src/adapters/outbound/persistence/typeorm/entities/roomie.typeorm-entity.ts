import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'roomies' })
export class RoomieEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'int' })
  age!: number;

  @Column({ type: 'varchar', length: 255 })
  avatar!: string;

  @Column({ type: 'boolean', default: false })
  verified!: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating!: number;

  @Column({ type: 'int', default: 0 })
  reviews!: number;

  @Column({ type: 'varchar', length: 100 })
  location!: string;

  @Column({ type: 'boolean', default: false })
  hasApartment!: boolean;

  @Column({ type: 'json' })
  budget!: { min: number; max: number };

  @Column({ type: 'text' })
  bio!: string;

  @Column({ type: 'json' })
  interests!: string[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  occupation?: string;

  @Column({ type: 'int', nullable: true })
  socialLevel?: number;

  @Column({ type: 'int', nullable: true })
  cleanlinessLevel?: number;

  @Column({ type: 'boolean', nullable: true })
  acceptsSmokers?: boolean;

  @Column({ type: 'boolean', nullable: true })
  acceptsPets?: boolean;

  @Column({ type: 'boolean', nullable: true })
  acceptsGuests?: boolean;

  @Column({ type: 'json', nullable: true })
  languages?: string[];

  @Column({ type: 'json', nullable: true })
  photos?: string[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt!: Date;
}
