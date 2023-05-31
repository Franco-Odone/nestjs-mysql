import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_profile')
class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  age: number;
  // En la entidad Profile, el decorador @OneToOne() se usa para especificar que la entidad Profile tiene una relación "uno es a uno"
  // con la entidad User. El parámetro que se pasa al decorador es () => User, user => user.profile, que especifica que la entidad User es
  // la entidad principal en la relación y que la propiedad "profile" en la entidad User está relacionada con la entidad Profile.
  @OneToOne(() => User, (user) => user.profile)
  user: User;
}

export { Profile };
