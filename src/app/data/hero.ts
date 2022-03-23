import {Serializable} from "./serializable";
import {Weapon} from "./weapon";
import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";

export class Hero extends Serializable  {
  private _id? : string;
  private _name? : string;
  private _attaque? : number;
  private _esquive? : number;
  private _degats? : number;
  private _pv? : number;
  private _weapon? : Weapon;

  constructor() {
    super();
    this.weapon = new Weapon();
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

  get weapon(): Weapon {
    return <Weapon>this._weapon;
  }

  set weapon(value: Weapon) {
    this._weapon = value;
  }

  override toJSON() {
    return JSON.stringify({
      _name: this.name,
      _attaque: this.attaque,
      _esquive: this.esquive,
      _degats: this.degats,
      _pv: this.pv,
      _weapon: this.weapon.toJSON()
    });
  }
}

