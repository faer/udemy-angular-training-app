import {Component, EventEmitter, Output} from '@angular/core';

/**
 * Created by Farouk Errahmani on 14/04/2017.
 */
@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() selectedFeature = new EventEmitter<string>();

  isSelected(feature: string) {
    this.selectedFeature.emit(feature);
  }

}
