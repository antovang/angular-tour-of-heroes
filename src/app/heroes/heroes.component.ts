import { Component, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import {HeroService} from "../services/hero.service";
import {first, Subscription} from "rxjs";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  subscription? : Subscription;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
