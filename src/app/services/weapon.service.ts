import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Weapon } from '../data/weapon';
import { MessageService } from './message.service';

import {map} from "rxjs/operators";
import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {
  Action,
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshot
} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  // URL d'accès aux documents sur Firebase
  private static url = 'weapons';

  constructor(private messageService : MessageService, private db: AngularFirestore) {
  }

  /**
   * Récupération de la liste d'armes
   */
  getWeapons(): Observable<Weapon[]> {

    //
    this.messageService.add('WeaponServices: fetched weapons');

    //
    return this.db.collection<JsonArray>(WeaponService.url)
      .snapshotChanges()
      .pipe(
        map(documents => {
          return documents.map(document => {
            return this.transformDocumentChangeActionToWeapon(document);
          });
        })
      );
  }

  /**
   * Récupération des 3 premiers héros
   */
  getWeaponsTop3(): Observable<Weapon[]> {

    //
    this.messageService.add('HeroService: fetched heroes');

    //
    return this.db.collection<JsonArray>(WeaponService.url, ref => ref.limit(3))
      .snapshotChanges()
      .pipe(
        map(documents => {
          return documents.map(document => {
            return this.transformDocumentChangeActionToWeapon(document);
          });
        })
      );
  }

  /**
   * Récupération d'un document spécifique à l'aide de son id
   * @param id
   * @private
   */
  private getWeaponDocument(id: string): AngularFirestoreDocument<JsonArray> {

    // return document
    return this.db.doc<JsonArray>(WeaponService.url + `/` + id);
  }

  /**
   * Récupération d'un héro spécifique à l'aide de son id
   * @param id
   */
  getWeapon(id: string): Observable<Weapon | undefined> {

    //
    this.messageService.add(`WeaponService: fetched weapon id=${id}`);

    // Return hero observable
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(document => {
          return this.transformDocumentSnapshotToWeapon(id, document);
        })
      );
  }

  /**
   * Ajout d'une arme sur Firebase
   * @param weapon
   */
  addWeapon(weapon: Weapon) {

    this.db.collection(WeaponService.url).add(weapon.toJSON());
    //this.db.collection(HeroService.url).add(JSON.stringify(hero));
    //this.db.collection<JSON>(HeroService.url).add(Object.assign({}, hero));
  }

  /**
   * Modification du héro sur Firebase
   * @param weapon
   */
  updateWeapon(weapon: Weapon) {

    // Update document
    if (weapon.id != undefined) {
      this.getWeaponDocument(weapon.id).update(weapon.toJSON());
    }

    //this.getHeroDocument(id).update(JSON.stringify(hero));
    //this.getHeroDocument(id).update(Object.assign({}, hero));
  }

  deleteWeapon(weapon: Weapon) {

    // Delete the document
    if (weapon.id != undefined) {
      this.getWeaponDocument(weapon.id).delete();
    }
  }


  /**
   * Transformation du document reçu en un objet de type Hero
   * @param a
   * @private
   */
  private transformDocumentChangeActionToWeapon(a: DocumentChangeAction<JsonArray>): Weapon {

    // Get document data
    const data = a.payload.doc.data();

    // New Hero
    const weapon = new Weapon().fromJSON(data);

    // Get document id
    const id = a.payload.doc.id;
    weapon.id = id;

    return weapon;
  }

  /**
   * Transformation du document reçu en un objet de type Weapon
   * @private
   */
  private transformDocumentSnapshotToWeapon(id: string, document: Action<DocumentSnapshot<JsonArray>>): Weapon | undefined {

    // Get document data
    const data = document.payload.data();

    // New Weapon
    let weapon;
    if (data != undefined) {
      weapon = new Weapon().fromJSON(data!);
      weapon.id = id;
    }

    // Use spread operator to add the id to the document data
    return weapon;
  }
}
