/**
 * 右键菜单功能
 * 问题，多次new 会一直向dom中添加元素
 * TODO: 禁用，图标
 */
import h from './utils/h.js'
const _wrapperClassName = 'mycontextmenu';
const _mainMenuWidth = 200;
const _childMenuWidth = 150;
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
    .${_wrapperClassName} li span.label {
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .${_wrapperClassName} li span.tip{
        color:#aaa;
        font-size: 12px;
    }
    .${_wrapperClassName} li:hover,
    .${_wrapperClassName} li.${_wrapperClassName}_hover{
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
    .${_wrapperClassName}_child{
        width: ${_childMenuWidth}px;
    }
    `;

class MyContextMenu {
    /**
     * 如果创建了多个不一样的菜单，则需要在显示一个菜单的同时，关闭其他菜单
     * 因此需要统一管理创建的所有菜单元素, 
     * (也可以统一管理传入的配置，右键时渲染，点击其他地方删除元素)
     */
    /**@type {Array<HTMLElement>} */
    #storeEle = [];
    /**@type {Function} */
    #clickEventFunc;
    constructor() {
        this.#injectCss();
        this.#onPageResize();
        this.#hideMenuEventListener();
    }
    /**
     * create menu element
     * @param {Object} config 
     * @returns {HTMLElement} context menu element
     */
    create(config){
        const contextMenuEle = h(`ul.${_wrapperClassName}`,{
            onclick: e => e.stopPropagation()
        }, [
            ...config.items.map(it => {
                return h('li',{
                    onclick: e => {
                        it.onclick && it.onclick(e)
                        if(!it.children) this.hideMenu();
                    },
                    onmouseenter: it.children?.length 
                        ? (e => this.#showChildMenu(e, it.children, contextMenuEle))
                        : () => this.#hideChildMenu(contextMenuEle),
                }, [
                    h('span.label', it.label),
                    it.tip && h('span.tip', it.tip),
                    it.children && h('span.right-arrow')
                ])
            })
        ]);
        contextMenuEle.oncontextmenu = e => e.preventDefault(); 
        // close contextmenu
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
    /**click and close menu listener */
    #hideMenuEventListener(){
        // add once event
        if(!this.#clickEventFunc){
            this.#clickEventFunc = (e) => {
                this.hideMenu();
            }
            window.addEventListener('click', this.#clickEventFunc);
        }
    }
    /**
     * 
     * @param {MouseEvent} e 
     * @param {Array} children 
     * @param {HTMLElement} contextMenuEle 
     */
    #showChildMenu(e, children, contextMenuEle){
        this.#hideChildMenu(contextMenuEle); // close other child menu
        /**@type {HTMLElement} */
        let childMenuEle = e.target.querySelector(`ul.${_wrapperClassName}_child`);
        if(!childMenuEle){
            childMenuEle = h(`ul.${_wrapperClassName}.${_wrapperClassName}_child`, [
                ...children.map(child => {
                    return h('li', {
                        onclick: e => {
                            child.onclick && child.onclick(e);
                            this.hideMenu();
                        }
                    },[
                        h('span.label',child.label),
                        h('span.tip',child.tip),
                    ])
                })
            ]);
            childMenuEle.oncontextmenu = e => e.preventDefault();
            e.target.appendChild(childMenuEle);
        }
        // if childMenuEle is hidden
        if(!childMenuEle.style.display || childMenuEle.style.display === 'none'){
            e.target.classList.add(_wrapperClassName +'_hover');
            childMenuEle.style.display = 'block';
            childMenuEle.style.transform = `translateX(${_mainMenuWidth - 5}px)`;
        }

        // TODO: 右侧边界判断
        // TODO: 下方边界判断
    }
    /**
     * @param {HTMLElement} contextMenuEle 
     */
    #hideChildMenu(contextMenuEle){
        // 取消主菜单选中状态
        let hovers = contextMenuEle.querySelectorAll(`.${_wrapperClassName}_hover`);
        hovers.forEach(li => {
            li.classList.remove(_wrapperClassName +'_hover');
            // 关闭子菜单
            let childMenu = li.querySelector(`ul.${_wrapperClassName}`);
            childMenu.style.display = 'none';
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
    hideMenu(){
        this.#storeEle.forEach(contextMenuEle => {
            contextMenuEle.style.display = 'none';
            this.#hideChildMenu(contextMenuEle);
        })
    }
    /**remove menu */
    deleteMenu(){

    }
}
export default MyContextMenu;