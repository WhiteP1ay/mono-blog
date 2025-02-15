import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { unique: true })
  username!: string;

  @Column("varchar")
  password!: string;

  @Column("boolean", { default: false })
  isAdmin!: boolean;

  @Column("boolean", { default: false })
  isVip!: boolean;
} 