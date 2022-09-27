import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v'); // retrieves all calomuns except this one, thanks to the "-"
  }

  async findOne(term: string) {
    let pokemonDB: Pokemon;

    // No
    if (!isNaN(+term)) {
      pokemonDB = await this.pokemonModel.findOne({ no: term });
    }

    // Mongo ID
    if (isValidObjectId(term) && !pokemonDB) {
      pokemonDB = await this.pokemonModel.findById(term);
    }

    // Name
    if (!pokemonDB) {
      pokemonDB = await this.pokemonModel.findOne({ name: term });
    }

    if (!pokemonDB)
      throw new BadRequestException(
        `Pokemon with the following term ${term} not found`,
      );

    return pokemonDB;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemonDB: Pokemon = await this.findOne(term);

    if (!pokemonDB)
      throw new BadRequestException(
        `Pokemon with the following term ${term} not found`,
      );

    try {
      await pokemonDB.updateOne(updatePokemonDto);
      return { ...pokemonDB.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const result = await this.pokemonModel.deleteOne({ _id: id });
    const { deletedCount } = result;

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id ${id} not found`);

    return result;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in DB ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create pokemon - Check logs`);
  }
}
