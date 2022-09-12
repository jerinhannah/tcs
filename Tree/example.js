/* globals Tree */
'use strict';
$(document).ready(function() {
var tree = new Tree(document.getElementById('tree'), {
  navigate: true // allow navigate with ArrowUp and ArrowDown
});
tree.on('open', e => console.log('open', e));
tree.on('select', e => console.log('select', e));
tree.on('action', e => console.log('action', e));
tree.on('fetch', e => console.log('fetch', e));
tree.on('browse', e => console.log('browse', e));

tree.on('fetch', folder => window.setTimeout(() => {
  tree.file({
    name: 'Symptoms'
  }, folder);
  tree.file({
    name: 'Diagnosis'
  }, folder);

  folder.resolve();
}, 1000));

var structure = [{
  name: 'Name'
}, {
  name: 'History'
}, {
  name: 'Habits',
  open: false,
  type: Tree.FOLDER,
  selected: true,
  children: [{
    name: 'Age'
  }, {
    name: 'Gender'
  }, {
    name: 'Address',
    type: Tree.FOLDER,
    children: [{
      name: 'Contact',
      type: Tree.FOLDER,
      children: [{
        name: 'Family members',
        type: Tree.FOLDER,
        children: [{
          name: 'Mobile'
        }, {
          name: 'Telephone'
        }]
      }]
    }]
  }]
}, {
  name: 'Blood group',
  type: Tree.FOLDER,
  asynced: true
}];
// keep track of the original node objects
// tree.on('created', (e, node) => {
//   e.node = node;
// });
tree.json(structure);

document.getElementById('browse-1').addEventListener('click', () => {
  tree.browse(a => {
    if (a.node.name === 'folder 2 (asynced)' || a.node.name === 'file 2/2') {
      return true;
    }
    return false;
  });
});

document.getElementById('browse-2').addEventListener('click', () => {
  tree.browse(a => {
    if (a.node.name.startsWith('folder 1') || a.node.name === 'file 1/1/1/1/2') {
      return true;
    }
    return false;
  });
});

document.getElementById('unload').addEventListener('click', () => {
  const d = tree.hierarchy().pop();
  tree.unloadFolder(d);
});

document.getElementById('previous').addEventListener('click', () => {
  tree.navigate('backward');
});
document.getElementById('next').addEventListener('click', () => {
  tree.navigate('forward');
});
});