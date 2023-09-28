import { Injectable } from '@nestjs/common';
import axios,{ AxiosInstance } from 'axios';
import { Pokeresponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed(){

    const { data } = await this.axios.get<Pokeresponse>('https://pokeapi.co/api/v2/pokemon?limit=20');

    data.results.forEach(({name,url})=>{
      const segment = url.split('/');
      const no:number = +segment[segment.length-2];
      console.log(no)
    });
    return data.results;
  }
}