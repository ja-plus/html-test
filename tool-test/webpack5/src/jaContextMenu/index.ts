import ContextMenu from 'ja-contextmenu';
const contextMenu = new ContextMenu();
const menu = contextMenu.create({
  items: [{ label: '菜单1' }, { label: '菜单2' }],
});
window.addEventListener('contextmenu', e => {
  menu.show(e);
});
