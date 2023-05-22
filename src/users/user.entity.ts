// Entidades en TypeORM
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}

export { User };
