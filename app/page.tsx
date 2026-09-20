"use client";

import { marked } from "marked";
import { useEffect, useState } from "react";
import { extractSection } from "../lib/itinerary-sections.mjs";
import itineraryMarkdown from "../content/itinerary.md?raw";

type Tab = "summary" | "guide" | "tickets" | "transit" | "documents";
type Tone = "coral" | "green" | "sand" | "blue" | "gold";

function section(start: string, end?: string) {
  return extractSection(itineraryMarkdown, start, end);
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
  { id: "0929", date: "09.29", city: "巴塞罗那", title: "高迪的城市花园", detail: "Park Güell · Gràcia · Bunkers", tone: "green", markdown: section("# 9/29｜Park Güell", "# 9/30｜Montserrat") },
  { id: "0930", date: "09.30", city: "蒙塞拉特", title: "山间一日", detail: "修道院 · 圣像 · 山景 · 轻徒步", tone: "sand", markdown: section("# 9/30｜Montserrat 一日游", "# 10/1｜Sagrada Família") },
  { id: "1001", date: "10.01", city: "巴塞罗那", title: "高迪巅峰", detail: "Sagrada Família · Sant Pau · Tibidabo", tone: "blue", markdown: section("# 10/1｜Sagrada Família", "# 10/2｜Barcelona → Sevilla") },
  {
    id: "1002", date: "10.02", city: "巴塞罗那 → 塞维利亚", title: "南下安达卢西亚", detail: "FR1165 · 入住 · Bienal Flamenco", tone: "coral",
    markdown: [
      section("# 10/2｜Barcelona → Sevilla", "# 🍴 餐厅池｜不用每天重新搜索"),
      section("# 10/2｜抵达 Sevilla + Bienal Flamenco", "# 10/3｜Cathedral"),
    ].join("\n\n---\n\n"),
  },
  { id: "1003", date: "10.03", city: "塞维利亚", title: "大教堂与河岸", detail: "Cathedral · Santa Cruz · Triana", tone: "gold", markdown: section("# 10/3｜Cathedral", "# 10/4｜Córdoba") },
  { id: "1004", date: "10.04", city: "科尔多瓦", title: "白色古城一日", detail: "Mezquita · Judería · Roman Bridge", tone: "sand", markdown: section("# 10/4｜Córdoba 一日游", "# 10/5｜Plaza de España") },
  { id: "1005", date: "10.05", city: "塞维利亚", title: "广场、公园与王宫", detail: "Plaza de España · Real Alcázar · Las Setas", tone: "green", markdown: section("# 10/5｜Plaza de España", "# 10/6｜Sevilla → Madrid") },
  {
    id: "1006", date: "10.06", city: "塞维利亚 → 马德里", title: "抵达首都", detail: "OUIGO · 老 Madrid · Debod · Gran Vía", tone: "blue",
    markdown: [
      section("# 10/6｜Sevilla → Madrid", "# 🍴 餐厅池｜不用每天重新搜索"),
      section("# 10/6｜抵达 Madrid", "# 10/7｜Royal Madrid"),
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
  { label: "0930 蒙塞拉特", url: "https://drive.google.com/file/d/1DvGcWF3irX6jfdkiiAfgoDL72GkWg1d1/view?usp=drive_link" },
  { label: "1001 圣家堂", url: "https://drive.google.com/file/d/10YH6D77-85DPSdvKnENjvTXiNY-9NCTv/view?usp=sharing" },
  { label: "1002 晚间表演", url: "https://drive.google.com/file/d/1AGo-MESzIqx--Sdo8e0HaQOiSs8s7uxE/view?usp=sharing" },
  { label: "1003 塞维利亚主教座堂", url: "https://drive.google.com/file/d/1IU_tOV2Es4oV5vBCEmmSyoRWXzJKUqHX/view?usp=sharing" },
  { label: "1004 科尔多瓦清真寺", url: "https://drive.google.com/file/d/1Un1jBEMfBDCMvYqtsz_kuGl0n1rvEHh6/view?usp=drive_link" },
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

const packingGroups = [
  {
    title: "出发前确认",
    items: [
      ["confirm-ryanair-bag", "Ryanair 随身只带 1 件包，外部尺寸不超过 40 × 30 × 20cm"],
      ["confirm-ryanair-weight", "Barcelona → Sevilla 前将 25 寸托运行李控制在 19–19.5kg"],
      ["confirm-airchina", "确认国航订单显示 1 件 23kg 托运行李，并在柜台确认行李直挂"],
      ["confirm-ouigo", "确认 OUIGO 车票标有 Equipaje adicional / XL 或已包含大件行李"],
      ["confirm-powerbank", "确认充电宝有清晰 3C / CCC、容量标识，且不属于召回批次"],
      ["confirm-offline", "全部机票、火车票、门票、酒店订单与保单已离线保存"],
      ["confirm-maps", "离线地图已下载，酒店、车站、机场航站楼和景点入口已收藏"],
    ],
  },
  {
    title: "证件与资金",
    items: [
      ["doc-passport", "护照原件"],
      ["doc-visa", "申根签证及护照资料页复印件"],
      ["doc-insurance", "旅行保险保单与紧急联系电话"],
      ["doc-tickets", "机票、火车票和景点电子票"],
      ["doc-hotels", "酒店订单、地址与入住说明"],
      ["money-main-card", "主要银行卡"],
      ["money-backup-card", "备用银行卡，与主卡分开放"],
      ["money-cash", "少量欧元现金和小面额纸币"],
    ],
  },
  {
    title: "随身数码设备",
    items: [
      ["tech-phone", "手机与手机壳"],
      ["tech-ipad", "iPad 与保护套"],
      ["tech-switch", "Switch、保护盒及游戏卡 / 离线游戏"],
      ["tech-earbuds", "耳机与充电盒"],
      ["tech-powerbank", "充电宝（随身，不托运、不放头顶行李架）"],
      ["tech-charger", "65W 以上多口氮化镓充电器"],
      ["tech-adapters", "欧标转换插头 2 个"],
      ["tech-cables", "USB-C 等所需充电线 2–3 根"],
      ["tech-tracker", "AirTag 或其他行李追踪器"],
      ["tech-organizer", "数码配件收纳包"],
    ],
  },
  {
    title: "相机装备",
    items: [
      ["camera-body", "相机机身"],
      ["camera-lens", "镜头、前盖与遮光罩"],
      ["camera-strap", "相机背带或腕带"],
      ["camera-batteries", "相机电池 2–3 块，备用电池分别绝缘保护"],
      ["camera-charger", "相机电池充电器"],
      ["camera-cards", "SD 卡 2–3 张，备用卡分开放"],
      ["camera-clean", "镜头布、小气吹或清洁笔"],
      ["camera-rain", "相机防雨罩或大号密封袋"],
      ["camera-insert", "相机内胆，放入唯一的随身双肩包"],
      ["camera-reader", "iPad 读卡器或相机数据线"],
      ["camera-backup", "小型 SSD 或足够的 iPad 存储空间（可选）"],
    ],
  },
  {
    title: "衣物",
    items: [
      ["clothes-tees", "短袖 4–5 件"],
      ["clothes-longs", "长袖 1–2 件"],
      ["clothes-layer", "薄针织衫或卫衣 1 件"],
      ["clothes-jacket", "轻便防风外套 1 件，Montserrat 使用"],
      ["clothes-pants", "长裤 2–3 条"],
      ["clothes-underwear", "内衣 7–8 套"],
      ["clothes-socks", "袜子 7–8 双"],
      ["clothes-sleep", "睡衣 1 套"],
      ["clothes-shoes", "主力步行鞋 1 双"],
      ["clothes-spare-shoes", "轻便备用鞋 1 双"],
      ["clothes-weather", "帽子、墨镜、折叠伞或轻量雨衣"],
      ["clothes-laundry", "脏衣袋与小包装洗衣液"],
    ],
  },
  {
    title: "洗护、药品与日用品",
    items: [
      ["care-tooth", "牙刷、牙膏与基础洗护"],
      ["care-skin", "护肤品、防晒霜与润唇膏"],
      ["care-glasses", "眼镜 / 隐形眼镜及护理液"],
      ["care-tissues", "纸巾、湿巾与免洗洗手液"],
      ["care-bags", "密封袋、折叠购物袋与可折叠水瓶"],
      ["med-personal", "个人处方药及原包装"],
      ["med-basic", "止痛退烧药、肠胃药、止泻药与抗过敏药"],
      ["med-motion", "晕车药（如需要）"],
      ["med-firstaid", "创可贴、水泡贴与碘伏棉签"],
      ["med-electrolyte", "电解质冲剂（可选）"],
    ],
  },
  {
    title: "装箱与出门前",
    items: [
      ["pack-carry", "相机、镜头、iPad、Switch、充电宝、电池、证件和药物全部放随身包"],
      ["pack-checked", "衣物、洗护、备用鞋和折叠相机包放托运行李"],
      ["pack-camera-bag", "相机包不作为 Ryanair 第二件随身行李出现"],
      ["pack-liquids", "随身液体单瓶不超过 100ml，并放入透明袋"],
      ["pack-weigh", "使用行李秤称重并给秤误差留余量"],
      ["pack-charge", "出发前一晚给手机、相机电池、iPad、Switch和耳机充满电"],
      ["pack-storage", "清理手机、相机卡和 iPad 存储空间"],
      ["pack-home", "关闭不必要电器，检查门窗、垃圾与冰箱"],
    ],
  },
] as const;

const packingTotal = packingGroups.reduce((total, group) => total + group.items.length, 0);

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "summary", label: "总行程", icon: "路线" },
  { id: "guide", label: "完整攻略", icon: "原文" },
  { id: "tickets", label: "景点门票", icon: "门票" },
  { id: "transit", label: "城际交通", icon: "交通" },
  { id: "documents", label: "行前清单", icon: "准备" },
];

const outline = [
  {
    label: "全程总控",
    links: [
      ["overview", "行程审计", "# 0｜总行程审计结论"],
      ["transport", "全程交通", "# 1｜全程交通 Master Table"],
      ["hotels", "住宿", "# 2｜住宿 Master Table"],
      ["bookings", "核心预约", "# 3｜全程核心预约 Master Table"],
      ["luggage", "主行李方案", "# 4｜主行李方案"],
      ["moving-days", "移动日建议", "# 5｜移动日建议"],
      ["beijing-transfer", "北京中转", "# 6｜北京中转专项"],
      ["checklist", "出发 Checklist", "# 8｜全程出发前总 Checklist"],
    ],
  },
  {
    label: "Barcelona",
    links: [
      ["barcelona", "城市总览", "# PART A｜Barcelona 详细攻略"],
      ["day-0927", "9/27 抵达日", "# 9/27｜抵达日"],
      ["day-0928", "9/28 高迪住宅", "# 9/28｜高迪住宅日"],
      ["day-0929", "9/29 Park Güell", "# 9/29｜Park Güell"],
      ["day-0930", "9/30 Montserrat", "# 9/30｜Montserrat"],
      ["day-1001", "10/1 圣家堂", "# 10/1｜Sagrada Família"],
      ["day-1002-bcn", "10/2 前往 Sevilla", "# 10/2｜Barcelona → Sevilla"],
    ],
  },
  {
    label: "Sevilla / Córdoba",
    links: [
      ["sevilla", "城市总览", "# PART B｜Sevilla / Córdoba 详细攻略"],
      ["day-1002-svq", "10/2 抵达与 Bienal", "# 10/2｜抵达 Sevilla"],
      ["day-1003", "10/3 大教堂", "# 10/3｜Cathedral"],
      ["day-1004", "10/4 Córdoba", "# 10/4｜Córdoba 一日游"],
      ["day-1005", "10/5 王宫", "# 10/5｜Plaza de España"],
      ["day-1006-svq", "10/6 前往 Madrid", "# 10/6｜Sevilla → Madrid"],
    ],
  },
  {
    label: "Madrid",
    links: [
      ["madrid", "城市总览", "# PART C｜Madrid 详细攻略"],
      ["day-1006-mad", "10/6 老城", "# 10/6｜抵达 Madrid"],
      ["day-1007", "10/7 Royal Madrid", "# 10/7｜Royal Madrid"],
      ["day-1008", "10/8 艺术日", "# 10/8｜Prado"],
      ["day-1008-night", "10/8 最后几小时", "# 10/8 晚上｜"],
    ],
  },
] as const;

const anchorByHeading = new Map(outline.flatMap((group) => group.links.map(([id, , heading]) => [heading, id])));
const navigableMarkdown = itineraryMarkdown
  .split("\n")
  .flatMap((line) => {
    const match = [...anchorByHeading.entries()].find(([heading]) => line.startsWith(heading));
    return match ? [`<span id="${match[1]}"></span>`, line] : [line];
  })
  .join("\n");

const itineraryHtml = renderMarkdown(navigableMarkdown);

function QuickLinkList({ items }: { items: Array<{ label: string; url?: string }> }) {
  return (
    <div className="private-list">
      {items.map((item) => item.url ? (
        <a className="private-row link-row" key={item.label} href={item.url} target="_blank" rel="noreferrer">
          <span className="private-name"><span className="status-dot ready" aria-hidden="true" /><span>{item.label}</span></span>
          <span className="row-link-label">打开文件 ↗</span>
        </a>
      ) : (
        <div className="private-row" key={item.label}>
          <span className="private-name"><span className="status-dot" aria-hidden="true" /><span>{item.label}</span></span>
          <span className="tbd-label">TBD</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [checkedPacking, setCheckedPacking] = useState<Record<string, boolean>>({});
  const currentDay = days.find((day) => day.id === selectedDay);
  const packingDone = Object.values(checkedPacking).filter(Boolean).length;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem("spain-2026-packing");
        if (saved) setCheckedPacking(JSON.parse(saved));
      } catch {
        // A blocked storage setting should not prevent the checklist from working.
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function togglePacking(id: string) {
    setCheckedPacking((current) => {
      const next = { ...current, [id]: !current[id] };
      try { window.localStorage.setItem("spain-2026-packing", JSON.stringify(next)); } catch {
        // Keep the in-memory checklist usable when storage is unavailable.
      }
      return next;
    });
  }

  function resetPacking() {
    setCheckedPacking({});
    try { window.localStorage.removeItem("spain-2026-packing"); } catch {
      // The visible checklist has already been reset.
    }
  }

  function showDay(id: string | null) {
    setSelectedDay(id);
    requestAnimationFrame(() => document.querySelector(".tab-wrap")?.scrollIntoView({ behavior: "smooth" }));
  }

  return (
    <main>
      <header className="hero">
        <nav className="topbar" aria-label="主导航">
          <a className="brand" href="#top" aria-label="西班牙行程首页"><span className="brand-mark">ES</span><span>España 2026</span></a>
          <div className="privacy-button"><span className="lock" aria-hidden="true">●</span>快速链接 <b>17</b></div>
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
          <details className="guide-outline-mobile">
            <summary>打开攻略目录</summary>
            <nav aria-label="移动端攻略目录">
              {outline.map((group) => <div key={group.label}><strong>{group.label}</strong>{group.links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>)}
            </nav>
          </details>
          <div className="guide-layout">
            <aside className="guide-outline">
              <p>文档大纲</p>
              <nav aria-label="完整攻略大纲">
                {outline.map((group) => (
                  <div className="outline-group" key={group.label}>
                    <strong>{group.label}</strong>
                    {group.links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
                  </div>
                ))}
              </nav>
            </aside>
            <article className="markdown-content guide-document" dangerouslySetInnerHTML={{ __html: itineraryHtml }} />
          </div>
          <a className="back-to-top" href="#top">回到顶部 ↑</a>
        </section>
      )}

      {activeTab === "tickets" && <section className="content links-section" role="tabpanel"><div className="section-heading"><div><p className="mini-label">QUICK ACCESS</p><h2>景点门票</h2></div><p>点击后直接打开对应的 Google Drive 文件。</p></div><QuickLinkList items={ticketItems} /></section>}
      {activeTab === "transit" && <section className="content links-section" role="tabpanel"><div className="section-heading"><div><p className="mini-label">ON THE MOVE</p><h2>城际交通</h2></div><p>点击即可打开对应的航班或铁路电子文件。</p></div><QuickLinkList items={transitItems} /></section>}
      {activeTab === "documents" && (
        <section className="content packing-section" role="tabpanel">
          <div className="section-heading">
            <div><p className="mini-label">PACK & GO</p><h2>行前清单</h2></div>
            <p>按当前设备和行李额度整理。勾选状态会保存在这台设备上；换手机或清除浏览器数据后会重新开始。</p>
          </div>

          <div className="baggage-summary" aria-label="行李额度摘要">
            <article><span>随身</span><strong>1 件 · 40 × 30 × 20cm</strong><p>相机、iPad、Switch、电池与证件全部装进同一个座椅下双肩包。</p></article>
            <article><span>Ryanair 托运</span><strong>1 件 · 20kg</strong><p>25 寸箱符合尺寸；Barcelona 出发前建议控制在 19–19.5kg。</p></article>
            <article><span>火车 / 回国</span><strong>OUIGO 25kg · 国航 23kg</strong><p>OUIGO 已升级大件行李；Madrid 回国前建议不超过 22.5kg。</p></article>
          </div>

          <div className="packing-documents">
            <div><p className="mini-label">ESSENTIAL DOCS</p><h3>重要文件</h3></div>
            <QuickLinkList items={documentItems} />
          </div>

          <div className="packing-progress" aria-live="polite">
            <div><strong>{packingDone} / {packingTotal}</strong><span>已完成</span></div>
            <div className="progress-track" aria-hidden="true"><i style={{ width: `${(packingDone / packingTotal) * 100}%` }} /></div>
            <button type="button" onClick={resetPacking} disabled={packingDone === 0}>清空勾选</button>
          </div>

          <div className="packing-groups">
            {packingGroups.map((group) => (
              <section className="packing-group" key={group.title}>
                <h3>{group.title}</h3>
                <div>
                  {group.items.map(([id, label]) => (
                    <label className={checkedPacking[id] ? "checked" : ""} key={id}>
                      <input type="checkbox" checked={Boolean(checkedPacking[id])} onChange={() => togglePacking(id)} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      )}

      <footer><span>Buen viaje</span><p>Made for a slow journey across Spain · 2026</p></footer>
    </main>
  );
}
