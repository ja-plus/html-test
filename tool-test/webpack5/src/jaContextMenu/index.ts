import ContextMenu from 'ja-contextmenu';
const contextMenu = new ContextMenu();
const menu = contextMenu.create<number>({
  items: [{ label: '菜单1',onclick:(e,pl) => console.log(pl) }, { label: '菜单2' }],
});
window.addEventListener('contextmenu', e => {
  menu.show(e,1);
});
