import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Validators } from '@angular/forms';
import { HeroService } from '../services/hero.service';
import {FormControl, FormGroup} from "@angular/forms";
import {maxScoreHero} from "../utilitaire/validator.directive";
import {first} from "rxjs";
import {WeaponService} from "../services/weapon.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero?: Hero;
  choosingWeapon? : boolean;

  //On crée un formGroup nous permettant d'avoir des formulaire réactifs utilisant des validators pour chaque champ
  heroForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(1)]),
    attaque: new FormControl('',[Validators.required,Validators.min(0)]),
    esquive: new FormControl('',[Validators.required,Validators.min(0)]),
    degats: new FormControl('',[Validators.required,Validators.min(0)]),
    pv: new FormControl('',[Validators.required,Validators.min(0)]),
  },
  {
    //On applique un custom validator pour contrôler le nombre de points
    validators: maxScoreHero()
  });

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  populateForm(): void{
    this.heroForm.setValue({
      name: this.hero?.name,
      attaque: this.hero?.attaque,
      esquive: this.hero?.esquive,
      degats: this.hero?.degats,
      pv: this.hero?.pv
    });
  }

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).pipe(first())
      .subscribe(hero => {
        this.hero = hero;
        this.populateForm();
      });
  }

  //Méthode servant à renvoyer le nombre de points n'étant pas attribués
  get soldeHero(){
    const attaque = parseInt(this.heroForm.value.attaque);
    const esquive = parseInt(this.heroForm.value.esquive);
    const degats = parseInt(this.heroForm.value.degats);
    const pv = parseInt(this.heroForm.value.pv);
    const sum = attaque + esquive + pv + degats;

    return 40 - sum;
  }

  updateHero(): void{
    //On modifie le hero courant
    this.hero!.name = this.heroForm.value.name;
    this.hero!.attaque = this.heroForm.value.attaque;
    this.hero!.esquive = this.heroForm.value.esquive;
    this.hero!.degats = this.heroForm.value.degats;
    this.hero!.pv = this.heroForm.value.pv;

    this.heroService.updateHero(this.hero!);
  }

  onSubmit():void {
    //Si les validatorsForm sont OK on update le hero
    if(!this.heroForm.invalid){
      this.updateHero();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
