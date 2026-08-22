# España 2026

一份为移动端优先设计的西班牙国庆旅行手册，发布在 GitHub Pages。

## 隐私设计

- 仓库和构建产物不包含 Google Drive 私人链接。
- 不收录姓名、证件号、订单号、航班票面或二维码。
- 门票与交通链接由使用者在网页内手动添加，仅保存在当前浏览器的 `localStorage`。
- 更换设备或清除浏览器数据后，需要重新添加私人链接。

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
