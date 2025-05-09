import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HasPermissionDirective } from '../services/has-permission.directive';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: true,
  imports: [MatButtonModule, HasPermissionDirective],
  
})
export class AboutComponent implements OnInit {
  constructor(private permissionService: PermissionService) {}

  ngOnInit() {
    const pageId = '3'; // Or get from route, etc.
    // Simulate loading permissions from localStorage
    const permissions = JSON.parse(localStorage.getItem('permissionsItems') || '[]');
    console.log('Loaded permissions from localStorage:', permissions);

    this.permissionService.loadPermissionsForPage(pageId);
  }
}
