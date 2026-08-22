"use client";

import { marked } from "marked";
import { useState } from "react";
import itineraryMarkdown from "../content/itinerary.md?raw";

type Tab = "itinerary" | "tickets" | "transit" | "documents";

const ticketItems = [
  { label: "0928 巴特罗之家", url: "https://drive.google.com/file/d/1jyywswvqEm0LfKqn7EufmUVsMDZE0G5y/view?usp=sharing" },
  { label: "0928 米拉之家", url: "https://drive.google.com/file/d/13TuoyA4Whx7SJqWnbhC3hX1rSQjH_2_s/view?usp=sharing" },
  { label: "0929 奎尔公园", url: "https://drive.google.com/file/d/1HYpOoKO56BQF7ln52BMacaQc0TVsOkCh/view?usp=sharing" },
  { label: "0930 蒙塞拉特" },
  { label: "1001 圣家堂", url: "https://drive.google.com/file/d/10YH6D77-85DPSdvKnENjvTXiNY-9NCTv/view?usp=sharing" },
  { label: "1002 晚间表演", url: "https://drive.google.com/file/d/1AGo-MESzIqx--Sdo8e0HaQOiSs8s7uxE/view?usp=sharing" },
  { label: "1003 塞维利亚主教座堂", url: "https://drive.google.com/file/d/1IU_tOV2Es4oV5vBCEmmSyoRWXzJKUqHX/view?usp=sharing" },
  { label: "1004 科尔多瓦清真寺" },
  { label: "1005 塞维利亚王宫", url: "https://drive.google.com/file/d/1_8qFpLwB46APp8EMSuxWHxfPUL5Uc4Gp/view?usp=sharing" },
  { label: "1007 马德里皇宫", url: "https://drive.google.com/file/d/1cT7k_MUtSCCgiLSXUQMblF8A4AwkLkTO/view?usp=sharing" },
  { label: "1008 普拉多博物馆", url: "https://drive.google.com/file/d/1Rmbw8OiLL3KMY3jOQlg-vCrtLGOi7xbs/view?usp=sharing" },
  { label: "1008 索菲亚王后艺术中心", url: "https://drive.google.com/file/d/1EbNRK5VA1GBKCmjKUViKCy1Dt4T7zq5B/view?usp=sharing" },
];

const transitItems = [
  { label: "巴塞罗那 → 塞维利亚航班", url: "https://drive.google.com/file/d/11BGMvU3ugx-aCqkniIaoWjzbgmQ81D45/view?usp=sharing" },
  { label: "科尔多瓦电子车票", url: "https://drive.google.com/file/d/1vHTHNFYFcmmTFn5MLUruEIs0RtzcdWUB/view?usp=sharing" },
  { label: "塞维利亚 → 马德里车票", url: "https://drive.google.com/file/d/1d5ePe36ktZnEUG0vwUoi-epRZIJ1oj-M/view?usp=sharing" },
  { label: "往返国际航班", url: "https://drive.google.com/file/d/10DXUPjXP4_xF7f-HbUhxmgaZGlPucI1E/view?usp=sharing" },
];

const documentItems = [
  { label: "旅行保险保单", url: "https://drive.google.com/file/d/12ka8nWZ1WYeseKwx0Ay4JXGjOFhCU0ty/view?usp=sharing" },
];

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "itinerary", label: "完整攻略", icon: "攻略" },
  { id: "tickets", label: "景点门票", icon: "门票" },
  { id: "transit", label: "城际交通", icon: "交通" },
  { id: "documents", label: "重要文件", icon: "文件" },
];

const navigableMarkdown = itineraryMarkdown
  .replace("# 0｜总行程审计结论", '<span id="overview"></span>\n# 0｜总行程审计结论')
  .replace("# 8｜全程出发前总 Checklist", '<span id="checklist"></span>\n# 8｜全程出发前总 Checklist')
  .replace("# PART A｜Barcelona 详细攻略", '<span id="barcelona"></span>\n# PART A｜Barcelona 详细攻略')
  .replace("# PART B｜Sevilla / Córdoba 详细攻略", '<span id="sevilla"></span>\n# PART B｜Sevilla / Córdoba 详细攻略')
  .replace("# PART C｜Madrid 详细攻略", '<span id="madrid"></span>\n# PART C｜Madrid 详细攻略');

const itineraryHtml = marked.parse(navigableMarkdown, {
  async: false,
  gfm: true,
  breaks: false,
}) as string;

function QuickLinkList({ items }: { items: Array<{ label: string; url?: string }> }) {
  return (
    <div className="private-list">
      {items.map((item) => (
        <div className="private-row" key={item.label}>
          <div className="private-name">
            <span className={`status-dot ${item.url ? "ready" : ""}`} aria-hidden="true" />
            <span>{item.label}</span>
          </div>
          <div className="row-actions">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noreferrer">打开文件 ↗</a>
            ) : (
              <span className="tbd-label">TBD</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("itinerary");

  return (
    <main>
      <header className="hero">
        <nav className="topbar" aria-label="主导航">
          <a className="brand" href="#top" aria-label="西班牙行程首页">
            <span className="brand-mark">ES</span>
            <span>España 2026</span>
          </a>
          <div className="privacy-button">
            <span className="lock" aria-hidden="true">●</span>
            快速链接 <b>15</b>
          </div>
        </nav>

        <div className="hero-copy" id="top">
          <p className="eyebrow">2026.09.26 — 10.09 · 全程旅行手册</p>
          <h1>从地中海，<br />一路走到马德里。</h1>
          <p className="hero-subtitle">上海 · 北京 · 巴塞罗那 · 蒙塞拉特 · 塞维利亚 · 科尔多瓦 · 马德里</p>
          <div className="route-line" aria-label="旅行路线">
            <span>SHA</span><i /><span>BCN</span><i /><span>SVQ</span><i /><span>MAD</span>
          </div>
        </div>
        <div className="sun-shape" aria-hidden="true" />
        <div className="tile-shape" aria-hidden="true" />
      </header>

      <div className="tab-wrap">
        <div className="tabs" role="tablist" aria-label="行程内容">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "itinerary" && (
        <section className="guide-shell" role="tabpanel">
          <nav className="guide-jumpnav" aria-label="攻略章节跳转">
            <a href="#overview">总控</a>
            <a href="#checklist">出发清单</a>
            <a href="#barcelona">Barcelona</a>
            <a href="#sevilla">Sevilla / Córdoba</a>
            <a href="#madrid">Madrid</a>
          </nav>
          <article className="markdown-content" dangerouslySetInnerHTML={{ __html: itineraryHtml }} />
          <a className="back-to-top" href="#top">回到顶部 ↑</a>
        </section>
      )}

      {activeTab === "tickets" && (
        <section className="content links-section" role="tabpanel">
          <div className="section-heading">
            <div><p className="mini-label">QUICK ACCESS</p><h2>景点门票</h2></div>
            <p>点击后直接打开对应的 Google Drive 文件；两个尚未确认的项目暂时标记为 TBD。</p>
          </div>
          <QuickLinkList items={ticketItems} />
        </section>
      )}

      {activeTab === "transit" && (
        <section className="content links-section" role="tabpanel">
          <div className="section-heading">
            <div><p className="mini-label">ON THE MOVE</p><h2>城际交通</h2></div>
            <p>点击即可打开对应的航班或铁路电子文件。</p>
          </div>
          <QuickLinkList items={transitItems} />
        </section>
      )}

      {activeTab === "documents" && (
        <section className="content links-section" role="tabpanel">
          <div className="section-heading">
            <div><p className="mini-label">ESSENTIAL DOCS</p><h2>重要文件</h2></div>
            <p>旅行途中需要快速查阅的保险及其他重要材料。</p>
          </div>
          <QuickLinkList items={documentItems} />
        </section>
      )}

      <footer>
        <span>Buen viaje</span>
        <p>Made for a slow journey across Spain · 2026</p>
      </footer>
    </main>
  );
}
