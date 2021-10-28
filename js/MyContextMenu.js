/**
 * 右键菜单功能
 * 问题，多次new 会一直向dom中添加元素
 * TODO: 二级菜单，禁用，图标
 */
import h from './utils/h.js'
const _wrapperClassName = 'mycontextmenu';
const _childWrapperClassName = 'mycontextmenu_child';
const _mainMenuWidth = 200;
const _cssStr = `
    .${_wrapperClassName}{
        border: 1px solid #ddd;
        position: absolute;
        left: 0;top:0;
        background-color: #fff;
        padding: 2px 0 2px 0px;
        margin: 0;
        cursor: default;
        width: ${_mainMenuWidth}px;
        display: none;
    }
    .${_wrapperClassName} li {
        position: relative;
        padding: 0 30px 0 30px;
        list-style: none;
        line-height: 24px;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
    }
    .${_wrapperClassName} li span {
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .${_wrapperClassName} li span:nth-child(2){
        color:#aaa;
        font-size: 12px;
    }
    .${_wrapperClassName} li:hover,
    .${_wrapperClassName} li.hover{
        background-color: #eee;
    }
    .${_wrapperClassName} li .right-arrow {
        position: absolute;
        right: 8px;
        /* width: 24px;
        height: 24px;
        background-color: red; */
        top: 9px;
        border-top: 4px solid rgba(0,0,0,0);
        border-left: 4px solid #000;
        border-right: 4px solid rgba(0,0,0,0);
        border-bottom: 4px solid rgba(0,0,0,0);
    }
    `;

class MyContextMenu {
    /**
     * 如果创建了多个不一样的菜单，则需要在显示一个菜单的同时，关闭其他菜单
     * 因此需要统一管理创建的所有菜单元素, 
     * (也可以统一管理传入的配置，右键时渲染，点击其他地方删除元素)
     */
    #storeEle = [];
    #childMenuElements = new Map();
    constructor() {
        this.#injectCss();
        this.#onPageResize();
    }
    /**
     * create menu element
     * @param {Object} config 
     * @returns {HTMLElement} context menu element
     */
    create(config){
        const contextMenuEle = h(`ul.${_wrapperClassName}`, [
            ...config.items.map(it => {
                return h('li',{
                    onclick: it.onclick,
                    onmouseenter: it.children?.length 
                        ? (e => this.#showChildMenu(e, it.children))
                        : () => this.#hideChildMenu(),
                }, [
                    h('span', it.label),
                    it.tip && h('span', it.tip),
                    it.children && h('span.right-arrow')
                ])
            })
        ]);
        contextMenuEle.oncontextmenu = e => e.preventDefault(); 
        // close contextmenu
        window.addEventListener('click', () => {
            contextMenuEle.style.display = 'none';
            this.#hideChildMenu();
        });
        document.body.append(contextMenuEle);
        this.#storeEle.push(contextMenuEle);
        return contextMenuEle;
    }
    #injectCss(){
        // 已经有css就不重复加css
        let style = document.querySelector('#myContextMenu');
        if(!style){
            style = h('style#myContextMenu',{
                innerHTML: _cssStr
            });
            document.head.appendChild(style);
        }
    }
    #showChildMenu(e, children){
        let childMenuEle = this.#childMenuElements.get(children);
        if(!childMenuEle){
            childMenuEle = h(`ul.${_wrapperClassName}`, [
                ...children.map(child => {
                    return h('li', {
                        onclick: child.onclick
                    },[
                        h('span',child.label),
                        h('span',child.tip),
                    ])
                })
            ]);
            childMenuEle.oncontextmenu = e => e.preventDefault();
            this.#childMenuElements.set(children, childMenuEle);
            document.body.appendChild(childMenuEle);
        }
        // if childMenuEle is hidden
        if(!childMenuEle.style.display || childMenuEle.style.display === 'none'){
            const liPosition = e.target.getBoundingClientRect();
            e.target.classList.add('hover');
            childMenuEle.style.display = 'block';
            childMenuEle.style.transform = `translate(${liPosition.left + _mainMenuWidth - 10}px,${liPosition.top}px)`;

        }

        // TODO: 右侧边界判断
        // TODO: 下方边界判断
    }
    #hideChildMenu(){
        this.#childMenuElements.forEach((ul) => {
            ul.style.display = 'none';
            // TODO: 优化
            let hovers = document.querySelectorAll('li.hover');
            hovers.forEach(li => {
                li.classList.remove('hover');
            });
        });
    }
    /**页面大小变化时 */
    #onPageResize(){

    }
    /** open menu */
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