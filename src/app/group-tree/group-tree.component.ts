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
  checked?: boolean; // Add checked property
  indeterminate?: boolean; // Add indeterminate property
}
const TREE_DATA: TreeNode[] = [
  {
    name: 'Admins',
    children: [
      { name: 'Admin Sub 1' },
      { name: 'Admin Sub 2' },
      { name: 'Admin Sub 3' }
    ]
  },
  {
    name: 'Guests',
    children: [
      { name: 'Guest Sub 1' },
      { name: 'Guest Sub 2' },
      { name: 'Guest Sub 3' }
    ]
  },
  {
    name: 'Users',
    children: [
      { name: 'User Sub 1' },
      { name: 'User Sub 2' },
      { name: 'User Sub 3' }
    ]
  }
];

// const TREE_DATA: TreeNode[] = [
//   //{
//     // name: 'Step 1: Getting Started',
//     // children: [
//     //   {
//     //     name: 'Level 2: Choose Option',
//     //     children: [
//     //       { name: 'Level 3: Option A' },
//     //       { name: 'Level 3: Option B' }
//     //     ]
//     //   }
//     // ]
//  // }
//  { name: 'guest' },
//  { name: 'admin' },
//  { name: 'users' }
// ];
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
  styleUrls: ['./group-tree.component.css']
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
  selectAll() {
    const selected = new Set<string>();
  
    // Traverse all nodes and subnodes
    this.dataSource.data.forEach((parent: TreeNode) => {
      selected.add(parent.name);
      parent.children?.forEach((child: TreeNode) => selected.add(child.name));
    });
  
    this.groupSelections[this.selectedGroup] = selected;
    this.treeControl.expandAll();
  }
  
  clearAll() {
    this.groupSelections[this.selectedGroup] = new Set<string>();
    this.treeControl.collapseAll();
  }
  onGroupChange() {
    const selected = new Set<string>();
  
    if (this.selectedGroup === 'Admins') {
     this.dataSource.data.forEach(parent => {
        selected.add(parent.name);
        parent.children?.forEach(child => selected.add(child.name));
      });
    } else if (this.selectedGroup === 'Guests') {
      selected.add('Guests');
      selected.add('Guest Sub 1');
      selected.add('Guest Sub 2');
      selected.add('Guest Sub 3');
    } else if (this.selectedGroup === 'Users') {
      selected.add('Users');
      selected.add('User Sub 1');
      selected.add('User Sub 2');
      selected.add('User Sub 3');
    }
  
    this.groupSelections[this.selectedGroup] = selected;
    this.treeControl.expandAll(); // Expand all nodes so user sees selection
  }
  onGroupChange112() {
    const selected = this.groupSelections[this.selectedGroup] ?? new Set<string>();
  
    selected.clear(); // Clear previous selections
  
    if (this.selectedGroup === 'Admins') {
      // Select all nodes
     // this.dataSource.data.forEach(node => selected.add(node.name));
     
   this.selectAll();
   console.log('Selected group:', this.selectedGroup);
    } else if (this.selectedGroup === 'Guests') {
      selected.add('guest');
    } else if (this.selectedGroup === 'Users') {
      selected.add('users');
    }
  
    this.groupSelections[this.selectedGroup] = selected;
    this.treeControl.expandAll(); // Optional: expand the tree
  }
  onGroupChange1() {
    this.treeControl.expandAll(); // optional
  }
}
