import {Serializable} from './serializable';

export class Weapon extends Serializable  {
  id: string;
  name: string;
  attaque: number;
  degats: number;
  esquive: number;
  pv: number;

  uneMethode(): string {
    return 'le nom de mon hero' + this.name;
  }
}
