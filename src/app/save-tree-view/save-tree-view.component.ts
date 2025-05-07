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
          { menuID: '1', 
          name: 'Level 4: Confirm A1',
          children: [
            {id:'1',name: 'View' ,menuID: '3'},
            {id:'2', name: 'Save', menuID: '3' },
            {id:'3', name: 'Edit', menuID: '3' },
            {id:'4', name: 'Delete', menuID: '3' },
            {id:'5', name: 'Print', menuID: '3' }
          ]
          },
          {
          name: 'Level 4: Confirm A2',
          children: [
            {id:'1',name: 'View' ,menuID: '2'},
            {id:'2', name: 'Save', menuID: '2' },
            {id:'3', name: 'Edit', menuID: '2' },
            {id:'4', name: 'Delete', menuID: '2' },
            {id:'5', name: 'Print', menuID: '2' }
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
 
  
 ];


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
  selectedGroup: { groupId: number, groupName: string } | null = null;
  selected_Group: UserGroup = { groupId: 1, groupName: 'Admins' };

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
    if (this.selectedGroup) {
      console.log('Selected Group ID:', this.selectedGroup.groupId);
      console.log('Selected Group Name:', this.selectedGroup.groupName);

      // Clear all selections before applying new ones
      this.deselectAll();

      this.api.getGroupPermissions(this.selectedGroup.groupId).subscribe(data => {
        console.log('Tree Data for Group:', data);

        // Function to check nodes based on menuID and actionName
        const checkNodes = (nodes: TreeNode[], menuID: string, actionName: string): void => {
          nodes.forEach(node => {
            if ((node.menuID?.toString() ?? '') === menuID.toString() && node.name === actionName) {
              node.checked = true;
              console.log('Checked Node:', node);
            }
            if (node.children) {
              checkNodes(node.children, menuID, actionName);
            }
          });
        };

        // Iterate through the data and check corresponding nodes
        data.forEach((item: any) => {
          const menuIDToCheck = item.menuId;
          const actionNameToCheck = item.actionName;
          checkNodes(this.dataSource.data, menuIDToCheck, actionNameToCheck);
        });

        // Update the tree control to reflect changes
        this.treeControl.dataNodes.forEach(node => {
          const treeNode = this.flatNodeMap.get(node);
          //if ((node.menuID?.toString() ?? '') === menuID.toString() && node.name === actionName) {
          if (treeNode) {
            node.checked = treeNode.checked || false;
            node.indeterminate = treeNode.indeterminate || false;
          }
        });

        // Update parent nodes' states
        this.treeControl.dataNodes.forEach(node => {
          this.updateParents(node);
        });

        // Expand all nodes to maintain the sequence
        this.treeControl.expandAll();

         // ✅ Detect changes after all updates
          //this.cdr.detectChanges();
      });
    }
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
  // clearTreeNodes(nodes: TreeNode[]) {
  //   for (const node of nodes) {
  //     node.checked = false;
  //     node.indeterminate = false;
  //     if (node.children) {
  //       this.clearTreeNodes(node.children);
  //     }
  //   }
  // }
  deselectAll() {
    this.treeControl.dataNodes.forEach(node => {
      node.checked = false;
      node.indeterminate = false;
  
      const flatNode = this.flatNodeMap.get(node);
      if (flatNode) {
        flatNode.checked = false;
        flatNode.indeterminate = false;
      }
    });
  }
  deselectAll11() {
    console.log('Deselecting all nodes');
    this.treeControl.dataNodes.forEach(n => {
      console.log('Deselecting node:', n.name);
      n.checked = false;
      n.indeterminate = false;
    });
  }
}
