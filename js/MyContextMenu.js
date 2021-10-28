/**
 * 右键菜单功能
 * 问题，多次new 会一直向dom中添加元素
 * TODO: 二级菜单，禁用，图标
 */
import h from './utils/h.js'
const _wrapperClassName = 'mycontextmenu';
const _cssStr = `
    .${_wrapperClassName}{
        border: 1px solid #ddd;
        position: absolute;
        left: 0;top:0;
        background-color: #fff;
        padding: 2px 0 2px 0px;
        margin: 0;
        cursor: default;
        width: 200px;
        display: none;
    }
    .${_wrapperClassName} li {
        padding: 0 10px 0 30px;
        list-style: none;
        line-height: 24px;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
    .${_wrapperClassName} li span:nth-child(2){
        color:#aaa;
        font-size: 12px;
    }
    .${_wrapperClassName} li:hover{
        background-color: #eee;
    }`;

class MyContextMenu {
    /**
     * 如果创建了多个不一样的菜单，则需要在显示一个菜单的同时，关闭其他菜单
     * 因此需要统一管理创建的所有菜单元素
     */
    #storeEle = []
    constructor() {
        this.injectCss();
    }
    create(config){
        let contextMenuEle = h(`ul.${_wrapperClassName}`, [
            ...config.items.map(it => {
                return h('li',{
                    onclick: it.onclick
                }, [
                    h('span', it.label),
                    h('span', it.tip),
                ])
            })
        ]);
        contextMenuEle.oncontextmenu = e => e.preventDefault(); 
        // close contextmenu
        window.addEventListener('click', () => {
            contextMenuEle.style.display = 'none';
        });
        document.body.append(contextMenuEle);
        this.#storeEle.push(contextMenuEle);
        return contextMenuEle;
    }
    injectCss(){
        // 已经有css就不重复加css
        let style = document.querySelector('#myContextMenu');
        if(!style){
            style = h('style#myContextMenu',{
                innerHTML: _cssStr
            });
            document.head.appendChild(style);
        }
    }
    showContextMenu(contextMenuEle){
        // return this.#onContextMenu.bind(this);
        return (e) => {
            this.#storeEle.forEach(ele => {
                if(ele!== contextMenuEle) ele.style.display = 'none'; // 关闭其他菜单
            });
            e.preventDefault();
            contextMenuEle.style.display = 'block';
            contextMenuEle.style.transform = `translate(${e.pageX}px,${e.pageY}px)`;
        }
    }
}
export default MyContextMenu;