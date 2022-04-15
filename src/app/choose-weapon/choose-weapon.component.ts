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
      .subscribe(weapons => {
        this.weapons = weapons;
        let emptyWeapon = new Weapon();
        emptyWeapon.id = '-1';
        emptyWeapon.image = '/assets/img/empty.png';
        this.weapons.push(emptyWeapon);
        this.weapons.sort((a,b) => +a.id - +b.id)
      });
  }

  chooseWeapon(weapon : Weapon) : void{
    this.selectedWeapon = weapon;
    if(this.hero) {
      if(this.selectedWeapon.id != '-1'){
        this.hero.weapon = this.selectedWeapon;
        this.hero.weaponId = this.selectedWeapon.id;
      }else{
        this.hero.weapon = undefined;
        this.hero.weaponId = undefined;
      }
    }
  }
}
