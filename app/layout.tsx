import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kuro1fury.github.io/spain-2026-trip/"),
  title: "España 2026｜西班牙国庆行程",
  description: "2026/9/26–10/9，从上海出发，经巴塞罗那、塞维利亚与马德里的完整西班牙旅行手册。",
  openGraph: {
    title: "España 2026｜西班牙国庆行程",
    description: "从交通住宿到逐日路线、餐厅与天气预案的完整西班牙旅行手册。",
    type: "website",
    images: [{ url: "og.png", width: 1731, height: 909, alt: "España 2026 西班牙国庆行程" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "España 2026｜西班牙国庆行程",
    description: "从交通住宿到逐日路线、餐厅与天气预案的完整西班牙旅行手册。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
