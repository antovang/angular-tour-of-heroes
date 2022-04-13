import {Component, OnInit, ViewChild} from '@angular/core';
import {first, Subscription} from "rxjs";
import {Weapon} from "../data/weapon";
import {WeaponService} from "../services/weapon.service";
import {MatTableDataSource} from "@angular/material/table";
import {Hero} from "../data/hero";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  weapons: Weapon[] = [];
  selectedWeapon?: Weapon;
  subscription? : Subscription;
  displayedColumns: string[] = ['id','name','attaque','esquive','pv','degats','actions'];
  dataSource!: MatTableDataSource<Weapon>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private weaponService: WeaponService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => {
        this.weapons = weapons;
        this.dataSource = new MatTableDataSource(weapons);
        this.dataSource.sort = this.sort;
      });
  }

  onSelect(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
