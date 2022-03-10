import { Component, OnInit } from '@angular/core';
import { IMenuIcon } from '../Models/models';

@Component({
  selector: 'app-layers-menu',
  templateUrl: './layers-menu.component.html',
  styleUrls: ['./layers-menu.component.scss']
})
export class LayersMenuComponent implements OnInit {

  activeMenu: string = '';

  menuSettings: IMenuIcon[] = [
    {
      iconName: 'toc',
      iconText: 'שכבות מידע'
    },
    {
      iconName: 'search',
      iconText: 'שכבות מידע נוספות'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  setActiveMenu(iconName: string){
    this.activeMenu = iconName;
  }

  onClose() {
    this.activeMenu = '';
  }

}
