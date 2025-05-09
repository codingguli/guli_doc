import 'prismjs';
import 'prismjs/components/prism-sql.js'; // 导入 SQL 语法支持
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "故里",
  description: "A VitePress Site",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        items: [
          { text: '前端原理', link: '/frontend/principle/principle.md' },
          { text: '前端面试题', link: '/frontend/interviewQuestions/interviewQuestions.md' }
        ]
      },
      {
        text: '后端',
        items: [
          { text: 'Python', link: '/backend/python/python.md' },
          { text: 'Mysql', link: '/backend/mysql/mysql.md' },
        ],
      },
      {
        text: '工具',
        items: [
          { text: 'GitHub Actions CI/CD', link: '/tools/github/github.md' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/codingguli' }
    ],
    outlineTitle: '本页内容',
    outline: [2, 3]
  }
})