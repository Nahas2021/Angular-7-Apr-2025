import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface TreeNode {
  name: string;
  checked?: boolean;
  indeterminate?: boolean;
  children?: TreeNode[];
}

interface FlatNode {
  name: string;
  level: number;
  expandable: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  parent?: FlatNode;
}


 const TREE_DATA: TreeNode[] = [
    
  {
    name: 'Step 1: Getting Started',
    children: [
      {
        name: 'Level 2: Choose Option',
        children: [
          {
            name: 'Level 3: Option A',
            children: [
              {
                name: 'Level 4: Confirm A1',
                children: [
                  { name: 'Level 5: Execute A1.1' },
                  { name: 'Level 5: Execute A1.2' }
                ]
              },
              {
                name: 'Level 4: Confirm A2',
                children: [
                  { name: 'Level 5: Execute A2.1' },
                  { name: 'Level 5: Execute A2.2' }
                ]
              }
            ]
          },
          {
            name: 'Level 3: Option B',
            children: [
              {
                name: 'Level 4: Confirm B1',
                children: [
                  { name: 'Level 5: Execute B1.1' },
                  { name: 'Level 5: Execute B1.2' }
                ]
              },
              {
                name: 'Level 4: Confirm B2',
                children: [
                  { name: 'Level 5: Execute B2.1' },
                  { name: 'Level 5: Execute B2.2' }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Level 2: Explore Settings',
        children: [
          {
            name: 'Level 3: Advanced Config',
            children: [
              {
                name: 'Level 4: Save Changes',
                children: [
                  { name: 'Level 5: Confirm Save & Exit' },
                  { name: 'Level 5: Schedule Backup' }
                ]
              },
              {
                name: 'Level 4: Reset to Default',
                children: [
                  { name: 'Level 5: Confirm Reset' },
                  { name: 'Level 5: Create Restore Point' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  // {
    //   name: 'Excel',
    //   children: [
    //     { name: 'Excel 2016' },
    //     { name: 'Excel 2019' },
    //     { name: 'Excel 2021' },
    //     { name: 'Excel for Microsoft 365' },
    //     { name: 'Excel Online' }
    //   ]
    // },
    // {
    //   name: 'Excel Menus',
    //   children: [
    //     {
    //       name: 'File',
    //       children: [
    //         { name: 'New' },
    //         { name: 'Open' },
    //         { name: 'Save' },
    //         { name: 'Save As' },
    //         { name: 'Print' },
    //         { name: 'Close' }
    //       ]
    //     },
    //     {
    //       name: 'Home',
    //       children: [
    //         { name: 'Clipboard' },
    //         { name: 'Font' },
    //         { name: 'Alignment' },
    //         { name: 'Number' },
    //         { name: 'Styles' },
    //         { name: 'Cells' },
    //         { name: 'Editing' }
    //       ]
    //     },
    //     {
    //       name: 'Insert',
    //       children: [
    //         { name: 'Tables' },
    //         { name: 'Illustrations' },
    //         { name: 'Add-ins' },
    //         { name: 'Charts' },
    //         { name: 'Sparklines' },
    //         { name: 'Text' },
    //         { name: 'Symbols' }
    //       ]
    //     },
    //     {
    //       name: 'Page Layout',
    //       children: [
    //         { name: 'Themes' },
    //         { name: 'Page Setup' },
    //         { name: 'Scale to Fit' },
    //         { name: 'Sheet Options' },
    //         { name: 'Arrange' }
    //       ]
    //     },
    //     {
    //       name: 'Formulas',
    //       children: [
    //         { name: 'Function Library' },
    //         { name: 'Defined Names' },
    //         { name: 'Formula Auditing' },
    //         { name: 'Calculation' }
    //       ]
    //     },
    //     {
    //       name: 'Data',
    //       children: [
    //         { name: 'Get & Transform Data' },
    //         { name: 'Sort & Filter' },
    //         { name: 'Data Tools' },
    //         { name: 'Forecast' },
    //         { name: 'Outline' }
    //       ]
    //     },
    //     {
    //       name: 'Review',
    //       children: [
    //         { name: 'Proofing' },
    //         { name: 'Accessibility' },
    //         { name: 'Language' },
    //         { name: 'Comments' },
    //         { name: 'Protect' }
    //       ]
    //     },
    //     {
    //       name: 'View',
    //       children: [
    //         { name: 'Workbook Views' },
    //         { name: 'Show' },
    //         { name: 'Zoom' },
    //         { name: 'Window' },
    //         { name: 'Macros' }
    //       ]
    //     }
    //   ]
    // }
  
 ];
//     name: 'Fruits',
//     children: [
//       {
//         name: 'Apple',
//         children: [
//           { name: 'Fuji' },
//           { name: 'Gala' },
//           { name: 'Granny Smith' },
//           { name: 'Honeycrisp' },
//           { name: 'Red Delicious' }
//         ]
//       },
//       {
//         name: 'Banana',
//         children: [
//           { name: 'Cavendish' },
//           { name: 'Red' },
//           { name: 'Lady Finger' },
//           { name: 'Blue Java' },
//           { name: 'Plantain' }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Vegetables',
//     children: [
//       { name: 'Tomato' },
//       { name: 'Carrot' }
//     ]
//   },
//   {
//     name: 'Movies',
//     children: [
//       {
//         name: 'Action',
//         children: [
//           { name: 'Mad Max: Fury Road' },
//           { name: 'John Wick' },
//           { name: 'Gladiator' }
//         ]
//       },
//       {
//         name: 'Comedy',
//         children: [
//           { name: 'The Hangover' },
//           { name: 'Superbad' },
//           { name: 'Step Brothers' }
//         ]
//       },
//       {
//         name: 'Drama',
//         children: [
//           { name: 'Forrest Gump' },
//           { name: 'The Shawshank Redemption' },
//           { name: 'Fight Club' }
//         ]
//       },
//       {
//         name: 'Horror',
//         children: [
//           { name: 'The Conjuring' },
//           { name: 'Hereditary' },
//           { name: 'Get Out' }
//         ]
//       },
//       {
//         name: 'Romance',
//         children: [
//           { name: 'The Notebook' },
//           { name: 'La La Land' },
//           { name: 'Pride & Prejudice' }
//         ]
//       },
//       {
//         name: 'Sci-Fi',
//         children: [
//           { name: 'Inception' },
//           { name: 'Interstellar' },
//           { name: 'Blade Runner 2049' }
//         ]
//       },
//       {
//         name: 'Thriller',
//         children: [
//           { name: 'Gone Girl' },
//           { name: 'Se7en' },
//           { name: 'Shutter Island' }
//         ]
//       },
//       {
//         name: 'Documentary',
//         children: [
//           { name: 'The Social Dilemma' },
//           { name: '13th' },
//           { name: 'Free Solo' }
//         ]
//       },
//       {
//         name: 'Fantasy',
//         children: [
//           { name: 'The Lord of the Rings' },
//           { name: 'Harry Potter and the Sorcerer\'s Stone' },
//           { name: 'The Chronicles of Narnia' }
//         ]
//       },
//       {
//         name: 'Animation',
//         children: [
//           { name: 'Toy Story' },
//           { name: 'Spirited Away' },
//           { name: 'Coco' }
//         ]
//       }
//     ]
//   }
// ];


@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeComponent {
  private nodeMap = new Map<FlatNode, TreeNode>();

  private transformer = (node: TreeNode, level: number): FlatNode => {
    const flatNode: FlatNode = {
      name: node.name,
      level,
      expandable: !!node.children?.length,
      checked: node.checked,
      indeterminate: node.indeterminate
    };
    this.nodeMap.set(flatNode, node);
    return flatNode;
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

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  toggleCheckbox(node: FlatNode) {
    node.checked = !node.checked;
    node.indeterminate = false;

    this.checkDescendants(node, node.checked);
    this.updateParents(node);
  }

  checkDescendants(node: FlatNode, checked: boolean) {
    const descendants = this.treeControl.getDescendants(node);
    descendants.forEach(child => {
      child.checked = checked;
      child.indeterminate = false;
    });
  }

  updateParents(node: FlatNode) {
    let parent: FlatNode | undefined = this.getParentNode(node);
    while (parent) {
      const descendants = this.treeControl.getDescendants(parent);
      const allChecked = descendants.every(d => d.checked);
      const noneChecked = descendants.every(d => !d.checked && !d.indeterminate);

      parent.checked = allChecked;
      parent.indeterminate = !allChecked && !noneChecked;

      parent = this.getParentNode(parent);
    }
  }

  getParentNode(node: FlatNode): FlatNode | undefined {
    const currentLevel = node.level;
    if (currentLevel < 1) return undefined;

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const current = this.treeControl.dataNodes[i];
      if (current.level < currentLevel) return current;
    }
    return undefined;
  }

  selectAll() {
    this.treeControl.dataNodes.forEach(n => {
      n.checked = true;
      n.indeterminate = false;
    });
  }

  deselectAll() {
    this.treeControl.dataNodes.forEach(n => {
      n.checked = false;
      n.indeterminate = false;
    });
  }
}
