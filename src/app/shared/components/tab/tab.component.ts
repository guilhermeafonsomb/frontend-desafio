import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ListTableComponent } from '../list-table/list-table.component';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [MatTabsModule, ListTableComponent],
  templateUrl: './tab.component.html',
})
export class TabComponent {
  constructor() {}

  @Input() titleTabOne: string = '';
  @Input() titleTabTwo: string = '';
  @Input() titleTabThree: string = '';
  @Input() titleTabFour: string = '';

  @Output() tabChanged = new EventEmitter<number>();

  onTabSelect(event: any): void {
    this.tabChanged.emit(event.index);
  }
}
