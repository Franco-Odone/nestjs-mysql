// Entidades en TypeORM
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

// Lo que se coloca adentro del decorador Column() es para la table y lo que está debajo es para Typescript.
//{ name: 'users'} es el nombre de la tabla que se va a crear, debe ser en plural.
@Entity({ name: 'users' })
class User {
  // Qué columnas quiero que tenga mi tabla
  // PrimaryGeneratedColumn() es un decorador que nos permite generar los id's de manera automática e indicar que son una Primary Key.
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // nullable: true -> indica que no es un dato obligatorio.
  @Column({ nullable: true })
  authStrategy: string;
  // En la entidad User, el decorador @OneToOne() se usa para especificar que la entidad User tiene una relación "uno es a uno" con
  // la entidad Profile. El parámetro que se pasa al decorador es () => Profile, que especifica que la entidad Profile es la entidad
  // secundaria en la relación.
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}

export { User };
