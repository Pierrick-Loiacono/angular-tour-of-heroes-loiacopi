import {Serializable} from './serializable';

export class Hero extends Serializable  {
  id: string;
  name: string;
  attaque: number;
  degats: number;
  esquive: number;
  pv: number;
  id_weapon: string;

  uneMethode(): string {
    return 'le nom de mon hero' + this.name;
  }
}
