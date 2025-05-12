// src/app/services/permission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface PermissionDto {
  menuId: number;
  action: string;
}

export interface MenuItem {
  menuId: number;
  menuName: string;
  route: string;
  actions: string[];
  selectedActions: string[];
  children: MenuItem[];
}

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private permissions = new Set<string>();
  private baseUrl = 'https://localhost:44358/api';

  constructor(private http: HttpClient,  private router: Router) {
    // Example permissions assigned to the current user
    //this.permissions = new Set(['view', 'save', '']); // simulate logged-in user's access
    localStorage.setItem('permissions', JSON.stringify({
      'page-1': ['view', 'edit', 'save'],
      'page-2': ['view', 'print'],
      'page-3': ['view', 'delete']
    }));

    localStorage.setItem('user', JSON.stringify({
      username: 'admin',
      group: 'admin'
    }));
    
  }
  hasPagePermission111(pageId: string): boolean {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');
    return pageId in permissions;
  }
  hasPagePermission(menuid: string): boolean {
    const permissions = JSON.parse(localStorage.getItem('permissionsItems') || '[]');
    return permissions.some((p: any) => p.menuId === +menuid);
  }
  loadPermissionsForPage(pageId: string): void {

    // this.get_GroupPermissions(3).subscribe(data => {
    //   console.log('Group permissions:', data);
    //   localStorage.setItem('permissionsItems', JSON.stringify(data));
    // });

    const stored = localStorage.getItem('permissionsItems');
    const allPermissions = stored ? JSON.parse(stored) : [];

    
   
    if (!Array.isArray(allPermissions)) {
      console.error('allPermissions is not an array');
      return;
    }

    const menuIdToCheck = parseInt(pageId, 10); // Ensure pageId is converted to a number
    console.log(`Checking permissions for menuId: ${menuIdToCheck}`);
    if (isNaN(menuIdToCheck)) {
      console.error(`Invalid menuId: ${pageId}`);
      return;
    }
    const matchingPermissions = allPermissions.filter((permission: any) => permission.menuId === menuIdToCheck);
console.log('Matching permissions:', matchingPermissions);
    if (matchingPermissions.length > 0) {
      this.permissions = new Set(matchingPermissions.map((permission: any) => permission.action));
      console.log('Permissions loaded:', this.permissions);
      console.log(`Menu ID ${menuIdToCheck} is present in allPermissions`);
    } else {
      console.log(`Menu ID ${menuIdToCheck} is not present in allPermissions`);
      this.router.navigate(['/unauthorized']); // Redirect here
    }
  }
 get_GroupPermissions(groupId: number): Observable<MenuItem[]> {
       return this.http.get<MenuItem[]>(this.baseUrl +`/permissions/tree?groupId=${groupId}`);
     }
  hasPermission(permission: string): boolean {   

    return this.permissions.has(permission);
  }

  /** Fetch the drill‑down menu tree with selectedActions pre‑populated */
  getTree(groupId: number): Observable<MenuItem[]> {
    // Simulate an API call

    return this.http.get<MenuItem[]>(`/api/permissions/tree?groupId=${groupId}`);
  }

  /** Save the updated permissions */
  savePermissions(groupId: number, perms: PermissionDto[]): Observable<any> {
    return this.http.post(this.baseUrl +`/permissions/save?groupId=${groupId}`, perms);
  }
}
