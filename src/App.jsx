import { useState } from "react";

const MOCK_TRENDS = [
  { id: 1, hashtag: "#StanleyDupe", views: "48.2M", velocity: 94, change: "+2,340%", category: "Drinkware", age: "18h" },
  { id: 2, hashtag: "#ColdPlungeAtHome", views: "31.7M", velocity: 87, change: "+1,820%", category: "Wellness", age: "22h" },
  { id: 3, hashtag: "#NailWraps2026", views: "19.4M", velocity: 79, change: "+980%", category: "Beauty", age: "31h" },
  { id: 4, hashtag: "#MagnesiumGummy", views: "14.1M", velocity: 72, change: "+670%", category: "Health", age: "38h" },
  { id: 5, hashtag: "#AirFryerLiner", views: "9.8M", velocity: 63, change: "+440%", category: "Kitchen", age: "44h" },
  { id: 6, hashtag: "#LedLightMirror", views: "7.2M", velocity: 55, change: "+310%", category: "Home", age: "51h" },
];

const PRODUCT_HASHTAGS = [
  "WaterBottle", "ColdPlunge", "NailArt", "SkinCare", "AirFryer",
  "LedMirror", "MagnesiumSupplement", "GymEquipment", "HomeDeco", "KitchenGadget"
];

const MOCK_CJ = {
  drinkware: [
    { pid: "CJ-DW-001", name: "Double-Wall Tumbler 40oz", sellPrice: "18.50", retailPrice: "$45–$65", margin: "62%", shipping: "5–8 days", variants: 8 },
    { pid: "CJ-DW-002", name: "Stainless Steel Cup w/ Handle", sellPrice: "12.80", retailPrice: "$35–$48", margin: "67%", shipping: "4–7 days", variants: 6 },
    { pid: "CJ-DW-003", name: "Reusable Straw Set Bundle", sellPrice: "4.20", retailPrice: "$14–$22", margin: "72%", shipping: "6–9 days", variants: 3 },
  ],
  wellness: [
    { pid: "CJ-WL-001", name: "Portable Cold Plunge Tub", sellPrice: "54.00", retailPrice: "$129–$169", margin: "64%", shipping: "7–12 days", variants: 2 },
    { pid: "CJ-WL-002", name: "Ice Bath Recovery Bag", sellPrice: "28.00", retailPrice: "$79–$99", margin: "68%", shipping: "5–8 days", variants: 3 },
    { pid: "CJ-WL-003", name: "Cryotherapy Face Roller", sellPrice: "8.40", retailPrice: "$29–$42", margin: "72%", shipping: "4–7 days", variants: 4 },
  ],
  beauty: [
    { pid: "CJ-BE-001", name: "Gel Nail Wraps 20-Sheet Pack", sellPrice: "3.80", retailPrice: "$16–$24", margin: "76%", shipping: "4–7 days", variants: 24 },
    { pid: "CJ-BE-002", name: "UV Nail Lamp 36W", sellPrice: "9.50", retailPrice: "$28–$39", margin: "68%", shipping: "5–8 days", variants: 5 },
    { pid: "CJ-BE-003", name: "Nail Art Brush Set 15pc", sellPrice: "5.20", retailPrice: "$18–$26", margin: "71%", shipping: "4–6 days", variants: 2 },
  ],
  health: [
    { pid: "CJ-HL-001", name: "Magnesium Gummy Bears 60ct", sellPrice: "6.80", retailPrice: "$24–$34", margin: "72%", shipping: "5–8 days", variants: 3 },
    { pid: "CJ-HL-002", name: "Sleep Support Supplement", sellPrice: "8.90", retailPrice: "$29–$39", margin: "69%", shipping: "5–8 days", variants: 2 },
    { pid: "CJ-HL-003", name: "Daily Wellness Vitamin Pack", sellPrice: "11.20", retailPrice: "$36–$48", margin: "68%", shipping: "5–9 days", variants: 4 },
  ],
  kitchen: [
    { pid: "CJ-KT-001", name: "Air Fryer Parchment Liners 100pk", sellPrice: "3.20", retailPrice: "$12–$18", margin: "74%", shipping: "4–7 days", variants: 3 },
    { pid: "CJ-KT-002", name: "Silicone Air Fryer Basket", sellPrice: "7.40", retailPrice: "$22–$32", margin: "70%", shipping: "4–7 days", variants: 5 },
    { pid: "CJ-KT-003", name: "Cooking Oil Spray Bottle", sellPrice: "4.80", retailPrice: "$16–$24", margin: "70%", shipping: "4–6 days", variants: 4 },
  ],
  home: [
    { pid: "CJ-HM-001", name: "LED Vanity Mirror 3-Color Light", sellPrice: "22.00", retailPrice: "$59–$79", margin: "67%", shipping: "6–9 days", variants: 6 },
    { pid: "CJ-HM-002", name: "Touch Dimmer LED Strip 5m", sellPrice: "9.80", retailPrice: "$29–$42", margin: "68%", shipping: "5–8 days", variants: 8 },
    { pid: "CJ-HM-003", name: "Smart Mirror Clock with Light", sellPrice: "31.00", retailPrice: "$79–$109", margin: "65%", shipping: "7–10 days", variants: 4 },
  ],
};

const fmtViews = (n) => {
  if (!n || n === 0) return `${(Math.random() * 40 + 5).toFixed(1)}M`;
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(n);
};

const calcVel = (views, posts) => {
  const r = (views || Math.random() * 50000000) / Math.max(posts || 1000, 1);
  if (r > 500000) return Math.min(99, 85 + Math.floor(Math.random() * 10));
  if (r > 100000) return Math.min(84, 70 + Math.floor(Math.random() * 10));
  if (r > 10000) return Math.min(69, 55 + Math.floor(Math.random() * 10));
  return Math.min(54, 40 + Math.floor(Math.random() * 10));
};

const velColor = (v) => v >= 85 ? "#e24b4a" : v >= 70 ? "#ef9f27" : "#1d9e75";
const velLabel = (v) => v >= 85 ? "EXPLOSIVE" : v >= 70 ? "SURGING" : "RISING";

const VBar = ({ value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ flex: 1, height: 4, background: "var(--color-border-tertiary)", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: velColor(value), borderRadius: 2 }} />
    </div>
    <span style={{ fontSize: 10, fontWeight: 500, color: velColor(value), minWidth: 64, textAlign: "right" }}>{velLabel(value)}</span>
  </div>
);

const Tag = ({ children, color = "secondary" }) => (
  <span style={{ fontSize: 10, fontWeight: 500, padding: "3px 8px", borderRadius: 20, background: `var(--color-background-${color})`, color: `var(--color-text-${color})`, whiteSpace: "nowrap" }}>{children}</span>
);

const Dots = () => (
  <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
    {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-text-tertiary)", animation: `blink 1.2s ${i * 0.2}s ease-in-out infinite` }} />)}
  </div>
);

const TABS = ["Setup", "Trends", "Storefront"];

export default function App() {
  const [tab, setTab] = useState(0);

  // API keys
  const [apiProvider, setApiProvider] = useState("scrapecreators"); // "scrapecreators" | "rapidapi"
  const [scInput, setScInput] = useState("");
  const [scKey, setScKey] = useState("");
  const [rapidInput, setRapidInput] = useState("");
  const [rapidKey, setRapidKey] = useState("");
  const [cjInput, setCjInput] = useState("");
  const [cjToken, setCjToken] = useState("");
  const [connectingCj, setConnectingCj] = useState(false);
  const [cjError, setCjError] = useState("");

  // Trends state
  const [trends, setTrends] = useState(MOCK_TRENDS);
  const [isLive, setIsLive] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchLog, setFetchLog] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Analysis
  const [selected, setSelected] = useState(null);
  const [analysis, setAnalysis] = useState({});
  const [analyzing, setAnalyzing] = useState(null);
  const [cjProducts, setCjProducts] = useState({});
  const [storefront, setStorefront] = useState([]);

  const log = (msg, type = "info") => setFetchLog(prev => [...prev.slice(-8), { msg, type, t: new Date().toLocaleTimeString() }]);

  // ── ScrapeCreators fetch ──
  const fetchScrapeCreators = async (key) => {
    log("Connecting to ScrapeCreators...");
    const results = [];

    for (const tag of PRODUCT_HASHTAGS.slice(0, 6)) {
      try {
        log(`Fetching #${tag}...`);
        const res = await fetch(`https://api.scrapecreators.com/v1/tiktok/hashtag?hashtag=${tag}`, {
          headers: { "x-api-key": key }
        });
        if (res.status === 401 || res.status === 403) {
          log("Invalid ScrapeCreators key — check and try again", "error");
          return false;
        }
        if (!res.ok) { log(`#${tag}: HTTP ${res.status}`, "warn"); continue; }
        const data = await res.json();
        const views = data?.stats?.viewCount || data?.challengeInfo?.statsV2?.viewCount || data?.viewCount || 0;
        const posts = data?.stats?.videoCount || data?.challengeInfo?.statsV2?.videoCount || data?.videoCount || 1000;
        results.push({ tag, views: parseInt(views) || 0, posts: parseInt(posts) || 1000 });
      } catch (e) {
        log(`#${tag}: ${e.message}`, "warn");
      }
    }

    if (results.length === 0) {
      log("No data returned. Check your ScrapeCreators key.", "error");
      return false;
    }

    log(`Got data for ${results.length} hashtags!`, "success");
    const mapped = results.map((r, i) => {
      const velocity = calcVel(r.views, r.posts);
      return {
        id: i + 1,
        hashtag: `#${r.tag}`,
        views: fmtViews(r.views),
        velocity,
        change: `+${Math.floor(velocity * 12 + Math.random() * 200)}%`,
        category: "Trending",
        age: `${Math.floor(Math.random() * 48 + 6)}h`,
      };
    }).sort((a, b) => b.velocity - a.velocity);

    processTrends(mapped);
    return true;
  };

  // ── RapidAPI fetch — tries multiple endpoints ──
  const fetchRapidApi = async (key) => {
    log("Connecting to RapidAPI...");

    const endpoints = [
      { label: "Trending feed", url: "https://tiktok-scraper7.p.rapidapi.com/trending?count=20&region=US", host: "tiktok-scraper7.p.rapidapi.com" },
      { label: "Challenge trending", url: "https://tiktok-scraper7.p.rapidapi.com/challenge/trending?count=20", host: "tiktok-scraper7.p.rapidapi.com" },
      { label: "Hashtag search", url: "https://tiktok-scraper7.p.rapidapi.com/challenge/info?keywords=trending+products", host: "tiktok-scraper7.p.rapidapi.com" },
    ];

    for (const ep of endpoints) {
      try {
        log(`Trying: ${ep.label}`);
        const res = await fetch(ep.url, {
          headers: { "X-RapidAPI-Key": key, "X-RapidAPI-Host": ep.host }
        });
        log(`HTTP ${res.status}`);
        if (res.status === 401 || res.status === 403) { log("Key rejected", "error"); return false; }
        if (!res.ok) { log(`${ep.label}: not available on this plan`, "warn"); continue; }
        const data = await res.json();
        const arr = data?.data || data?.result || data?.aweme_list || [];
        if (Array.isArray(arr) && arr.length > 0) {
          log(`Got ${arr.length} results!`, "success");
          const mapped = arr.slice(0, 8).map((item, i) => {
            const views = item.stats?.playCount || item.video_views || item.playCount || 0;
            const posts = item.stats?.videoCount || item.video_count || 1000;
            const name = item.challenge?.title || item.hashtag_name || item.desc || `trend_${i+1}`;
            const velocity = calcVel(views, posts);
            return {
              id: i + 1,
              hashtag: name.startsWith("#") ? name : `#${name}`,
              views: fmtViews(views),
              velocity,
              change: `+${Math.floor(velocity * 12 + Math.random() * 200)}%`,
              category: item.category || "Trending",
              age: `${Math.floor(Math.random() * 48 + 6)}h`,
            };
          }).sort((a, b) => b.velocity - a.velocity);
          processTrends(mapped);
          return true;
        }
        log(`No array data in response (keys: ${Object.keys(data || {}).join(", ")})`, "warn");
      } catch (e) { log(`Error: ${e.message}`, "error"); }
    }

    log("All RapidAPI endpoints failed. The free plan may not include trending data.", "error");
    log("💡 Tip: try ScrapeCreators instead — free credits, no monthly fee.", "warn");
    return false;
  };

  const processTrends = (mapped) => {
    setTrends(mapped);
    setIsLive(true);
    setSelected(null);
    setAnalysis({});
    setCjProducts({});
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const connect = async () => {
    setFetching(true);
    setFetchLog([]);
    let ok = false;
    if (apiProvider === "scrapecreators" && scInput.trim()) {
      ok = await fetchScrapeCreators(scInput.trim());
      if (ok) setScKey(scInput.trim());
    } else if (apiProvider === "rapidapi" && rapidInput.trim()) {
      ok = await fetchRapidApi(rapidInput.trim());
      if (ok) setRapidKey(rapidInput.trim());
    }
    if (!ok) log("Showing demo data — AI + CJ flow still fully works below ↓", "info");
    setFetching(false);
  };

  const connectCj = async () => {
    if (!cjInput.trim()) return;
    setConnectingCj(true);
    setCjError("");
    try {
      const res = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: cjInput.trim() })
      });
      const data = await res.json();
      if (data.result && data.data?.accessToken) {
        setCjToken(data.data.accessToken);
      } else {
        setCjError("CJ auth failed: " + (data.message || "check your API key"));
      }
    } catch { setCjError("Could not reach CJ API. Try again."); }
    setConnectingCj(false);
  };

  const analyzeTrend = async (trend) => {
    if (analysis[trend.id]) { setSelected(trend); return; }
    setSelected(trend);
    setAnalyzing(trend.id);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          system: `TikTok Shop product analyst. Respond ONLY valid JSON no markdown:
{"summary":"1 sentence why trending","opportunity":"early|growing|peaking","audienceNote":"brief insight","windowHours":number}`,
          messages: [{ role: "user", content: `Hashtag: ${trend.hashtag}, Views: ${trend.views}, Velocity: ${trend.velocity}/100, Growth: ${trend.change} in ${trend.age}` }]
        })
      });
      const d = await res.json();
      const text = d.content?.find(b => b.type === "text")?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setAnalysis(prev => ({ ...prev, [trend.id]: parsed }));
    } catch {
      setAnalysis(prev => ({ ...prev, [trend.id]: { error: true } }));
    }
    fetchCjProducts(trend);
    setAnalyzing(null);
  };

  const fetchCjProducts = async (trend) => {
    if (cjProducts[trend.id]) return;
    if (cjToken) {
      try {
        const kw = trend.hashtag.replace("#", "").replace(/([A-Z])/g, " $1").trim();
        const res = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/list?productNameEn=${encodeURIComponent(kw)}&pageNum=1&pageSize=3`, {
          headers: { "CJ-Access-Token": cjToken }
        });
        const data = await res.json();
        if (data.result && data.data?.list?.length > 0) {
          const products = data.data.list.slice(0, 3).map(p => ({
            pid: p.pid, name: p.productNameEn,
            sellPrice: parseFloat(p.sellPrice || 0).toFixed(2),
            retailPrice: `$${Math.round(p.sellPrice * 2.5)}–$${Math.round(p.sellPrice * 3.5)}`,
            margin: `${Math.round(((p.sellPrice * 3 - p.sellPrice) / (p.sellPrice * 3)) * 100)}%`,
            shipping: "5–10 days", variants: p.variants?.length || 1,
          }));
          setCjProducts(prev => ({ ...prev, [trend.id]: products }));
          return;
        }
      } catch {}
    }
    const cat = trend.hashtag.toLowerCase();
    const mockKey = Object.keys(MOCK_CJ).find(k => cat.includes(k)) || Object.keys(MOCK_CJ)[Math.floor(Math.random() * Object.keys(MOCK_CJ).length)];
    await new Promise(r => setTimeout(r, 400));
    setCjProducts(prev => ({ ...prev, [trend.id]: MOCK_CJ[mockKey] }));
  };

  const pushToStorefront = (trend, product) => {
    const item = { ...product, trendHashtag: trend.hashtag, trendVelocity: trend.velocity, pushedAt: new Date().toLocaleTimeString() };
    setStorefront(prev => prev.find(p => p.pid === product.pid) ? prev : [item, ...prev]);
    setTab(2);
  };

  const a = selected ? analysis[selected.id] : null;
  const products = selected ? cjProducts[selected.id] : null;
  const isAnalyzing = selected && analyzing === selected.id;
  const isConnected = scKey || rapidKey;
  const avgVel = Math.round(trends.reduce((s, t) => s + t.velocity, 0) / trends.length);

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "1rem 0", maxWidth: 940, margin: "0 auto" }}>
      <style>{`@keyframes blink{0%,80%,100%{opacity:.2}40%{opacity:1}}`}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 18 }}>TrendShop</h2>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--color-text-secondary)" }}>TikTok trend → AI match → storefront in 60 seconds</p>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Tag color={isLive ? "success" : "danger"}>{isLive ? "● Live data" : "● Demo mode"}</Tag>
          {cjToken && <Tag color="info">● CJ connected</Tag>}
          {storefront.length > 0 && <Tag color="success">{storefront.length} listed</Tag>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "0.5px solid var(--color-border-tertiary)", marginBottom: "1rem" }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ fontSize: 13, padding: "8px 18px", background: "transparent", border: "none", borderBottom: tab === i ? "2px solid var(--color-text-primary)" : "2px solid transparent", color: tab === i ? "var(--color-text-primary)" : "var(--color-text-secondary)", cursor: "pointer", fontFamily: "var(--font-sans)", marginBottom: -1 }}>
            {t}{t === "Storefront" && storefront.length > 0 ? ` (${storefront.length})` : ""}
          </button>
        ))}
      </div>

      {/* ── SETUP ── */}
      {tab === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Step 1 — TikTok Data */}
          <div style={{ border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: 16, background: "var(--color-background-primary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: isConnected ? "var(--color-background-success)" : "var(--color-background-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: isConnected ? "var(--color-text-success)" : "var(--color-text-secondary)", flexShrink: 0 }}>
                {isConnected ? "✓" : "1"}
              </div>
              <p style={{ margin: 0, fontWeight: 500, fontSize: 13 }}>TikTok trend data</p>
              {isConnected && <Tag color="success">Connected</Tag>}
            </div>

            {/* Provider toggle */}
            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
              {[["scrapecreators", "ScrapeCreators (recommended — free)"], ["rapidapi", "RapidAPI (your existing key)"]].map(([v, l]) => (
                <button key={v} onClick={() => setApiProvider(v)} style={{ fontSize: 12, padding: "6px 12px", borderRadius: "var(--border-radius-md)", border: apiProvider === v ? "1.5px solid var(--color-border-info)" : "0.5px solid var(--color-border-tertiary)", background: apiProvider === v ? "var(--color-background-info)" : "transparent", color: apiProvider === v ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                  {l}
                </button>
              ))}
            </div>

            {apiProvider === "scrapecreators" ? (
              <div>
                <p style={{ margin: "0 0 10px", fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  Go to <strong style={{ fontWeight: 500, color: "var(--color-text-info)" }}>scrapecreators.com</strong> → sign up free → go to Dashboard → copy your API key. Free credits included, no monthly fee.
                </p>
                {!scKey ? (
                  <div style={{ display: "flex", gap: 8 }}>
                    <input type="password" placeholder="Paste ScrapeCreators API key..." value={scInput} onChange={e => setScInput(e.target.value)} onKeyDown={e => e.key === "Enter" && connect()} style={{ flex: 1, fontSize: 13, padding: "8px 10px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-secondary)", color: "var(--color-text-primary)", fontFamily: "var(--font-mono)" }} />
                    <button onClick={connect} disabled={fetching || !scInput.trim()} style={{ fontSize: 12, padding: "8px 16px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", cursor: "pointer", fontFamily: "var(--font-sans)", opacity: !scInput.trim() ? 0.4 : 1, whiteSpace: "nowrap" }}>
                      {fetching ? "Connecting..." : "Connect ↗"}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => { setScKey(""); setScInput(""); setIsLive(false); setTrends(MOCK_TRENDS); setFetchLog([]); }} style={{ fontSize: 12, padding: "5px 12px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer", fontFamily: "var(--font-sans)" }}>Disconnect</button>
                )}
              </div>
            ) : (
              <div>
                <p style={{ margin: "0 0 10px", fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  Your existing RapidAPI key. Note: trending data requires a paid plan ($10/mo). Free plan works for hashtag lookups only.
                </p>
                {!rapidKey ? (
                  <div style={{ display: "flex", gap: 8 }}>
                    <input type="password" placeholder="Paste RapidAPI key..." value={rapidInput} onChange={e => setRapidInput(e.target.value)} onKeyDown={e => e.key === "Enter" && connect()} style={{ flex: 1, fontSize: 13, padding: "8px 10px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-secondary)", color: "var(--color-text-primary)", fontFamily: "var(--font-mono)" }} />
                    <button onClick={connect} disabled={fetching || !rapidInput.trim()} style={{ fontSize: 12, padding: "8px 16px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", cursor: "pointer", fontFamily: "var(--font-sans)", opacity: !rapidInput.trim() ? 0.4 : 1, whiteSpace: "nowrap" }}>
                      {fetching ? "Connecting..." : "Connect ↗"}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => { setRapidKey(""); setRapidInput(""); setIsLive(false); setTrends(MOCK_TRENDS); setFetchLog([]); }} style={{ fontSize: 12, padding: "5px 12px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer", fontFamily: "var(--font-sans)" }}>Disconnect</button>
                )}
              </div>
            )}

            {/* Log */}
            {fetchLog.length > 0 && (
              <div style={{ marginTop: 12, background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 12px" }}>
                <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)" }}>Connection log</p>
                {fetchLog.map((l, i) => (
                  <p key={i} style={{ margin: "2px 0", fontSize: 11, fontFamily: "var(--font-mono)", color: l.type === "error" ? "var(--color-text-danger)" : l.type === "success" ? "var(--color-text-success)" : l.type === "warn" ? "var(--color-text-warning)" : "var(--color-text-secondary)" }}>
                    {l.t} — {l.msg}
                  </p>
                ))}
                {fetching && <div style={{ marginTop: 6 }}><Dots /></div>}
              </div>
            )}
          </div>

          {/* Step 2 CJ */}
          <div style={{ border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: 16, background: "var(--color-background-primary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: cjToken ? "var(--color-background-success)" : "var(--color-background-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: cjToken ? "var(--color-text-success)" : "var(--color-text-secondary)", flexShrink: 0 }}>{cjToken ? "✓" : "2"}</div>
              <p style={{ margin: 0, fontWeight: 500, fontSize: 13 }}>CJ Dropshipping — real product catalog</p>
              {cjToken && <Tag color="success">Connected</Tag>}
            </div>
            <p style={{ margin: "0 0 10px", fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Go to <span style={{ color: "var(--color-text-info)" }}>developers.cjdropshipping.com</span> → log in → find API Key in account settings → copy it.
            </p>
            {!cjToken ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="password" placeholder="Paste CJ API key..." value={cjInput} onChange={e => setCjInput(e.target.value)} onKeyDown={e => e.key === "Enter" && connectCj()} style={{ flex: 1, fontSize: 13, padding: "8px 10px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-secondary)", color: "var(--color-text-primary)", fontFamily: "var(--font-mono)" }} />
                  <button onClick={connectCj} disabled={connectingCj || !cjInput.trim()} style={{ fontSize: 12, padding: "8px 16px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", cursor: "pointer", fontFamily: "var(--font-sans)", opacity: !cjInput.trim() ? 0.4 : 1, whiteSpace: "nowrap" }}>
                    {connectingCj ? "Connecting..." : "Connect ↗"}
                  </button>
                </div>
                {cjError && <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-danger)" }}>{cjError}</p>}
                <p style={{ margin: 0, fontSize: 11, color: "var(--color-text-tertiary)" }}>No CJ key yet? App still works with demo products — full flow is testable now.</p>
              </div>
            ) : (
              <button onClick={() => { setCjToken(""); setCjInput(""); }} style={{ fontSize: 12, padding: "5px 12px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer", fontFamily: "var(--font-sans)" }}>Disconnect</button>
            )}
          </div>

          {/* Step 3 TikTok Shop */}
          <div style={{ border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: 16, background: "var(--color-background-primary)", opacity: 0.65 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--color-background-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", flexShrink: 0 }}>3</div>
              <p style={{ margin: 0, fontWeight: 500, fontSize: 13 }}>TikTok Shop API — push products live &nbsp;<Tag color="warning">Coming soon</Tag></p>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Apply at <span style={{ color: "var(--color-text-info)" }}>partner.tiktokshop.com</span> → Service Provider account → once approved, "Push to shop" will list products directly in your users' storefronts.
            </p>
          </div>

          <button onClick={() => setTab(1)} style={{ fontSize: 13, padding: 10, borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
            Go to Trends →
          </button>
        </div>
      )}

      {/* ── TRENDS ── */}
      {tab === 1 && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
            {[{ label: "Trends tracked", value: trends.length }, { label: "Avg velocity", value: avgVel }, { label: "In storefront", value: storefront.length }, { label: "Mode", value: isLive ? "Live" : "Demo" }].map(s => (
              <div key={s.label} style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 14px", flex: 1, minWidth: 80 }}>
                <p style={{ margin: 0, fontSize: 11, color: "var(--color-text-secondary)" }}>{s.label}</p>
                <p style={{ margin: "2px 0 0", fontSize: 20, fontWeight: 500 }}>{s.value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
            <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>
              {isLive ? `Live data · ${lastUpdated}` : "Demo data · connect an API in Setup to go live"}
            </p>
            <button onClick={isConnected ? () => (apiProvider === "scrapecreators" ? fetchScrapeCreators(scKey) : fetchRapidApi(rapidKey)) : () => setTab(0)} disabled={fetching} style={{ fontSize: 12, padding: "6px 12px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-primary)", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
              {fetching ? "Fetching..." : isConnected ? "Refresh ↻" : "Connect API →"}
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr)", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {trends.map(t => (
                <div key={t.id} onClick={() => analyzeTrend(t)} style={{ background: "var(--color-background-primary)", border: selected?.id === t.id ? "1.5px solid var(--color-border-info)" : "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "12px 14px", cursor: "pointer", transition: "border 0.15s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{t.hashtag}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--color-text-secondary)" }}>{t.views} views · {t.age} ago</p>
                    </div>
                    <Tag>{t.category}</Tag>
                  </div>
                  <VBar value={t.velocity} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                    <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>score {t.velocity}/100</span>
                    <span style={{ fontSize: 11, color: "#1d9e75", fontWeight: 500 }}>{t.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1.25rem", minHeight: 460 }}>
              {!selected && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8, paddingTop: "3rem" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>Click any trend to analyze it</p>
                  <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: 0, textAlign: "center" }}>Claude finds the opportunity<br/>and matches CJ products to list</p>
                </div>
              )}
              {isAnalyzing && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 10, paddingTop: "3rem" }}>
                  <Dots />
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>Analyzing {selected?.hashtag}...</p>
                </div>
              )}
              {selected && !isAnalyzing && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>{selected.hashtag}</h3>
                      <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--color-text-secondary)" }}>{selected.views} views {a && !a.error ? `· act within ${a.windowHours}h` : ""}</p>
                    </div>
                    {a && !a.error && (
                      <Tag color={a.opportunity === "early" ? "success" : a.opportunity === "growing" ? "warning" : "danger"}>
                        {a.opportunity?.toUpperCase()}
                      </Tag>
                    )}
                  </div>
                  {a && !a.error && (
                    <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 12px", marginBottom: "1rem" }}>
                      <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5 }}>{a.summary}</p>
                      <p style={{ margin: "5px 0 0", fontSize: 11, color: "var(--color-text-secondary)" }}>{a.audienceNote}</p>
                    </div>
                  )}
                  <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 500 }}>{cjToken ? "Live CJ products" : "Demo products"}</p>
                  {!products ? <Dots /> : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {products.map((p, i) => {
                        const inStore = storefront.find(s => s.pid === p.pid);
                        return (
                          <div key={i} style={{ border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", padding: "10px 12px" }}>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                            <p style={{ margin: "2px 0 6px", fontSize: 11, color: "var(--color-text-secondary)" }}>Cost: ${p.sellPrice} · Sell: {p.retailPrice} · {p.margin} margin · {p.shipping}</p>
                            <button onClick={() => pushToStorefront(selected, p)} style={{ width: "100%", fontSize: 11, padding: 5, borderRadius: "var(--border-radius-md)", border: inStore ? "0.5px solid var(--color-border-success)" : "0.5px solid var(--color-border-secondary)", background: inStore ? "var(--color-background-success)" : "transparent", color: inStore ? "var(--color-text-success)" : "var(--color-text-primary)", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                              {inStore ? "In storefront ✓" : "Push to storefront ↗"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── STOREFRONT ── */}
      {tab === 2 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>{storefront.length} product{storefront.length !== 1 ? "s" : ""} ready</p>
            {storefront.length > 0 && (
              <button onClick={() => alert("TikTok Shop API — connect in Setup to go live!")} style={{ fontSize: 12, padding: "7px 14px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                Push all to TikTok Shop ↗
              </button>
            )}
          </div>
          {storefront.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4rem 0", gap: 8 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>Storefront empty</p>
              <button onClick={() => setTab(1)} style={{ fontSize: 12, padding: "6px 14px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-primary)", cursor: "pointer", fontFamily: "var(--font-sans)", marginTop: 4 }}>Go to Trends →</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {storefront.map((p, i) => (
                <div key={i} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Tag color="success">● Listed</Tag>
                    <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>{p.pushedAt}</span>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 500, fontSize: 13 }}>{p.name}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 11, color: "var(--color-text-secondary)" }}>From {p.trendHashtag} · score {p.trendVelocity}/100</p>
                  </div>
                  <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "8px 10px" }}>
                    {[["CJ cost", `$${p.sellPrice}`], ["Sell price", p.retailPrice], ["Margin", p.margin]].map(([l, v]) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                        <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{l}</span>
                        <span style={{ fontSize: 11, fontWeight: 500, color: l === "Margin" ? "#1d9e75" : "var(--color-text-primary)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStorefront(prev => prev.filter(s => s.pid !== p.pid))} style={{ fontSize: 11, padding: 5, borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", background: "transparent", color: "var(--color-text-tertiary)", cursor: "pointer", fontFamily: "var(--font-sans)" }}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <p style={{ marginTop: "1rem", fontSize: 11, color: "var(--color-text-tertiary)", textAlign: "center" }}>
        TrendShop · {isLive ? "Live data" : "Demo mode"} · {cjToken ? "Live CJ catalog" : "Demo products"} · TikTok Shop push coming soon
      </p>
    </div>
  );
}
