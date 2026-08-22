"use client";

import { marked } from "marked";
import { useState } from "react";
import itineraryMarkdown from "../content/itinerary.md?raw";

type Tab = "summary" | "guide" | "tickets" | "transit" | "documents";
type Tone = "coral" | "green" | "sand" | "blue" | "gold";

function section(start: string, end?: string) {
  const startToken = `\n${start}\n`;
  const matchedStart = itineraryMarkdown.indexOf(startToken);
  const startIndex = matchedStart >= 0 ? matchedStart + 1 : itineraryMarkdown.startsWith(`${start}\n`) ? 0 : -1;
  if (startIndex < 0) return "";
  const endToken = end ? `\n${end}\n` : "";
  const matchedEnd = end ? itineraryMarkdown.indexOf(endToken, startIndex + start.length) : -1;
  const endIndex = matchedEnd >= 0 ? matchedEnd + 1 : -1;
  return itineraryMarkdown.slice(startIndex, endIndex < 0 ? undefined : endIndex).trim();
}

function renderMarkdown(source: string) {
  return marked.parse(source, { async: false, gfm: true, breaks: false }) as string;
}

const days: Array<{
  id: string;
  date: string;
  city: string;
  title: string;
  detail: string;
  tone: Tone;
  markdown: string;
}> = [
  {
    id: "0926", date: "09.26", city: "上海 → 北京", title: "旅程启程", detail: "虹桥出发 · 北京联程中转", tone: "blue",
    markdown: `# 9/26｜上海出发

**今晚的唯一任务：顺利完成国际联程的第一段。**

## ✈️ 22:30｜上海虹桥 T2 → 北京首都 T3

**CA1566｜22:30 出发 → 00:55（9/27）到达**

- 提前到上海虹桥办理值机和托运。
- 在柜台明确确认行李是否直挂 Barcelona。
- 查看行李条目的最终目的地代码，拍照保存。
- 尽量一次拿到 CA1566 与 CA845 两段登机牌。
- 充电宝只放随身行李，并确认有清晰的 3C / CCC 标识。

## 北京转机

中转时间 **1 小时 55 分钟**。抵达后直接按“国际转机 / Transfer”标识行动，不在航站楼内停留或购物。`,
  },
  { id: "0927", date: "09.27", city: "北京 → 巴塞罗那", title: "抵达地中海", detail: "落地安顿 · 哥特区 · Born · 海边", tone: "coral", markdown: section("# 9/27｜抵达日：老城 + 海边", "# 9/28｜高迪住宅日") },
  { id: "0928", date: "09.28", city: "巴塞罗那", title: "现代主义建筑日", detail: "Casa Batlló · La Pedrera · Gràcia", tone: "coral", markdown: section("# 9/28｜高迪住宅日", "# 9/29｜Park Güell") },
  { id: "0929", date: "09.29", city: "巴塞罗那", title: "高迪的城市花园", detail: "Park Güell · Gràcia 慢游", tone: "green", markdown: section("# 9/29｜Park Güell", "# 9/30｜Montserrat") },
  { id: "0930", date: "09.30", city: "蒙塞拉特", title: "山间一日", detail: "修道院 · 圣像 · 山景 · 轻徒步", tone: "sand", markdown: section("# 9/30｜Montserrat 一日游", "# 10/1｜Sagrada Família") },
  { id: "1001", date: "10.01", city: "巴塞罗那", title: "高迪巅峰", detail: "Sagrada Família · Sant Pau · 最后一晚", tone: "blue", markdown: section("# 10/1｜Sagrada Família", "# 10/2｜Barcelona → Sevilla") },
  {
    id: "1002", date: "10.02", city: "巴塞罗那 → 塞维利亚", title: "南下安达卢西亚", detail: "FR1165 · 入住 · Bienal Flamenco", tone: "coral",
    markdown: [
      section("# 10/2｜Barcelona → Sevilla", "# 🍴 餐厅池｜不用每天重新搜索"),
      section("# 10/2｜抵达 Sevilla + Bienal Flamenco", "# 10/3｜Cathedral"),
    ].join("\n\n---\n\n"),
  },
  { id: "1003", date: "10.03", city: "塞维利亚", title: "大教堂与慢城", detail: "Cathedral · Giralda · Santa Cruz", tone: "gold", markdown: section("# 10/3｜Cathedral", "# 10/4｜Córdoba") },
  { id: "1004", date: "10.04", city: "科尔多瓦", title: "白色古城一日", detail: "Mezquita · Judería · Roman Bridge", tone: "sand", markdown: section("# 10/4｜Córdoba 一日游", "# 10/5｜Plaza de España") },
  { id: "1005", date: "10.05", city: "塞维利亚", title: "广场、公园与王宫", detail: "Plaza de España · María Luisa · Real Alcázar", tone: "green", markdown: section("# 10/5｜Plaza de España", "# 10/6｜Sevilla → Madrid") },
  {
    id: "1006", date: "10.06", city: "塞维利亚 → 马德里", title: "抵达首都", detail: "OUIGO · 老 Madrid · Debod · La Latina", tone: "blue",
    markdown: [
      section("# 10/6｜Sevilla → Madrid", "# 🍴 餐厅池｜不用每天重新搜索"),
      section("# 10/6｜抵达 Madrid + 老城 + Debod + La Latina", "# 10/7｜Royal Madrid"),
    ].join("\n\n---\n\n"),
  },
  { id: "1007", date: "10.07", city: "马德里", title: "Royal Madrid", detail: "皇宫 · Almudena · Gran Vía · Malasaña", tone: "coral", markdown: section("# 10/7｜Royal Madrid", "# 10/8｜Prado") },
  { id: "1008", date: "10.08", city: "马德里", title: "艺术与旅行终章", detail: "Prado · Retiro · Reina Sofía · 最后晚餐", tone: "gold", markdown: section("# 10/8｜Prado", "# 🍴 Madrid 吃什么") },
  {
    id: "1009", date: "10.09", city: "马德里 → 北京 → 上海", title: "平安回家", detail: "午夜航班 · 北京联程 · 抵达虹桥", tone: "green",
    markdown: `# 10/9｜Madrid → 北京 → 上海

**旅行最后一天的目标：留足机场和联程时间，平稳回家。**

## ✈️ 00:35｜Madrid T1 → 北京首都 T3

**CA898｜00:35 出发 → 17:35 到达**

- 10/8 晚约 20:30 回酒店取行李。
- 约 20:45–21:00 从酒店出发，Taxi 前往 MAD T1。
- 把 **21:30 左右已到 T1** 当作目标。
- 在 Madrid 柜台明确确认托运行李是否直挂上海虹桥。
- 查看并拍照保存行李条目的目的地代码。

## 北京联程｜1 小时 55 分钟

严格按照现场“国际转国内”联程指引行动。如果柜台告知必须提取并重新托运行李，现场直接请 Air China 工作人员说明操作路线。

## ✈️ 19:30｜北京首都 T3 → 上海虹桥

**CA1563｜19:30 出发 → 21:50 到达**

抵达上海虹桥后，整趟 Spain 2026 行程结束。`,
  },
];

const dayHtml = Object.fromEntries(days.map((day) => [day.id, renderMarkdown(day.markdown)]));

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
  { id: "summary", label: "总行程", icon: "路线" },
  { id: "guide", label: "完整攻略", icon: "原文" },
  { id: "tickets", label: "景点门票", icon: "门票" },
  { id: "transit", label: "城际交通", icon: "交通" },
  { id: "documents", label: "重要文件", icon: "文件" },
];

const navigableMarkdown = itineraryMarkdown
  .replace("# 0｜总行程审计结论", '<span id="overview"></span>\n# 0｜总行程审计结论')
  .replace("# 1｜全程交通 Master Table", '<span id="transport"></span>\n# 1｜全程交通 Master Table')
  .replace("# 2｜住宿 Master Table", '<span id="hotels"></span>\n# 2｜住宿 Master Table')
  .replace("# 3｜全程核心预约 Master Table", '<span id="bookings"></span>\n# 3｜全程核心预约 Master Table')
  .replace("# 8｜全程出发前总 Checklist", '<span id="checklist"></span>\n# 8｜全程出发前总 Checklist')
  .replace("# PART A｜Barcelona 详细攻略", '<span id="barcelona"></span>\n# PART A｜Barcelona 详细攻略')
  .replace("# PART B｜Sevilla / Córdoba 详细攻略", '<span id="sevilla"></span>\n# PART B｜Sevilla / Córdoba 详细攻略')
  .replace("# PART C｜Madrid 详细攻略", '<span id="madrid"></span>\n# PART C｜Madrid 详细攻略');

const itineraryHtml = renderMarkdown(navigableMarkdown);

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
            {item.url ? <a href={item.url} target="_blank" rel="noreferrer">打开文件 ↗</a> : <span className="tbd-label">TBD</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const currentDay = days.find((day) => day.id === selectedDay);

  function showDay(id: string | null) {
    setSelectedDay(id);
    requestAnimationFrame(() => document.querySelector(".tab-wrap")?.scrollIntoView({ behavior: "smooth" }));
  }

  return (
    <main>
      <header className="hero">
        <nav className="topbar" aria-label="主导航">
          <a className="brand" href="#top" aria-label="西班牙行程首页"><span className="brand-mark">ES</span><span>España 2026</span></a>
          <div className="privacy-button"><span className="lock" aria-hidden="true">●</span>快速链接 <b>15</b></div>
        </nav>
        <div className="hero-copy" id="top">
          <p className="eyebrow">2026.09.26 — 10.09 · 全程旅行手册</p>
          <h1>从地中海，<br />一路走到马德里。</h1>
          <p className="hero-subtitle">上海 · 北京 · 巴塞罗那 · 蒙塞拉特 · 塞维利亚 · 科尔多瓦 · 马德里</p>
          <div className="route-line" aria-label="旅行路线"><span>SHA</span><i /><span>BCN</span><i /><span>SVQ</span><i /><span>MAD</span></div>
        </div>
        <div className="sun-shape" aria-hidden="true" /><div className="tile-shape" aria-hidden="true" />
      </header>

      <div className="tab-wrap">
        <div className="tabs" role="tablist" aria-label="行程内容">
          {tabs.map((tab) => (
            <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? "active" : ""}
              onClick={() => { setActiveTab(tab.id); if (tab.id === "summary") setSelectedDay(null); }}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "summary" && !currentDay && (
        <section className="content itinerary-section" role="tabpanel">
          <div className="section-heading">
            <div><p className="mini-label">THE JOURNEY</p><h2>14 天总行程</h2></div>
            <p>从上海出发到平安回家。点击任意一天，查看当天的完整时间安排、路线、餐厅、交通和 Plan B。</p>
          </div>
          <div className="timeline">
            {days.map((day, index) => (
              <button className="day-card" key={day.id} onClick={() => showDay(day.id)} aria-label={`查看 ${day.date} ${day.title}`}>
                <span className={`date-block ${day.tone}`}><span>DAY {String(index + 1).padStart(2, "0")}</span><strong>{day.date}</strong></span>
                <span className="day-copy"><span className="day-city">{day.city}</span><strong>{day.title}</strong><span>{day.detail}</span></span>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {activeTab === "summary" && currentDay && (
        <section className="day-detail-shell" role="tabpanel" id="day-detail">
          <button className="back-button" onClick={() => showDay(null)}>← 返回总行程</button>
          <header className={`day-detail-hero ${currentDay.tone}`}>
            <div><p>{currentDay.city}</p><h2>{currentDay.date} · {currentDay.title}</h2><span>{currentDay.detail}</span></div>
            <strong>DAY {String(days.indexOf(currentDay) + 1).padStart(2, "0")}</strong>
          </header>
          <article className="markdown-content day-detail-content" dangerouslySetInnerHTML={{ __html: dayHtml[currentDay.id] }} />
          <button className="back-button bottom" onClick={() => showDay(null)}>← 返回 14 天总行程</button>
        </section>
      )}

      {activeTab === "guide" && (
        <section className="guide-shell" role="tabpanel">
          <nav className="guide-jumpnav" aria-label="攻略章节跳转">
            <a href="#overview">总控</a><a href="#transport">交通</a><a href="#hotels">住宿</a><a href="#bookings">预约</a>
            <a href="#checklist">Checklist</a><a href="#barcelona">Barcelona</a><a href="#sevilla">Sevilla / Córdoba</a><a href="#madrid">Madrid</a>
          </nav>
          <article className="markdown-content" dangerouslySetInnerHTML={{ __html: itineraryHtml }} />
          <a className="back-to-top" href="#top">回到顶部 ↑</a>
        </section>
      )}

      {activeTab === "tickets" && <section className="content links-section" role="tabpanel"><div className="section-heading"><div><p className="mini-label">QUICK ACCESS</p><h2>景点门票</h2></div><p>点击后直接打开对应的 Google Drive 文件；两个尚未确认的项目暂时标记为 TBD。</p></div><QuickLinkList items={ticketItems} /></section>}
      {activeTab === "transit" && <section className="content links-section" role="tabpanel"><div className="section-heading"><div><p className="mini-label">ON THE MOVE</p><h2>城际交通</h2></div><p>点击即可打开对应的航班或铁路电子文件。</p></div><QuickLinkList items={transitItems} /></section>}
      {activeTab === "documents" && <section className="content links-section" role="tabpanel"><div className="section-heading"><div><p className="mini-label">ESSENTIAL DOCS</p><h2>重要文件</h2></div><p>旅行途中需要快速查阅的保险及其他重要材料。</p></div><QuickLinkList items={documentItems} /></section>}

      <footer><span>Buen viaje</span><p>Made for a slow journey across Spain · 2026</p></footer>
    </main>
  );
}
