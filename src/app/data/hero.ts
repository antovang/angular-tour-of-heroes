import {Serializable} from "./serializable";

export class Hero extends Serializable  {
  private _id? : string;
  private _name? : string;
  private _attaque? : number;
  private _esquive? : number;
  private _degats? : number;
  private _pv? : number;

  constructor() {
    super();
  }

  get id(): string {
    return <string>this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return <string>this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get attaque(): number {
    return <number>this._attaque;
  }

  set attaque(value: number) {
    this._attaque = value;
  }

  get esquive(): number {
    return <number>this._esquive;
  }

  set esquive(value: number) {
    this._esquive = value;
  }

  get degats(): number {
    return <number>this._degats;
  }

  set degats(value: number) {
    this._degats = value;
  }

  get pv(): number {
    return <number>this._pv;
  }

  set pv(value: number) {
    this._pv = value;
  }
}

