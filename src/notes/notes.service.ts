import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const note = this.notesRepository.create(createNoteDto);
    return await this.notesRepository.save(note);
  }

  async findAll(archived?: boolean, sort?: string) {
    const whereCondition =
    archived !== undefined ? { archived } : {};

    const orderCondition =
      sort === 'createdAt'
      ? { createdAt: 'DESC' as const }
      : {};

    return await this.notesRepository.find({
      where: whereCondition,
      order: orderCondition,
    });
  }


  async findOne(id: number) {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.findOne(id);
    Object.assign(note, updateNoteDto);
    return await this.notesRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.findOne(id);
    return await this.notesRepository.remove(note);
  }
  
  async archive(id: number) {
    const note = await this.findOne(id);
    note.archived = true;
    return await this.notesRepository.save(note);
  }
}
