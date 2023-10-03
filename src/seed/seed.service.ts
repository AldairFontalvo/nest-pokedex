import { Injectable } from '@nestjs/common';
import axios,{ AxiosInstance } from 'axios';
import { Pokeresponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model, Promise } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.dapater';

@Injectable()
export class SeedService {

  constructor(

    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter

  ){}
  
  private readonly axios: AxiosInstance = axios;

  async executeSeed(){

    await this.pokemonModel.deleteMany({});

    const  data  = await this.http.get<Pokeresponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert:{name:string, no:number}[] = [];

    data.results.forEach(({name,url})=>{
      const segment = url.split('/');
      const no = +segment[segment.length-2];
      
      //const pokemon = await this.pokemonModel.create( {no,name} );
      pokemonToInsert.push( {name,no} )

    });
    
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'seed ejecutado';
  }
}
