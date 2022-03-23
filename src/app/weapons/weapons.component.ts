import { Component, OnInit } from '@angular/core';
import {first, Subscription} from "rxjs";
import {Weapon} from "../data/weapon";
import {WeaponService} from "../services/weapon.service";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

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
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  onSelect(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

}
