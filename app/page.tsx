"use client";

import { useState } from "react";

type Tab = "itinerary" | "tickets" | "transit";
const itinerary = [
  { date: "09.28", city: "巴塞罗那", title: "现代主义建筑日", detail: "巴特罗之家 · 米拉之家", tone: "coral" },
  { date: "09.29", city: "巴塞罗那", title: "高迪的城市花园", detail: "奎尔公园", tone: "green" },
  { date: "09.30", city: "蒙塞拉特", title: "山间一日", detail: "具体安排待确认", tone: "sand" },
  { date: "10.01", city: "巴塞罗那", title: "圣家堂", detail: "高迪建筑之旅", tone: "blue" },
  { date: "10.02", city: "巴塞罗那 → 塞维利亚", title: "南下安达卢西亚", detail: "航班 · 晚间表演", tone: "coral" },
  { date: "10.03", city: "塞维利亚", title: "老城与主教座堂", detail: "塞维利亚主教座堂", tone: "gold" },
  { date: "10.04", city: "科尔多瓦", title: "白色古城一日", detail: "科尔多瓦清真寺", tone: "sand" },
  { date: "10.05", city: "塞维利亚", title: "王宫漫步", detail: "塞维利亚王宫", tone: "green" },
  { date: "10.06", city: "塞维利亚 → 马德里", title: "前往首都", detail: "城际交通", tone: "blue" },
  { date: "10.07", city: "马德里", title: "王室建筑日", detail: "马德里皇宫", tone: "coral" },
  { date: "10.08", city: "马德里", title: "艺术金三角", detail: "普拉多博物馆 · 索菲亚王后艺术中心", tone: "gold" },
];

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

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "itinerary", label: "总行程", icon: "路线" },
  { id: "tickets", label: "景点门票", icon: "门票" },
  { id: "transit", label: "城际交通", icon: "交通" },
];

function QuickLinkList({ items }: { items: Array<{ label: string; url?: string }> }) {
  return (
    <div className="private-list">
      {items.map((item) => {
        const hasLink = Boolean(item.url);
        return (
          <div className="private-row" key={item.label}>
            <div className="private-name">
              <span className={`status-dot ${hasLink ? "ready" : ""}`} aria-hidden="true" />
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
        );
      })}
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
            快速链接 <b>14</b>
          </div>
        </nav>

        <div className="hero-copy" id="top">
          <p className="eyebrow">2026 · 国庆旅行手册</p>
          <h1>从地中海，<br />一路走到马德里。</h1>
          <p className="hero-subtitle">巴塞罗那 · 蒙塞拉特 · 塞维利亚 · 科尔多瓦 · 马德里</p>
          <div className="route-line" aria-label="旅行路线">
            <span>BCN</span><i /><span>SVQ</span><i /><span>MAD</span>
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
        <section className="content itinerary-section" role="tabpanel">
          <div className="section-heading">
            <div>
              <p className="mini-label">THE JOURNEY</p>
              <h2>每日行程</h2>
            </div>
            <p>目前按 Notion 中已经确认的门票与交通节点整理；完整攻略正文导入后会补齐餐饮、住宿与细节。</p>
          </div>
          <div className="timeline">
            {itinerary.map((day, index) => (
              <article className="day-card" key={day.date}>
                <div className={`date-block ${day.tone}`}>
                  <span>DAY {String(index + 1).padStart(2, "0")}</span>
                  <strong>{day.date}</strong>
                </div>
                <div className="day-copy">
                  <p>{day.city}</p>
                  <h3>{day.title}</h3>
                  <span>{day.detail}</span>
                </div>
                <div className="card-arrow" aria-hidden="true">↗</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "tickets" && (
        <section className="content links-section" role="tabpanel">
          <div className="section-heading">
            <div><p className="mini-label">PRIVATE VAULT</p><h2>景点门票</h2></div>
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

      <footer>
        <span>Buen viaje</span>
        <p>Made for a slow journey across Spain · 2026</p>
      </footer>
    </main>
  );
}
