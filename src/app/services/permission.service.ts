// src/app/services/permission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient) {}

  /** Fetch the drill‑down menu tree with selectedActions pre‑populated */
  getTree(groupId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`/api/permissions/tree?groupId=${groupId}`);
  }

  /** Save the updated permissions */
  savePermissions(groupId: number, perms: PermissionDto[]): Observable<any> {
    return this.http.post(`/api/permissions/save?groupId=${groupId}`, perms);
  }
}
