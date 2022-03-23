import {Component, Input, OnInit} from '@angular/core';
import {first, Subscription} from "rxjs";
import {Weapon} from "../data/weapon";
import {WeaponService} from "../services/weapon.service";
import {Hero} from "../data/hero";

@Component({
  selector: 'app-choose-weapon',
  templateUrl: './choose-weapon.component.html',
  styleUrls: ['./choose-weapon.component.css']
})
export class ChooseWeaponComponent implements OnInit {

  @Input() hero?: Hero;
  weapons: Weapon[] = [];
  selectedWeapon?: Weapon;
  subscription? : Subscription;

  constructor(private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

  getWeapons(): void {
    this.weaponService.getWeapons().pipe(first())
      .subscribe(weapons => this.weapons = weapons);
  }

  chooseWeapon(weapon : Weapon) : void{
    this.selectedWeapon = weapon;
    if(this.hero){
      this.hero.weapon = this.selectedWeapon;
    }
  }

}
