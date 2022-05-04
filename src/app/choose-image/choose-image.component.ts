import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../data/hero";

@Component({
  selector: 'app-choose-image',
  templateUrl: './choose-image.component.html',
  styleUrls: ['./choose-image.component.css']
})
export class ChooseImageComponent implements OnInit {

  @Input() hero?: Hero;
  avatars: {image: string}[] = [];
  selectedAvatar?: {image: string};

  constructor() { }

  ngOnInit(): void {
    this.avatars = [
      {image : "assets/img/personnages/blue.png"},
      {image : "assets/img/personnages/reaper.png"},
      {image : "assets/img/personnages/soldat.png"},
      {image : "assets/img/personnages/specialist.png"},
      {image : "assets/img/personnages/statue.png"},
      {image : "assets/img/personnages/mercenary.png"},
    ];
  }

  chooseAvatar(avatar : {image: string}) : void{
    this.selectedAvatar = avatar;
    if(this.hero) {
      this.hero.image = this.selectedAvatar!.image;
    }
  }

}
