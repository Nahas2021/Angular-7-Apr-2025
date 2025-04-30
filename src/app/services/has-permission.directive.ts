import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from './permission.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}

  @Input() set appHasPermission(permission: string) {
    if (this.permissionService.hasPermission(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
// This directive can be used in templates to conditionally display elements based on user permissions.
// For example:
// <div *appHasPermission="'view'">This content is only visible to users with 'view' permission.</div>