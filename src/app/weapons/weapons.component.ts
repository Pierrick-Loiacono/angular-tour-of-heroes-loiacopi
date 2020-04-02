import { Component, OnInit } from '@angular/core';

import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})

export class WeaponsComponent implements OnInit {
  weapons: Weapon[];

  constructor(private weaponService: WeaponService, private router: Router) { }

  ngOnInit() {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  delete(id): void {
    this.weaponService.deleteWeapon(id);
    this.router.navigate(['/weapons']);
  }

}
