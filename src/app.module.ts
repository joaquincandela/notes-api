import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './notes/entities/note.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'notesdb',
      entities: [Note],
      synchronize: true,
    }),
    NotesModule,
  ]
})
export class AppModule {}

