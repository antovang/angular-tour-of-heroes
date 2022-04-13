import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../data/hero';
import {HeroService} from "../services/hero.service";
import {Subscription} from "rxjs";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  subscription? : Subscription;
  displayedColumns: string[] = ['id','name','attaque','esquive','pv','degats','actions'];
  dataSource!: MatTableDataSource<Hero>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private heroService: HeroService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.dataSource = new MatTableDataSource(heroes);
        this.dataSource.sort = this.sort;
      });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
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
