import {Component, DoCheck, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Weapon} from '../data/weapon';
import {WeaponService} from '../service/weapon.service';
import {HeroService} from '../service/hero.service';
import {Hero} from '../data/hero';

@Component({
  selector: 'app-create-weapon',
  templateUrl: './create-weapon.component.html',
  styleUrls: ['./create-weapon.component.css']
})
export class CreateWeaponComponent implements DoCheck, OnInit {
  restant: number;

  // Formulaire avec un FormBuilder
  formWeapon = this.form.group({
    nom: ['', Validators.required],
    attaque: ['', Validators.required],
    pv: ['', Validators.required],
    esquive: ['', Validators.required],
    degats: ['', Validators.required],
  });

  constructor(private form: FormBuilder, private weaponService: WeaponService, private router: Router) {
    this.restant = 0;
  }

  ngDoCheck() {
    this.restant = (this.formWeapon.get('attaque').value + this.formWeapon.get('degats').value
      + this.formWeapon.get('esquive').value + this.formWeapon.get('pv').value);
  }

  ngOnInit() {
    this.formWeapon.get('attaque').setValue(0);
    this.formWeapon.get('degats').setValue(0);
    this.formWeapon.get('esquive').setValue(0);
    this.formWeapon.get('pv').setValue(0);
  }

  onSubmit() {
    const hero = new Hero();
    hero.name = this.formWeapon.get('nom').value;
    hero.attaque = this.formWeapon.get('attaque').value;
    hero.degats = this.formWeapon.get('degats').value;
    hero.esquive = this.formWeapon.get('esquive').value;
    hero.pv = this.formWeapon.get('pv').value;
    this.weaponService.addWeapon(hero);
    this.router.navigate(['/weapons']);
  }

}
