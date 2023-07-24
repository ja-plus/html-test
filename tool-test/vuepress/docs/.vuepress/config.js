const { defineConfig } = require("vuepress/config");

module.exports = defineConfig({
    // ...
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
                {
                    title:'Home',
                    path: '/'
                },
                {
                    title:'Type Script',
                    path: '/typescript/note'
                },
        ]
    }
});