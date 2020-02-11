import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Weapon} from '../data/weapon';
import {map} from 'rxjs/operators';
import {MessageService} from './message.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Hero} from '../data/hero';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  private static url = 'weapons';

  constructor(private messageService: MessageService,
              private db: AngularFirestore) { }

  getWeapons(): Observable<Weapon[]> {

    //
    return this.db.collection<Weapon>(WeaponService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {

          // Traitement de la liste
          return liste.map(item => {

            // Get document data
            const data = item.payload.doc.data();

            // New Hero
            const hero = new Weapon().fromJSON(data);

            // Get document id
            const id = item.payload.doc.id;
            hero.id = id;

            // Use spread operator to add the id to the document data
            return hero;

          });
        })
      );
  }

  // Récupération d'une arme en fonction de son id
  getWeapon(id: string): Observable<Weapon> {

    // Return hero observable
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(item => {

          // Get document data
          const data = item.payload.data();

          // New Hero
          const weapon = new Weapon().fromJSON(data);
          weapon.id = id;

          // Use spread operator to add the id to the document data
          return weapon;
        })
      );
  }

  // Ajout d'un héro
  addWeapon(weapon: Weapon) {
    this.db.collection<Hero>(WeaponService.url).add(Object.assign({}, weapon));
  }

  // Modification d'un héro
  updateWeapon(weapon: Weapon) {

    // Update document
    this.getWeaponDocument(weapon.id).update(Object.assign({}, weapon));
  }

  // Suppression d'un héro
  deleteWeapon(id: string) {

    // Delete the document
    this.getWeaponDocument(id).delete();
  }


  // Création du service Firebase en fonction de l'id du héro
  private getWeaponDocument(id: string): AngularFirestoreDocument<Weapon> {

    // return document
    return this.db.doc<Weapon>(WeaponService.url + `/` + id);
  }

}
