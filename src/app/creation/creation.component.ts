import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Hero} from '../data/hero';
import {HeroService} from '../service/hero.service';
import {WeaponService} from '../service/weapon.service';
import {Weapon} from '../data/weapon';


@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements DoCheck, OnInit {

  hero: Hero;
  weapon: Weapon[];
  restant: number;
  valide: boolean;

  // Formulaire avec un FormBuilder
  formHero = this.form.group({
    nom: ['', Validators.required],
    attaque: ['', Validators.required],
    pv: ['', Validators.required],
    esquive: ['', Validators.required],
    degats: ['', Validators.required],
    arme: ['', Validators.required],
  });

  constructor(
    private form: FormBuilder,
    private heroService: HeroService,
    private router: Router,
    private weaponService: WeaponService,
  ) {
    this.hero = new Hero();
    this.restant = 40;
  }

  ngDoCheck() {
    this.restant = 40 - (this.formHero.get('attaque').value + this.formHero.get('degats').value
      + this.formHero.get('esquive').value + this.formHero.get('pv').value);

    if (this.restant < 0 || this.restant > 40) {
      this.formHero.get('creer').disable();
    }
  }

  ngOnInit() {
    this.formHero.get('attaque').setValue(1);
    this.formHero.get('degats').setValue(1);
    this.formHero.get('esquive').setValue(1);
    this.formHero.get('pv').setValue(1);
    this.getWeapons();
  }

  // Action effectuée à l'envoie du formulaire
  onSubmit() {
    // const hero = new Hero();
    if (this.restant < 0 || this.restant > 40) {

    } else {
      this.hero.name = this.formHero.get('nom').value;
      this.hero.attaque = this.formHero.get('attaque').value;
      this.hero.degats = this.formHero.get('degats').value;
      this.hero.esquive = this.formHero.get('esquive').value;
      this.hero.pv = this.formHero.get('pv').value;
      this.hero.id_weapon = this.formHero.get('arme').value;
      this.heroService.addHero(this.hero);
      this.router.navigate(['/heroes']);
    }
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapon => this.weapon = weapon);
  }

}
