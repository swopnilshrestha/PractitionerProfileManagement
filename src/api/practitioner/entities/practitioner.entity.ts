import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Practitioner extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public email: string;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public phoneNumber: string;

  @Column({ type: 'varchar' })
  public city: string;

  @Column({ type: 'date', nullable: true })
  public nextAppointment: Date | null;

  @Column({ type: 'date', nullable: true })
  public lastAppointment: Date | null;

  @Column({ type: 'date', default: null })
  public registerDate: Date | null;
}
