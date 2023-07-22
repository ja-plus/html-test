import { defineConfig } from 'vitepress'
export default defineConfig({
    title: 'Note',
    description: 'Just playing around.',
    markdown: {
        lineNumbers: true, // 开启行号
    },
    themeConfig: {
        nav: [
            { text: '首页', link: '/', activeMatch: '/' },
            {
                text: 'typescript',
                items: [
                    { text: 'note', link: '/typescript/note' }
                ]
            }
        ],
        sidebar: [
            { text: 'index', link: '/' },
            {
                text: 'TypeScript',
                items: [
                    { text: 'Note', link: '/typescript/note.html' }
                ],
                collapsible: true, //菜单是否为可折叠的 
                collapsed: false //是否默认折叠
            }
        ]
    },
})