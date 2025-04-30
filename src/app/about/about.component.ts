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
    const pageId = 'page-3'; // Or get from route, etc.

    this.permissionService.loadPermissionsForPage(pageId);
  }
}
