import { Component, OnInit } from '@angular/core';
import { DataStateManagerService } from './core/data-state-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'govMapApp';

  constructor(private dataStateManagerService: DataStateManagerService) { }

  /** The list of the available layers is loaded after main component initialization */
  ngOnInit(): void {
    this.dataStateManagerService.setLayers();
  }

}
