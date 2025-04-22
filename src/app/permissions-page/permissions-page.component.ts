import { Component, OnInit } from '@angular/core';
import { PermissionService, MenuItem, PermissionDto } from '../services/permission.service';
import { PermissionTreeComponent } from '../permission-tree/permission-tree.component'; // Correctly import PermissionTreeComponent

@Component({
  selector: 'app-permissions-page',
  templateUrl: './permissions-page.component.html',
  standalone: true,
  imports: [PermissionTreeComponent], // Import the PermissionTreeComponent here
})
export class PermissionsPageComponent implements OnInit {
  menuTree: MenuItem[] = [];
  groupId = 2; // example: Accounts group

  constructor(private permSvc: PermissionService) {}

  ngOnInit() {
    console.log('Loading permissions for groupId:', this.groupId);
    this.permSvc.getTree(this.groupId).subscribe(tree => {
      this.menuTree = tree;
    }, err => console.error('Failed loading permission tree', err));
  }

  selectAll(): void {
    // Logic to select all permissions
    console.log('Select All clicked');
  }

  deselectAll(): void {
    // Logic to deselect all permissions
    console.log('Deselect All clicked');
  }
  
  onPermissionChange(updatedTree: MenuItem[]) {
    this.menuTree = updatedTree;  // keep local state in sync
  }

  save() {
    const flat: PermissionDto[] = [];
    const flatten = (items: MenuItem[]) => {
      items.forEach(item => {
        item.selectedActions.forEach(action => {
          flat.push({ menuId: item.menuId, action });
        });
        if (item.children.length) flatten(item.children);
      });
    };
    flatten(this.menuTree);
    this.permSvc.savePermissions(this.groupId, flat)
      .subscribe(() => alert('Permissions saved!'),
                 err => console.error('Save error', err));
  }
}
