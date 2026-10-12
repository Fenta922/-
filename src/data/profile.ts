// ============================================================
// 个人资料数据 —— 所有可替换的个人信息都集中在这个文件里
// 把下面的占位内容改成你自己的，保存后页面会自动更新
// ============================================================

export interface SocialLink {
  label: string
  url: string
}

export interface Project {
  id: string
  name: string
  /** 一句话描述，展示在卡片上 */
  tagline: string
  /** 详细描述，展示在点击卡片后的弹窗里 */
  description: string
  tags: string[]
  /** 在线地址（可选） */
  link?: string
  /** 源码地址（可选） */
  repo?: string
  /** 卡片图标，可选：leaf | book | chat | camera */
  icon: 'leaf' | 'book' | 'chat' | 'camera'
}

export interface SkillGroup {
  group: string
  icon: 'code' | 'palette' | 'wrench' | 'sparkles'
  items: string[]
}

export const profile = {
  /** 姓名（同时用于导航 Logo、页脚、SEO） */
  name: '钱谢雨',
  role: '努力生活学习的大学生',
  slogan: '请再坚持一下',
  city: '杭州',
  email: '1926669478@qq.com',

  github: 'https://github.com/Fenta922',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Fenta922' },
    { label: '知乎', url: 'https://www.zhihu.com/people/zhiyuan' },
    { label: '小红书', url: 'https://www.xiaohongshu.com/user/zhiyuan' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/zhiyuan' },
  ] as SocialLink[],

  /** 关于我：2-3 段短文 */
  about: [
    '我是一名正在努力学习生活的大一生',
    '工作之外，我维持着一些让自己安静下来的爱好：追剧听歌、胶片摄影，以及给开源项目提一些小补丁。这些爱好也悄悄影响着我做产品的方式——克制、耐心、留有余地。',
    '我相信好的产品像一间采光很好的房间，让人愿意待下去。如果你也有想一起做的东西，欢迎联系我。',
  ],

  /** 关于我的标签 */
  aboutTags: ['前端开发', '用户体验', '开源', '摄影', '听歌', '写作'],

  /** 技能分组 */
  skills: [
    { group: '开发', icon: 'code', items: ['TypeScript', 'React', 'Vue', 'Node.js', 'Vite', 'CSS 架构'] },
    { group: '设计', icon: 'palette', items: ['Figma', '设计系统', '交互原型', '排版与栅格'] },
    { group: '工具', icon: 'wrench', items: ['Git', 'Vercel', 'Docker', 'CI/CD', 'Vitest'] },
    { group: '其他', icon: 'sparkles', items: ['技术写作', '英文阅读', '项目管理'] },
  ] as SkillGroup[],

  /** 正在学习的一句话 */
  learning: '正在学习：Rust 与 WebGL，想把可视化做得更有质感。',

  /** 项目列表（3-6 个都支持，页面自动排版） */
  projects: [
    {
      id: 'qingshan',
      name: '青山笔记',
      tagline: '一款支持双链的本地优先 Markdown 笔记应用。',
      description:
        '为重度写作者打造的本地优先笔记应用。数据全部存储在本地文件系统，支持双向链接、全文检索与无网使用；界面遵循极简设计，常用操作都在两次按键以内完成。目前维护着约两千名日活用户。',
      tags: ['React', 'TypeScript', 'Tauri', 'SQLite'],
      link: 'https://example.com/qingshan',
      repo: 'https://github.com/zhiyuan/qingshan',
      icon: 'leaf',
    },
    {
      id: 'shipan',
      name: '拾伴',
      tagline: '为听歌爱好者设计的歌单记录与结伴小程序。',
      description:
        '从一次周末徒步的真实需求出发：记录歌单、分享感受、寻找同行伙伴。我负责前端整体架构与地图渲染性能优化，轨迹回放在低端手机上也能保持流畅，上线三个月自然增长到一万多名用户。',
      tags: ['小程序', 'Taro', '歌单可视化'],
      link: 'https://example.com/shipan',
      icon: 'book',
    },
    {
      id: 'zhiwu',
      name: '植物图鉴',
      tagline: '识别身边植物的开放数据小站，收录 3000+ 物种。',
      description:
        '一个周末项目：通过照片识别身边的植物，并把识别结果整理成开放的图鉴站点。从数据爬取清洗、轻量模型训练到前端展示都独立完成，目前每月有上万名访客，也被两所中学用作自然课的参考资料。',
      tags: ['Vue', 'Python', 'FastAPI'],
      repo: 'https://github.com/zhiyuan/plant-atlas',
      icon: 'camera',
    },
    {
      id: 'moman',
      name: '墨曼设计系统',
      tagline: '服务三条产品线的轻量级 React 组件库。',
      description:
        '为团队内部打造的组件库与设计规范：30+ 组件、可主题化、完整的键盘与读屏支持。配套文档站点与视觉回归测试，让三条产品线的设计语言保持一致，新页面搭建时间缩短了一半。',
      tags: ['React', '设计系统', 'Storybook'],
      repo: 'https://github.com/zhiyuan/moman-ui',
      icon: 'chat',
    },
  ] as Project[],

  /** 页脚签名 */
  signature: '慢慢做，做得久。',
}

/** 导航区块（同时用于 scroll-spy 高亮） */
export const navSections = [
  { id: 'about', label: '关于' },
  { id: 'projects', label: '项目' },
  { id: 'skills', label: '技能' },
  { id: 'contact', label: '联系' },
]
