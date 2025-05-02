import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { UserGroup } from '../models/types';
import { ApiService } from '../shared/api.service';

interface TreeNode {
  id?: string;
  menuID?: string;
  name: string;
  checked?: boolean;
  indeterminate?: boolean;
  children?: TreeNode[];
}

interface FlatNode {
   id: string;
  menuID?: string; // Added menuID property
   name: string;
  level: number;
  expandable: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  parent?: FlatNode;
  
}


 const TREE_DATA: TreeNode[] = [
  
    // { id: 'node1', name: 'Level 1: Root A',  },
    // { id: 'node2', name: 'Level 2: Child A1' },
    // { id: 'node3', name: 'Level 3: Child A1.1'},
    
    
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
            {id:'1',name: 'Level 5: Execute A1.1' },
            {id:'2', name: 'Level 5: Execute A1.2', menuID: '3' }
          ]
          },
          {
          name: 'Level 4: Confirm A2',
          children: [
            { id:'3',name: 'Level 5: Execute A2.1' ,menuID: '4' },
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
            {id:'4', name: 'Level 5: Confirm Reset' ,menuID: '5' },
            { name: 'Level 5: Create Restore Point' }
          ]
          }
        ]
        }
      ]
      },
      {
      name: 'Level 2: Additional Step',
      children: [
        { name: 'Level 3: Sub-step 1' },
        { name: 'Level 3: Sub-step 2' }
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
  selector: 'app-save-tree-view',
  imports: [
    CommonModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,MatFormFieldModule,MatSelectModule,FormsModule
  ],
  templateUrl: './save-tree-view.component.html',
  styleUrl: './save-tree-view.component.css'
})
export class SaveTreeViewComponent implements OnInit {
  groups: UserGroup[] = [];
  selectedGroupId?: number;
  private nodeMap = new Map<FlatNode, TreeNode>();
  //groups = ['Admins', 'Users', 'Guests'];
  selectedGroup = 'Admins';
  // private transformer = (node: TreeNode, level: number, parent?: FlatNode): FlatNode => {
  //   const flatNode: FlatNode = {
  //     name: node.name,
  //     level,
  //     expandable: !!node.children?.length,
  //     checked: node.checked,
  //     indeterminate: node.indeterminate,
  //     parent: parent // Track parent
  //   };
  //   this.nodeMap.set(flatNode, node);
  //   return flatNode;
  // };
  flatNodeMap = new Map<FlatNode, TreeNode>();
nestedNodeMap = new Map<TreeNode, FlatNode>();

ngOnInit(): void {
  this.api.getUserGroups().subscribe(data => {
    this.groups = data;
    console.log('User Groups:', this.groups);
  });
}
transformer = (node: TreeNode, level: number): FlatNode => {
  const existingNode = this.nestedNodeMap.get(node);
  const flatNode: FlatNode = existingNode && existingNode.name === node.name
    ? existingNode
    : {
        id: node.id || '', // Ensure id is assigned
        menuID: node.menuID || '', // Include menuID
        name: node.name,
        level,
        expandable: !!node.children?.length,
        checked: false,
        indeterminate: false
      };

  this.flatNodeMap.set(flatNode, node);
  this.nestedNodeMap.set(node, flatNode);

  return flatNode;
};

  // Selection map: group name -> selected node names
  groupSelections: { [key: string]: Set<string> } = {};

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
  isLastChild(node: FlatNode): boolean {
    const parent = this.getParentNode(node);
    if (!parent) return false;
    const descendants = this.treeControl.getDescendants(parent);
    return descendants[descendants.length - 1] === node;
  }
  saveTreeState111(): void {
    function extractCheckedNodes(nodes: TreeNode[]): any[] {
      return nodes
        .filter(node => node.checked)
        .map(node => ({
          id: node.id,
          name: node.name
        }));
    }
  
    const checkedNodes = extractCheckedNodes(this.dataSource.data); // replace with your actual tree data source
    console.log('Checked Nodes Saved:', checkedNodes);
  
    localStorage.setItem('checkedTreeNodes', JSON.stringify(checkedNodes));
  }
  
  saveTreeState(): void {
    const checkedNodes = this.treeControl.dataNodes
      .filter(node => node.checked)
      .map(node => ({
      id: node.id || '',
      name: node.name,
      menuID: node.menuID || '' // Ensure menuID is included even if it's null
      }));

    console.log('Checked Nodes:', checkedNodes);
  
    // Optionally save
    localStorage.setItem('checkedTreeNodes', JSON.stringify(checkedNodes));
  }
  
  saveTreeState33(): void {
    const treeStateToSave = this.treeControl.dataNodes.map(node => ({
      id: node.id,
      name: node.name,
      checked: !!node.checked
    }));
  
    console.log('Saved Tree State:', treeStateToSave);
  
    // Example: Save to local storage (you can replace this with API call)
    localStorage.setItem('treeState', JSON.stringify(treeStateToSave));
  }
  
  
  saveTreeState22211(): void {
    const serializeTree = (nodes: TreeNode[]): any[] => {
      return nodes.map(node => ({
        id: node.id,
        name: node.name,
        checked: !!node.checked,
        indeterminate: !!node.indeterminate,
        children: node.children ? serializeTree(node.children) : []
      }));
    };

    const serializedData = serializeTree(this.dataSource.data);
    localStorage.setItem('treeViewData', JSON.stringify(serializedData));
    console.log('Tree view data saved:', serializedData);
  }
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  onGroupChange() {
    const selected = this.groupSelections[this.selectedGroup] ?? new Set<string>();
    selected.clear(); // Clear previous selections
  
    if (this.selectedGroup === 'Admins') {
      // Select all nodes by name
      this.treeControl.dataNodes.forEach(node => {
        node.checked = true;
        node.indeterminate = false;
        selected.add(node.name);
      });
    } else if (this.selectedGroup === 'Guests') {
      const targetNames = ['1', '2', '3', '4', '5'];
      this.treeControl.dataNodes.forEach(node => {
        const shouldCheck = targetNames.includes(node.id);
        node.checked = shouldCheck;
        node.indeterminate = false;
        if (shouldCheck) selected.add(node.name);
      });
    } 
    else if (this.selectedGroup === 'Guests1111') {
      const targetNames = ['Level 5: Execute A1.1', 'Level 5: Execute A1.2', 'Level 4: View A1'];
    
      this.treeControl.dataNodes.forEach(node => {
        if (targetNames.includes(node.name) && !node.checked) {
          this.toggleCheckbox(node);
        }
      });
    }
    else if (this.selectedGroup === 'Users') {
      this.treeControl.dataNodes.forEach(node => {
        const shouldCheck = node.name === 'Level 5: Execute B1.2';
        node.checked = shouldCheck;
        node.indeterminate = false;
        if (shouldCheck) selected.add(node.name);
      });
    }
  
    this.groupSelections[this.selectedGroup] = selected;
  
    this.treeControl.dataNodes.forEach(node => {
      node.checked = selected.has(node.name);
      node.indeterminate = false;
    });
  
    // Update parent indeterminate states
    this.treeControl.dataNodes.forEach(node => {
      this.updateParents(node);
    });
    this.treeControl.expandAll(); // Optional
  }
 
  constructor(private api: ApiService) {
    this.dataSource.data = TREE_DATA;
  }
  findParent(nodes: TreeNode[], child: TreeNode): TreeNode | null {
    for (const node of nodes) {
      if (node.children?.includes(child)) {
        return node;
      }
      const parent = this.findParent(node.children || [], child);
      if (parent) return parent;
    }
    return null;
  }
  hasChild = (_: number, node: FlatNode) => node.expandable;

  toggleCheckbox1(node: FlatNode): void {
    node.checked = !node.checked;
    node.indeterminate = false;
  
    this.checkDescendants(node, node.checked);
    this.updateParents(node);
  }
  toggleCheckbox(node: FlatNode): void {
    node.checked = !node.checked;
    node.indeterminate = false;
  
    // Update descendants
    const descendants = this.getDescendants(node);
    descendants.forEach(child => {
      child.checked = node.checked;
      child.indeterminate = false;
    });
  
    // Update all parent nodes
    this.updateAllParents(node);
  }
  updateAllParents(node: FlatNode): void {
    let parent = this.getParentNode(node);
    while (parent) {
      const descendants = this.getDescendants(parent);
      const allChecked = descendants.every(child => child.checked);
      const someChecked = descendants.some(child => child.checked || child.indeterminate);
  
      parent.checked = allChecked;
      parent.indeterminate = !allChecked && someChecked;
  
      parent = this.getParentNode(parent);
    }
  }
  checkDescendants(node: FlatNode, isChecked: boolean): void {
    const descendants = this.treeControl.getDescendants(node);
    descendants.forEach(child => {
      child.checked = isChecked;
      child.indeterminate = false;
    });
  }
  getDescendants(node: FlatNode): FlatNode[] {
    const startIndex = this.treeControl.dataNodes.indexOf(node);
    const results: FlatNode[] = [];
    for (let i = startIndex + 1; i < this.treeControl.dataNodes.length; i++) {
      const current = this.treeControl.dataNodes[i];
      if (current.level <= node.level) {
        break;
      }
      results.push(current);
    }
    return results;
  }
  updateParents(node: FlatNode): void {
    let parent = this.getParentNode(node);
    while (parent) {
      const descendants = this.treeControl.getDescendants(parent);
      const allChecked = descendants.every(d => d.checked);
      const noneChecked = descendants.every(d => !d.checked && !d.indeterminate);
  
      parent.checked = allChecked;
      parent.indeterminate = !allChecked && !noneChecked;
  
      parent = this.getParentNode(parent);
    }
  }
  getParentNode(node: FlatNode): FlatNode | null {
  const nodeIndex = this.treeControl.dataNodes.indexOf(node);
  for (let i = nodeIndex - 1; i >= 0; i--) {
    const current = this.treeControl.dataNodes[i];
    if (current.level < node.level) {
      return current;
    }
  }
  return null;
}
  getParentNode1(node: FlatNode): FlatNode | null {
    const nodeIndex = this.treeControl.dataNodes.indexOf(node);
    if (nodeIndex < 0) return null;
  
    for (let i = nodeIndex - 1; i >= 0; i--) {
      const current = this.treeControl.dataNodes[i];
      if (current.level < node.level) return current;
    }
    return null;
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
