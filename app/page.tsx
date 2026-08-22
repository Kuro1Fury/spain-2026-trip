"use client";

import { useEffect, useMemo, useState } from "react";

type Tab = "itinerary" | "tickets" | "transit";
type PrivateLinks = Record<string, string>;

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
  "0928 巴特罗之家",
  "0928 米拉之家",
  "0929 奎尔公园",
  "0930 蒙塞拉特",
  "1001 圣家堂",
  "1002 晚间表演",
  "1003 塞维利亚主教座堂",
  "1004 科尔多瓦清真寺",
  "1005 塞维利亚王宫",
  "1007 马德里皇宫",
  "1008 普拉多博物馆",
  "1008 索菲亚王后艺术中心",
];

const transitItems = [
  "巴塞罗那 → 塞维利亚航班",
  "科尔多瓦电子车票",
  "塞维利亚 → 马德里车票",
  "往返国际航班",
];

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "itinerary", label: "总行程", icon: "路线" },
  { id: "tickets", label: "景点门票", icon: "门票" },
  { id: "transit", label: "城际交通", icon: "交通" },
];

function isSafeUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function PrivateLinkList({ items, links, onChange }: { items: string[]; links: PrivateLinks; onChange: (next: PrivateLinks) => void }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  function save(item: string) {
    const value = draft.trim();
    if (value && !isSafeUrl(value)) return;
    const next = { ...links };
    if (value) next[item] = value;
    else delete next[item];
    onChange(next);
    setEditing(null);
    setDraft("");
  }

  return (
    <div className="private-list">
      {items.map((item) => {
        const hasLink = Boolean(links[item]);
        return (
          <div className="private-row" key={item}>
            <div className="private-name">
              <span className={`status-dot ${hasLink ? "ready" : ""}`} aria-hidden="true" />
              <span>{item}</span>
            </div>
            {editing === item ? (
              <div className="link-editor">
                <input
                  autoFocus
                  aria-label={`${item}的私人链接`}
                  placeholder="粘贴 https:// 私人链接"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && save(item)}
                />
                <button onClick={() => save(item)}>保存</button>
                <button className="ghost" onClick={() => setEditing(null)}>取消</button>
              </div>
            ) : (
              <div className="row-actions">
                {hasLink && <a href={links[item]} target="_blank" rel="noreferrer">打开</a>}
                <button
                  className="quiet-button"
                  onClick={() => {
                    setEditing(item);
                    setDraft(links[item] ?? "");
                  }}
                >
                  {hasLink ? "编辑" : "添加链接"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("itinerary");
  const [links, setLinks] = useState<PrivateLinks>({});
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const configuredCount = useMemo(() => Object.values(links).filter(Boolean).length, [links]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("spain-2026-private-links");
      if (saved) setLinks(JSON.parse(saved));
    } catch {
      // Corrupt or unavailable local storage should never block the itinerary.
    }
  }, []);

  function updateLinks(next: PrivateLinks) {
    setLinks(next);
    window.localStorage.setItem("spain-2026-private-links", JSON.stringify(next));
  }

  return (
    <main>
      <header className="hero">
        <nav className="topbar" aria-label="主导航">
          <a className="brand" href="#top" aria-label="西班牙行程首页">
            <span className="brand-mark">ES</span>
            <span>España 2026</span>
          </a>
          <button className="privacy-button" onClick={() => setPrivacyOpen(!privacyOpen)} aria-expanded={privacyOpen}>
            <span className="lock" aria-hidden="true">●</span>
            私人链接 {configuredCount > 0 && <b>{configuredCount}</b>}
          </button>
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

      {privacyOpen && (
        <section className="privacy-panel" aria-label="隐私说明">
          <div>
            <p className="mini-label">PRIVACY FIRST</p>
            <h2>票据链接只留在你的设备上</h2>
            <p>私人 Drive 链接不会写入这个公开网站或 GitHub 仓库。点击“添加链接”后，地址只保存在当前浏览器的本地存储里；更换设备时需要重新添加。</p>
          </div>
          <button className="clear-button" onClick={() => updateLinks({})} disabled={configuredCount === 0}>清除本机全部链接</button>
        </section>
      )}

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
            <p>项目名称可以公开，实际票据地址仅保存在本机。TBD 项目也可以先留空。</p>
          </div>
          <PrivateLinkList items={ticketItems} links={links} onChange={updateLinks} />
        </section>
      )}

      {activeTab === "transit" && (
        <section className="content links-section" role="tabpanel">
          <div className="section-heading">
            <div><p className="mini-label">ON THE MOVE</p><h2>城际交通</h2></div>
            <p>航班号、乘客姓名、订单号与二维码均不会出现在公开页面。</p>
          </div>
          <PrivateLinkList items={transitItems} links={links} onChange={updateLinks} />
        </section>
      )}

      <footer>
        <span>Buen viaje</span>
        <p>Made for a slow journey across Spain · 2026</p>
      </footer>
    </main>
  );
}
