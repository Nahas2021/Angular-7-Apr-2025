import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  menuId: number;
  menuName: string;
  route: string;
  actions: string[];
  selectedActions: string[];
  children: MenuItem[];
}

@Component({
  selector: 'app-permission-tree',
  templateUrl: './permission-tree.component.html',
  styleUrls: ['./permission-tree.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PermissionTreeComponent {
  @Input() menuTree: MenuItem[] = [];
  @Output() permissionChange = new EventEmitter<MenuItem[]>();

  toggleAction(menu: MenuItem, action: string, event: any) {
    if (event.target.checked) {
      menu.selectedActions.push(action);
    } else {
      menu.selectedActions = menu.selectedActions.filter(a => a !== action);
    }

    this.permissionChange.emit(this.menuTree);
  }

  isChecked(menu: MenuItem, action: string): boolean {
    return menu.selectedActions.includes(action);
  }
}
