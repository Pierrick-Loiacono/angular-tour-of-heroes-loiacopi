import {Component, OnInit, Input, DoCheck} from '@angular/core';
import {Hero} from '../data/hero';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {HeroService} from '../service/hero.service';
import {WeaponService} from '../service/weapon.service';
import {Weapon} from '../data/weapon';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements DoCheck, OnInit {
  @Input() hero: Hero;
  weapon: Weapon[];
  restant: number;

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
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location,
    private router: Router
  ) {
    this.restant = 40;
  }

  ngDoCheck() {
    this.restant = 40 - (this.formHero.get('attaque').value + this.formHero.get('degats').value
      + this.formHero.get('esquive').value + this.formHero.get('pv').value);
  }

  ngOnInit() {
    this.getHero();
    this.getWeapons();
  }


  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
      });
  }

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
      this.heroService.updateHero(this.hero);
      this.router.navigate(['/heroes']);
    }
  }

  goBack(): void {
    this.location.back();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapon => this.weapon = weapon);
  }

}
