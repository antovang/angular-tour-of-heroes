import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Validators } from '@angular/forms';
import {FormControl, FormGroup} from "@angular/forms";
import {maxScoreWeapon} from "../utilitaire/validator.directive";
import {Weapon} from "../data/weapon";
import {WeaponService} from "../services/weapon.service";
import { first } from 'rxjs';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {

  @Input() weapon?: Weapon;
  public choosingWeapon? : boolean = false;

  //On crée un formGroup nous permettant d'avoir de formulaire réactifs utilisant des validators pour chaque champ
  weaponForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(1)]),
      attaque: new FormControl('',[Validators.required,Validators.min(-5),Validators.max(5)]),
      esquive: new FormControl('',[Validators.required,Validators.min(-5),Validators.max(5)]),
      degats: new FormControl('',[Validators.required,Validators.min(-5),Validators.max(5)]),
      pv: new FormControl('',[Validators.required,Validators.min(-5),Validators.max(5)])
    },
    {
      //On applique un custom validator pour contrôler le nombre de points
      validators: maxScoreWeapon()
    });

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.has('id')) {
      this.getWeapon();
    }else{
      this.weapon = new Weapon();
      // On remplit le formulaire avec des données par défaut
      this.populateForm();
    }
  }

  populateForm(): void{
    this.weaponForm.setValue({
      name: this.weapon?.name ?? '',
      attaque: this.weapon?.attaque ?? '0',
      esquive: this.weapon?.esquive ?? '0',
      degats: this.weapon?.degats ?? '0',
      pv: this.weapon?.pv ?? '0',
    });
  }

  getWeapon(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.weaponService.getWeapon(id).pipe(first())
      .subscribe(weapon => {
        this.weapon = weapon;
        this.populateForm();
      });
  }

  //Méthode servant à renvoyer le nombre de points n'étant pas attribués
  get soldeWeapon(){
    const attaque = parseInt(this.weaponForm.value.attaque);
    const esquive = parseInt(this.weaponForm.value.esquive);
    const degats = parseInt(this.weaponForm.value.degats);
    const pv = parseInt(this.weaponForm.value.pv);
    const sum = attaque + esquive + pv + degats;

    return 0 - sum;
  }

  updateWeapon(): void{
    //On modifie le hero courant
    this.weapon!.name = this.weaponForm.value.name;
    this.weapon!.attaque = this.weaponForm.value.attaque;
    this.weapon!.esquive = this.weaponForm.value.esquive;
    this.weapon!.degats = this.weaponForm.value.degats;
    this.weapon!.pv = this.weaponForm.value.pv;

    if(this.weapon?.id != undefined) {
      this.weaponService.updateWeapon(this.weapon!);
    }else{
      this.weaponService.addWeapon(this.weapon!);
    }
  }

  onSubmit():void {
    //Si les validatorsForm sont OK on update le hero
    if(!this.weaponForm.invalid){
      this.updateWeapon();
    }
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
