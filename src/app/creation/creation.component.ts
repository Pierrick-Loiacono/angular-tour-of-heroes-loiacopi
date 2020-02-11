import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Hero } from '../data/hero';
import { HEROES } from '../data/mock-heroes';
import {HeroService} from '../service/hero.service';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {

  // Formulaire avec un FormBuilder
  formHero = this.form.group({
    nom: ['', Validators.required],
    attaque: ['', Validators.required],
    pv: ['', Validators.required],
    esquive: ['', Validators.required],
    degats: ['', Validators.required],
  });

  // formHero = new FormGroup({
  //   name: new FormControl(''),
  //   age: new FormControl(''),
  // });

  constructor(private form: FormBuilder, private heroService: HeroService) { }

  ngOnInit() {
  }

  // Action effectuée à l'envoie du formulaire
  onSubmit() {
    const hero = new Hero();
    // hero.id = '99';
    hero.name = this.formHero.get('nom').value;
    hero.attaque = this.formHero.get('attaque').value;
    hero.degats = this.formHero.get('degats').value;
    hero.esquive = this.formHero.get('esquive').value;
    hero.pv = this.formHero.get('pv').value;
    this.heroService.addHero(hero);
  }
}
