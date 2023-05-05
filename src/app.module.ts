import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'nestdb',
      // Tablas que debe cargar
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // Para que al modificarse una clase se cree la tabla
      // Nuestra clase siempre se va a ver reflejada en nuestra db
      // En producción lo ideal es usar una migración en lugar de esto
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
