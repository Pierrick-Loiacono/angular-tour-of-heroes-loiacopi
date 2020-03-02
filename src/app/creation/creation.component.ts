import {Component, DoCheck, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';


@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements DoCheck, OnInit {

  hero: Hero;
  restant: number;

  // Formulaire avec un FormBuilder
  formHero = this.form.group({
    nom: ['', Validators.required],
    attaque: ['', Validators.required],
    pv: ['', Validators.required],
    esquive: ['', Validators.required],
    degats: ['', Validators.required],
  });

  constructor(private form: FormBuilder, private heroService: HeroService, private router: Router) {
    this.hero = new Hero();
    this.restant = 40;
  }

  ngDoCheck() {
    this.restant = 40 - (this.formHero.get('attaque').value + this.formHero.get('degats').value
      + this.formHero.get('esquive').value + this.formHero.get('pv').value);

    if (this.restant < 0) {
      this.formHero.get('creer').disable();
    }
  }

  ngOnInit() {
    this.formHero.get('attaque').setValue(1);
    this.formHero.get('degats').setValue(1);
    this.formHero.get('esquive').setValue(1);
    this.formHero.get('pv').setValue(1);
  }

  // Action effectuée à l'envoie du formulaire
  onSubmit() {
    // const hero = new Hero();
      this.hero.name = this.formHero.get('nom').value;
      this.hero.attaque = this.formHero.get('attaque').value;
      this.hero.degats = this.formHero.get('degats').value;
      this.hero.esquive = this.formHero.get('esquive').value;
      this.hero.pv = this.formHero.get('pv').value;
      this.heroService.addHero(this.hero);
      this.router.navigate(['/heroes']);

  }

}
