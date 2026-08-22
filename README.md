# España 2026

一份为移动端优先设计的西班牙国庆旅行手册，发布在 GitHub Pages。

网站提供两种查阅方式：

- “总行程”以 14 天时间轴呈现，每一天都可点击进入适合旅行途中快速查看的当天专页。
- “完整攻略”逐字呈现 `content/itinerary.md` 原文，并提供总控、交通、住宿、预约、Checklist 和三座城市的章节导航。

## 链接说明

- 门票和交通按钮直接指向 Google Drive 文件。
- “重要文件”标签页包含旅行保险保单入口。
- Drive 文件仍由 Google 账号权限控制，网站本身不复制文件内容。
- 仓库不收录姓名、证件号、订单号、航班票面或二维码。

## 本地开发

需要 Node.js 22 或更高版本。

```bash
npm install
npm run dev
```

GitHub Pages 构建：

```bash
npm run build:pages
```

静态产物位于 `dist/client`。推送到 `main` 后，GitHub Actions 会自动部署。
