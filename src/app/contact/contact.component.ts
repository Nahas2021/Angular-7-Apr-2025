import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '../services/permission.service';
import { MatButtonModule } from '@angular/material/button';
import { HasPermissionDirective } from '../services/has-permission.directive';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatButtonModule, HasPermissionDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string = '';

  constructor(private route: ActivatedRoute,private permissionService: PermissionService) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name') || 'Guest';
    const pageId = '2'; // Or get from route, etc.
    // Simulate loading permissions from localStorage
    const permissions = JSON.parse(localStorage.getItem('permissionsItems') || '[]');
    console.log('Loaded permissions from localStorage:', permissions);

    this.permissionService.loadPermissionsForPage(pageId);
  }
}
