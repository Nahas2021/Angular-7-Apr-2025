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

  constructor(private http: HttpClient,  private router: Router) {
    // Example permissions assigned to the current user
    //this.permissions = new Set(['view', 'save', '']); // simulate logged-in user's access
    localStorage.setItem('permissions', JSON.stringify({
      'page-1': ['view', 'edit', 'save'],
      'page-2': ['view', 'print'],
      'page-3': ['view', 'delete']
    }));
  }

  loadPermissionsForPage(pageId: string): void {
    const stored = localStorage.getItem('permissions');
    const allPermissions = stored ? JSON.parse(stored) : {};
    this.permissions = new Set(allPermissions[pageId] || []);
    if (this.permissions.size === 0) {
      // Redirect to unauthorized page
      //window.location.href = '/unauthorized';
     // this.viewContainer.clear();
      this.router.navigate(['/unauthorized']);  // redirect here
    }
  }
 
  hasPermission(permission: string): boolean {
    return this.permissions.has(permission);
  }

  /** Fetch the drill‑down menu tree with selectedActions pre‑populated */
  getTree(groupId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`/api/permissions/tree?groupId=${groupId}`);
  }

  /** Save the updated permissions */
  savePermissions(groupId: number, perms: PermissionDto[]): Observable<any> {
    return this.http.post(`/api/permissions/save?groupId=${groupId}`, perms);
  }
}
