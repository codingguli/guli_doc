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
          { text: 'Html', link: '/frontend/html.md' },
          { text: 'Css', link: '/frontend/css.md' },
          { text: 'Javascript', link: '/frontend/javascript.md' },
          { text: 'Vue', link: '/frontend/vue.md' },
          { text: 'React', link: '/frontend/react.md' },
          { text: '前端原理', link: '/frontend/principle/principle.md' },
          { text: '前端面试题', link: '/frontend/interviewQuestions/interviewQuestions.md' }
        ]
      },
      {
        text: '后端',
        items: [
          { text: 'Nodejs', link: '/backend/node.md' },
          { text: 'Nestjs', link: '/backend/nest.md' },
          { text: 'Python', link: '/backend/python/python.md' },
          { text: 'Nginx', link: '/backend/nginx.md' },
          { text: 'Mysql', link: '/backend/mysql/mysql.md' },
          { text: 'Django', link: '/backend/django/django.md' },
          { text: 'Flask', link: '/backend/flask/flask.md' },
          { text: 'AI大模型', link: '/backend/RAG/RAG.md' },
        ],
      },
      {
        text: '运维',
        items: [
          { text: 'Docker', link: '/devops/docker.md' },
        ],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/codingguli' }
    ],
    outlineTitle: '本页内容',
    outline: [2, 3]
  }
})