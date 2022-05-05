import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../data/hero";
import {Weapon} from "../data/weapon";
import {ActivatedRoute} from "@angular/router";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";

@Component({
  selector: 'app-choose-image',
  templateUrl: './choose-image.component.html',
  styleUrls: ['./choose-image.component.css']
})
export class ChooseImageComponent implements OnInit {

  @Input() hero?: Hero;
  @Input() weapon?: Weapon;
  resources: {image: string}[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //si on est dans le composant hério détail alors on charge les images de héros
    if(this.route.component == HeroDetailComponent){
      this.resources = [
        {image : "assets/img/personnages/blue.png"},
        {image : "assets/img/personnages/reaper.png"},
        {image : "assets/img/personnages/soldat.png"},
        {image : "assets/img/personnages/specialist.png"},
        {image : "assets/img/personnages/statue.png"},
        {image : "assets/img/personnages/mercenary.png"},
      ];
    }else{
      // sinon celles des armes
      this.resources = [
        {image : "assets/img/armes/famas.png"},
        {image : "assets/img/armes/gun_machine.png"},
        {image : "assets/img/armes/p90.png"},
        {image : "assets/img/armes/rifle.png"},
        {image : "assets/img/armes/scar.png"},
        {image : "assets/img/armes/shotgun.png"},
      ];
    }
  }

  chooseResource(res : {image: string}) : void{
    //si on est dans le composant hério détail alors on modifie l'att image du héros
    if(this.route.component == HeroDetailComponent){
      if(this.hero) {
        this.hero.image = res!.image;
      }
    }else{
      // sinon celui de l'arme
      if(this.weapon) {
        this.weapon.image = res!.image;
      }
    }
  }

}
