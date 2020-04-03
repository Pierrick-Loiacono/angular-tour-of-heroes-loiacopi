import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Weapon} from '../data/weapon';
import {Validators} from '@angular/forms';
import {WeaponService} from '../service/weapon.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements DoCheck, OnInit {
  @Input() weapon: Weapon;
  restant: number;

  // Formulaire avec un FormBuilder
  formWeapon = this.form.group({
    nom: ['', Validators.required],
    attaque: ['', Validators.required],
    pv: ['', Validators.required],
    esquive: ['', Validators.required],
    degats: ['', Validators.required],
  });

  constructor(private form: FormBuilder,
              private route: ActivatedRoute,
              private weaponService: WeaponService,
              private router: Router
  ) { }

  ngOnInit() {
    this.getWeapon();
  }

  ngDoCheck() {
    this.restant = (this.formWeapon.get('attaque').value + this.formWeapon.get('degats').value
      + this.formWeapon.get('esquive').value + this.formWeapon.get('pv').value);

    if (this.restant !== 0) {
      // this.formWeapon.get('creer').disable();
    }
  }

  // Methode a la soumission du formulaire
  onSubmit() {
    this.weapon.name = this.formWeapon.get('nom').value;
    this.weapon.attaque = this.formWeapon.get('attaque').value;
    this.weapon.degats = this.formWeapon.get('degats').value;
    this.weapon.esquive = this.formWeapon.get('esquive').value;
    this.weapon.pv = this.formWeapon.get('pv').value;
    this.weaponService.updateWeapon(this.weapon);
    this.router.navigate(['/weapons']);
  }

  // Recupere l'arme selectionné dans la liste
  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.weaponService.getWeapon(id)
      .subscribe(weapon => {
        this.weapon = weapon;
      });
  }

}
