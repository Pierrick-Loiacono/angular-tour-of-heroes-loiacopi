import { Component, OnInit } from '@angular/core';

import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon.service';
import {Router} from '@angular/router';
import {Hero} from "../data/hero";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})

export class WeaponsComponent implements OnInit {
  weapons: Weapon[];
  sortBy = 'name';
  sortDirection = 'asc';

  constructor(private weaponService: WeaponService, private router: Router) { }

  ngOnInit() {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = this.doSort( weapons ));
  }

  delete(id): void {
    this.weaponService.deleteWeapon(id);
    this.router.navigate(['/weapons']);
  }

  // Tri en fonction de l'attribut voulu (clic sur l'attribut dans la liste)
  setSort(by): void {
    if ( this.sortBy === by ) {
      this.sortDirection = ( this.sortDirection === 'desc' ? 'asc' : 'desc' );
    } else {
      this.sortDirection = 'asc';
    }
    this.sortBy = by;

    this.weapons = this.doSort( this.weapons );
  }

  // Tri les heros par nom lors du chargement de la page
  doSort( weapons ): Weapon[] {
    return weapons.sort( ( a, b ) => {
      if (this.sortBy === 'name' ) {
        return ( this.sortDirection === 'desc' ? 1 : -1 ) * ( a[this.sortBy].toLowerCase() > b[this.sortBy].toLowerCase() ? -1 : 1);
      }
      return ( this.sortDirection === 'desc' ? 1 : -1 ) * ( a[this.sortBy] > b[this.sortBy] ? -1 : 1);
    } );
  }

}
