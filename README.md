# España 2026

一份为移动端优先设计的西班牙国庆旅行手册，发布在 GitHub Pages。

## 链接说明

- 门票和交通按钮直接指向 Google Drive 文件。
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
