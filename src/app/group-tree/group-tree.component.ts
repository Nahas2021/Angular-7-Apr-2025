import { Component, OnInit } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


export class TreeNode {
  name!: string;
  children?: TreeNode[];
}
export class FlatNode {
  name!: string;
  level!: number;
  expandable!: boolean;
}
const TREE_DATA: TreeNode[] = [
  {
    name: 'Step 1: Getting Started',
    children: [
      {
        name: 'Level 2: Choose Option',
        children: [
          { name: 'Level 3: Option A' },
          { name: 'Level 3: Option B' }
        ]
      }
    ]
  }
];
@Component({
  selector: 'app-group-tree',
  templateUrl: './group-tree.component.html',
    imports: [
      CommonModule,
      MatTreeModule,
      MatCheckboxModule,
      MatIconModule,
      MatButtonModule,MatFormFieldModule,MatSelectModule,FormsModule
    ],
  styleUrls: ['./group-tree.component.scss']
})
export class GroupTreeComponent implements OnInit {
  ngOnInit(): void {
    // Initialization logic can go here
  }
  transformer = (node: TreeNode, level: number) => {
    return {
      name: node.name,
      level,
      expandable: !!node.children && node.children.length > 0
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener<TreeNode, FlatNode>(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  groups = ['Admins', 'Users', 'Guests'];
  selectedGroup = 'Admins';

  // Selection map: group name -> selected node names
  groupSelections: { [key: string]: Set<string> } = {};

  constructor() {
    this.dataSource.data = TREE_DATA;
    this.groups.forEach(g => (this.groupSelections[g] = new Set<string>()));
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  isChecked(node: FlatNode): boolean {
    return this.groupSelections[this.selectedGroup].has(node.name);
  }

  onToggle(node: FlatNode, event: any) {
    const selected = this.groupSelections[this.selectedGroup];
    event.checked ? selected.add(node.name) : selected.delete(node.name);
  }

  onGroupChange() {
    this.treeControl.expandAll(); // optional
  }
}
