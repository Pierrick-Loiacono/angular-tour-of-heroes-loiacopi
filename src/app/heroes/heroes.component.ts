import { Component, OnInit } from '@angular/core';

import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';
import {Router} from '@angular/router';
import {WeaponService} from '../service/weapon.service';
import {Weapon} from '../data/weapon';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  weaponName: string;
  sortBy = 'name';
  sortDirection = 'asc';

  constructor(private heroService: HeroService, private router: Router, private weaponService: WeaponService
  ) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = this.doSort( heroes ));
  }

  delete(id): void {
    this.heroService.deleteHero(id);
    this.router.navigate(['/heroes']);
  }

  // Tri en fonction de l'attribut voulu (clic sur l'attribut dans la liste)
  setSort(by): void {
    if ( this.sortBy === by ) {
      this.sortDirection = ( this.sortDirection === 'desc' ? 'asc' : 'desc' );
    } else {
      this.sortDirection = 'asc';
    }
    this.sortBy = by;

    this.heroes = this.doSort( this.heroes );
  }

  // Tri les heros par nom lors du chargement de la page
  doSort( heroes ): Hero[] {
    return heroes.sort( ( a, b ) => {
      if (this.sortBy === 'name' ) {
        return ( this.sortDirection === 'desc' ? 1 : -1 ) * ( a[this.sortBy].toLowerCase() > b[this.sortBy].toLowerCase() ? -1 : 1);
      }
      return ( this.sortDirection === 'desc' ? 1 : -1 ) * ( a[this.sortBy] > b[this.sortBy] ? -1 : 1);
    } );
  }

}
