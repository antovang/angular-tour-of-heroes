import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { WeaponsComponent } from "./weapons/weapons.component";
import { WeaponDetailComponent } from "./weapon-detail/weapon-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detailHero/:id', component: HeroDetailComponent },
  { path: 'detailWeapon/:id', component: WeaponDetailComponent },
  { path: 'newHero', component: HeroDetailComponent },
  { path: 'newWeapon', component: WeaponDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'weapons', component: WeaponsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
