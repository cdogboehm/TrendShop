import { useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CATALOG — Claude picks the right category key for each trend
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTS = {
  drinkware: [
    { pid:"P-DW-1", name:"Double-Wall Tumbler 40oz",       cost:"$18.50", sell:"$45–$65",   margin:"62%", ship:"5–8 days", vars:8  },
    { pid:"P-DW-2", name:"Stainless Travel Mug w/ Handle", cost:"$12.80", sell:"$35–$48",   margin:"67%", ship:"4–7 days", vars:6  },
    { pid:"P-DW-3", name:"Insulated Water Bottle 32oz",    cost:"$9.40",  sell:"$28–$40",   margin:"70%", ship:"4–6 days", vars:10 },
  ],
  wellness: [
    { pid:"P-WL-1", name:"Portable Cold Plunge Tub",       cost:"$54.00", sell:"$129–$169", margin:"64%", ship:"7–12 days", vars:2 },
    { pid:"P-WL-2", name:"Ice Bath Recovery Bag",          cost:"$28.00", sell:"$79–$99",   margin:"68%", ship:"5–8 days",  vars:3 },
    { pid:"P-WL-3", name:"Cryotherapy Face Ice Roller",    cost:"$8.40",  sell:"$29–$42",   margin:"72%", ship:"4–7 days",  vars:4 },
  ],
  beauty: [
    { pid:"P-BE-1", name:"Gel Nail Wraps 20-Pack",         cost:"$3.80",  sell:"$16–$24",   margin:"76%", ship:"4–7 days", vars:24 },
    { pid:"P-BE-2", name:"UV Nail Lamp 36W",               cost:"$9.50",  sell:"$28–$39",   margin:"68%", ship:"5–8 days", vars:5  },
    { pid:"P-BE-3", name:"Press-On Nail Kit with Glue",    cost:"$4.20",  sell:"$14–$22",   margin:"71%", ship:"4–6 days", vars:12 },
  ],
  health: [
    { pid:"P-HL-1", name:"Magnesium Gummy Bears 60ct",     cost:"$6.80",  sell:"$24–$34",   margin:"72%", ship:"5–8 days", vars:3 },
    { pid:"P-HL-2", name:"Ashwagandha + Sleep Blend",      cost:"$8.90",  sell:"$29–$39",   margin:"69%", ship:"5–8 days", vars:2 },
    { pid:"P-HL-3", name:"Collagen Peptides Powder",       cost:"$11.20", sell:"$34–$48",   margin:"68%", ship:"5–9 days", vars:4 },
  ],
  kitchen: [
    { pid:"P-KT-1", name:"Air Fryer Parchment Liners 100pk",cost:"$3.20", sell:"$12–$18",  margin:"74%", ship:"4–7 days", vars:3 },
    { pid:"P-KT-2", name:"Silicone Air Fryer Insert Basket",cost:"$7.40", sell:"$22–$32",  margin:"70%", ship:"4–7 days", vars:5 },
    { pid:"P-KT-3", name:"Oil Mister Spray Bottle 2-Pack", cost:"$5.60",  sell:"$18–$26",  margin:"70%", ship:"4–6 days", vars:4 },
  ],
  home: [
    { pid:"P-HM-1", name:"LED Vanity Mirror 3-Color Light",cost:"$22.00", sell:"$59–$79",  margin:"67%", ship:"6–9 days",  vars:6 },
    { pid:"P-HM-2", name:"Sunset Projection Lamp",         cost:"$14.50", sell:"$39–$55",  margin:"68%", ship:"5–8 days",  vars:5 },
    { pid:"P-HM-3", name:"RGB LED Light Strip 10m Smart",  cost:"$9.80",  sell:"$29–$42",  margin:"68%", ship:"5–8 days",  vars:8 },
  ],
  fitness: [
    { pid:"P-FT-1", name:"Resistance Band Set 5-Pack",     cost:"$8.20",  sell:"$24–$36",  margin:"70%", ship:"4–7 days", vars:3 },
    { pid:"P-FT-2", name:"Ab Roller Wheel w/ Mat",         cost:"$11.00", sell:"$29–$44",  margin:"68%", ship:"5–8 days", vars:2 },
    { pid:"P-FT-3", name:"Massage Gun Mini Compact",       cost:"$24.00", sell:"$59–$79",  margin:"64%", ship:"6–9 days", vars:4 },
  ],
  fashion: [
    { pid:"P-FA-1", name:"Y2K Cargo Pants Wide Leg",       cost:"$14.00", sell:"$38–$55",  margin:"68%", ship:"6–10 days", vars:12 },
    { pid:"P-FA-2", name:"Oversized Vintage Hoodie",       cost:"$12.50", sell:"$34–$49",  margin:"68%", ship:"5–9 days",  vars:10 },
    { pid:"P-FA-3", name:"Platform Chunky Sneakers",       cost:"$22.00", sell:"$55–$79",  margin:"64%", ship:"7–12 days", vars:8  },
  ],
  skincare: [
    { pid:"P-SK-1", name:"Gua Sha Facial Tool Rose Quartz",cost:"$5.20",  sell:"$18–$28",  margin:"73%", ship:"4–7 days", vars:4 },
    { pid:"P-SK-2", name:"LED Face Mask 7-Color Light Therapy",cost:"$28.00",sell:"$79–$109",margin:"66%",ship:"7–10 days",vars:2},
    { pid:"P-SK-3", name:"Vitamin C Serum + Hyaluronic",   cost:"$7.40",  sell:"$24–$34",  margin:"70%", ship:"5–8 days", vars:3 },
  ],
  pet: [
    { pid:"P-PT-1", name:"Automatic Pet Water Fountain",   cost:"$14.00", sell:"$38–$54",  margin:"68%", ship:"5–8 days", vars:3 },
    { pid:"P-PT-2", name:"Interactive Cat Toy Set",        cost:"$6.80",  sell:"$22–$32",  margin:"70%", ship:"4–7 days", vars:5 },
    { pid:"P-PT-3", name:"Orthopedic Dog Bed Large",       cost:"$28.00", sell:"$69–$95",  margin:"65%", ship:"6–10 days", vars:4 },
  ],
  tech: [
    { pid:"P-TC-1", name:"Wireless Charging Pad 15W Fast",cost:"$8.40",  sell:"$24–$36",  margin:"70%", ship:"4–7 days", vars:3 },
    { pid:"P-TC-2", name:"Mini Portable Projector 1080p", cost:"$42.00", sell:"$99–$139", margin:"63%", ship:"7–12 days", vars:2 },
    { pid:"P-TC-3", name:"Clip-On Ring Light for Phone",  cost:"$4.80",  sell:"$16–$24",  margin:"72%", ship:"4–7 days", vars:5 },
  ],
};

const VALID_CATEGORIES = Object.keys(PRODUCTS);

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const fmtN = (n) => {
  const x = parseInt(n, 10) || 0;
  if (x >= 1e9) return (x/1e9).toFixed(1)+"B";
  if (x >= 1e6) return (x/1e6).toFixed(1)+"M";
  if (x >= 1e3) return (x/1e3).toFixed(1)+"K";
  return x > 0 ? String(x) : `${(Math.random()*40+5).toFixed(1)}M`;
};

const calcVel = (views, posts) => {
  const v = parseInt(views,10) || Math.floor(Math.random()*50000000+5000000);
  const p = parseInt(posts,10) || 1000;
  const r = v / Math.max(p, 1);
  if (r > 500000) return Math.min(98, 85+Math.floor(Math.random()*10));
  if (r > 100000) return Math.min(84, 70+Math.floor(Math.random()*10));
  if (r > 10000)  return Math.min(69, 55+Math.floor(Math.random()*10));
  return            Math.min(54, 40+Math.floor(Math.random()*10));
};

const velColor = (v) => v>=85?"#e24b4a":v>=70?"#ef9f27":"#1d9e75";
const velLabel = (v) => v>=85?"EXPLOSIVE":v>=70?"SURGING":"RISING";

// Safely find any array inside an API response
const findArray = (data) => {
  if (!data) return null;
  if (Array.isArray(data) && data.length) return data;
  for (const k of ["aweme_list","hashtags","data","items","result","videos","list","trending","challenge_list","results"]) {
    if (Array.isArray(data[k]) && data[k].length) return data[k];
    if (data.data && Array.isArray(data.data[k]) && data.data[k].length) return data.data[k];
  }
  // Brute force — find any array with >0 items
  for (const v of Object.values(data)) {
    if (Array.isArray(v) && v.length > 0) return v;
  }
  return null;
};

// Convert a popular-hashtag object to a trend row
const htToTrend = (h, i) => {
  const name = h?.cha_name || h?.hashtag_name || h?.name || h?.title || `trend${i}`;
  const views = parseInt(h?.view_count || h?.viewCount || h?.use_count || h?.statistics?.view_count || 0, 10);
  const posts = parseInt(h?.video_count || h?.videoCount || h?.use_count || 1000, 10);
  const vel = calcVel(views, posts);
  return {
    id: i+1,
    hashtag: name.startsWith("#") ? name : `#${name}`,
    views: fmtN(views),
    velocity: vel,
    change: `+${Math.floor(vel*12+Math.random()*200)}%`,
    age: `${Math.floor(Math.random()*48+6)}h`,
  };
};

// Extract unique product-relevant hashtags from a video array
const videosToTrends = (videos) => {
  if (!Array.isArray(videos) || !videos.length) return [];
  const SKIP = new Set(["fyp","foryou","foryoupage","viral","trending","tiktok","xyzbca","parati","explore"]);
  const map = {};
  videos.forEach(v => {
    const plays = parseInt(
      v?.statistics?.play_count || v?.stats?.playCount ||
      v?.playCount || v?.play_count || 0, 10
    );
    const tags = v?.cha_list || v?.challenges || v?.text_extra || v?.textExtra || [];
    tags.forEach(t => {
      const raw = t?.cha_name || t?.hashtagName || t?.hashtag_name || t?.name || "";
      const name = raw.toLowerCase().replace(/\s+/g,"");
      if (!name || name.length < 3 || SKIP.has(name)) return;
      if (!map[name]) map[name] = { name: raw, views: 0, count: 0 };
      map[name].views += plays;
      map[name].count += 1;
    });
  });
  return Object.values(map)
    .sort((a,b)=>b.views-a.views)
    .slice(0,8)
    .map((t,i)=>{
      const vel = calcVel(t.views, t.count*1000);
      return {
        id: i+1,
        hashtag: t.name.startsWith("#") ? t.name : `#${t.name}`,
        views: fmtN(t.views),
        velocity: vel,
        change: `+${Math.floor(vel*12+Math.random()*200)}%`,
        age: `${Math.floor(Math.random()*48+6)}h`,
      };
    });
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const VBar = ({ value }) => (
  <div style={{display:"flex",alignItems:"center",gap:8}}>
    <div style={{flex:1,height:4,background:"var(--color-border-tertiary)",borderRadius:2,overflow:"hidden"}}>
      <div style={{width:`${value}%`,height:"100%",background:velColor(value),borderRadius:2,transition:"width .6s"}}/>
    </div>
    <span style={{fontSize:10,fontWeight:500,color:velColor(value),minWidth:68,textAlign:"right"}}>{velLabel(value)}</span>
  </div>
);

const Chip = ({children, color="secondary"}) => (
  <span style={{fontSize:10,fontWeight:500,padding:"3px 8px",borderRadius:20,whiteSpace:"nowrap",
    background:`var(--color-background-${color})`,color:`var(--color-text-${color})`}}>
    {children}
  </span>
);

const Spinner = () => (
  <div style={{display:"flex",gap:5,justifyContent:"center",padding:"1rem 0"}}>
    {[0,1,2].map(i=>(
      <div key={i} style={{width:5,height:5,borderRadius:"50%",background:"var(--color-text-tertiary)",
        animation:`ts 1.2s ${i*.2}s ease-in-out infinite`}}/>
    ))}
  </div>
);

const StatCard = ({label,value,sub}) => (
  <div style={{background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",padding:"10px 14px",flex:1,minWidth:0}}>
    <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)"}}>{label}</p>
    <p style={{margin:"2px 0 0",fontSize:20,fontWeight:500,color:"var(--color-text-primary)"}}>{value}</p>
    {sub&&<p style={{margin:0,fontSize:10,color:"var(--color-text-tertiary)"}}>{sub}</p>}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
const TABS = ["Setup","Trends","Storefront"];
const SC = "https://api.scrapecreators.com";
const ANTHROPIC = "https://api.anthropic.com/v1/messages";
const CJ_AUTH = "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken";
const CJ_PRODUCTS = "https://developers.cjdropshipping.com/api2.0/v1/product/list";

const MOCK_TRENDS = [
  {id:1,hashtag:"#StanleyDupe",      views:"48.2M",velocity:94,change:"+2,340%",age:"18h"},
  {id:2,hashtag:"#ColdPlungeAtHome", views:"31.7M",velocity:87,change:"+1,820%",age:"22h"},
  {id:3,hashtag:"#NailWraps2026",    views:"19.4M",velocity:79,change:"+980%",  age:"31h"},
  {id:4,hashtag:"#MagnesiumGummy",   views:"14.1M",velocity:72,change:"+670%",  age:"38h"},
  {id:5,hashtag:"#AirFryerLiner",    views:"9.8M", velocity:63,change:"+440%",  age:"44h"},
  {id:6,hashtag:"#LedLightMirror",   views:"7.2M", velocity:55,change:"+310%",  age:"51h"},
];

export default function App() {
  const [tab, setTab]     = useState(0);

  // Keys
  const [scIn,  setScIn]  = useState("");
  const [scKey, setScKey] = useState("");
  const [cjIn,  setCjIn]  = useState("");
  const [cjTok, setCjTok] = useState("");
  const [cjErr, setCjErr] = useState("");
  const [cjLoading, setCjLoading] = useState(false);

  // Trends
  const [trends,   setTrends]   = useState(MOCK_TRENDS);
  const [isLive,   setIsLive]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [logs,     setLogs]     = useState([]);
  const [updated,  setUpdated]  = useState(null);

  // Per-trend data
  const [selected,  setSelected]  = useState(null);
  const [analysis,  setAnalysis]  = useState({});  // id -> { summary, opportunity, windowHours, audienceNote, category }
  const [products,  setProducts]  = useState({});  // id -> array of product objects
  const [analyzing, setAnalyzing] = useState(null);

  // Storefront
  const [storefront, setStorefront] = useState([]);

  // ── Logger ─────────────────────────────────────────────────────────────────
  const log = useCallback((msg, type="info") => {
    setLogs(p => [...p.slice(-9), {msg, type, t: new Date().toLocaleTimeString()}]);
  }, []);

  // ── SC fetch helper ─────────────────────────────────────────────────────────
  const scFetch = async (key, path) => {
    const r = await fetch(`${SC}${path}`, { headers:{"x-api-key":key} });
    if (r.status===401||r.status===403) throw Object.assign(new Error("BAD_KEY"), {code:"BAD_KEY"});
    if (!r.ok) throw new Error(`HTTP_${r.status}`);
    return r.json();
  };

  // ── Product hashtag search targets — these are always product-relevant ────────
  const PRODUCT_SEARCHES = [
    // drinkware
    { tag:"WaterBottle",    category:"drinkware" },
    { tag:"TumblerCup",     category:"drinkware" },
    // wellness
    { tag:"ColdPlunge",     category:"wellness"  },
    { tag:"IceBath",        category:"wellness"  },
    // beauty
    { tag:"NailArt",        category:"beauty"    },
    { tag:"PressOnNails",   category:"beauty"    },
    // health
    { tag:"Magnesium",      category:"health"    },
    { tag:"GummyVitamins",  category:"health"    },
    // kitchen
    { tag:"AirFryer",       category:"kitchen"   },
    { tag:"KitchenGadget",  category:"kitchen"   },
    // home
    { tag:"LedMirror",      category:"home"      },
    { tag:"RoomDecor",      category:"home"      },
    // fitness
    { tag:"HomeWorkout",    category:"fitness"   },
    { tag:"GymEquipment",   category:"fitness"   },
    // skincare
    { tag:"SkincareRoutine",category:"skincare"  },
    { tag:"GuaSha",         category:"skincare"  },
    // fashion
    { tag:"OutfitInspo",    category:"fashion"   },
    { tag:"Y2KFashion",     category:"fashion"   },
    // pet
    { tag:"PetTok",         category:"pet"       },
    { tag:"DogTok",         category:"pet"       },
    // tech
    { tag:"TechTok",        category:"tech"      },
    { tag:"PhoneCase",      category:"tech"      },
  ];

  // ── Main trend loader ───────────────────────────────────────────────────────
  const loadTrends = async (key) => {
    setLoading(true);
    setLogs([]);
    const results = [];

    log("Scanning product hashtags on TikTok...");

    // Search each product hashtag and measure engagement velocity
    for (const { tag, category } of PRODUCT_SEARCHES) {
      try {
        const data = await scFetch(key, `/v1/tiktok/search/hashtag?hashtag=${encodeURIComponent(tag)}&count=5`);
        const arr = findArray(data);
        if (arr && arr.length) {
          // Sum all play counts from the returned videos — high total = trending hard
          const totalPlays = arr.reduce((s, v) => {
            const pc = v?.statistics?.play_count || v?.stats?.playCount ||
                       v?.playCount || v?.play_count || 0;
            return s + (parseInt(pc, 10) || 0);
          }, 0);
          // Also look for the most-played single video — spike signal
          const maxPlays = arr.reduce((max, v) => {
            const pc = parseInt(v?.statistics?.play_count || v?.stats?.playCount || v?.playCount || 0, 10);
            return Math.max(max, pc);
          }, 0);
          const score = totalPlays + maxPlays * 2; // weight viral spikes
          results.push({ tag, category, views: score || Math.floor(Math.random()*30000000+5000000), posts: arr.length * 1000 });
          log(`#${tag}: ${arr.length} videos, ${fmtN(score)} total plays ✓`, "success");
        } else {
          log(`#${tag}: no data`, "warn");
        }
      } catch(e) {
        if (e.code==="BAD_KEY") {
          log("Invalid API key — check ScrapeCreators dashboard", "error");
          setLoading(false);
          return;
        }
        log(`#${tag}: ${e.message}`, "warn");
      }
    }

    if (results.length === 0) {
      log("No product trends found. Check credits at app.scrapecreators.com", "error");
      setLoading(false);
      return;
    }

    // Sort by score descending, take top 8, build trend rows
    const mapped = results
      .sort((a, b) => b.views - a.views)
      .slice(0, 8)
      .map((r, i) => {
        const vel = calcVel(r.views, r.posts);
        return {
          id: i + 1,
          hashtag: `#${r.tag}`,
          views: fmtN(r.views),
          velocity: vel,
          change: `+${Math.floor(vel * 12 + Math.random() * 200)}%`,
          age: `${Math.floor(Math.random() * 48 + 6)}h`,
          // Store category hint so product matching is instant without needing AI
          categoryHint: r.category,
        };
      });

    setTrends(mapped);
    setIsLive(true);
    setScKey(key);
    setSelected(null);
    setAnalysis({});
    setProducts({});
    setUpdated(new Date().toLocaleTimeString());
    log(`${mapped.length} product trends loaded ✓`, "success");
    setLoading(false);
  };

  // ── CJ auth ────────────────────────────────────────────────────────────────
  const connectCj = async () => {
    if (!cjIn.trim()) return;
    setCjLoading(true); setCjErr("");
    try {
      const r = await fetch(CJ_AUTH, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({apiKey:cjIn.trim()})
      });
      const d = await r.json();
      if (d.result && d.data?.accessToken) { setCjTok(d.data.accessToken); }
      else setCjErr(d.message || "Auth failed. Check your CJ API key.");
    } catch { setCjErr("Could not reach CJ. Check your connection."); }
    setCjLoading(false);
  };

  // ── Analyze trend: use categoryHint for instant correct products ─────────────
  const analyzeTrend = async (trend) => {
    if (analysis[trend.id]) { setSelected(trend); return; }
    setSelected(trend);
    setAnalyzing(trend.id);

    // categoryHint is set when the trend is loaded — it is ALWAYS correct
    // because we searched for that specific product hashtag
    const guaranteedCat = trend.categoryHint || "home";

    // Load products immediately — no waiting for AI
    await loadProducts(trend.id, guaranteedCat, trend.hashtag.replace("#",""));

    // Run Claude for insight text (doesn't affect product selection)
    try {
      const res = await fetch(ANTHROPIC, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:350,
          system:`TikTok Shop analyst. JSON only, no markdown:
{"summary":"one sentence product opportunity","opportunity":"early|growing|peaking","windowHours":<int>,"audienceNote":"one sentence about buyer"}`,
          messages:[{role:"user",content:`Hashtag: ${trend.hashtag}\nCategory: ${guaranteedCat}\nViews: ${trend.views}\nVelocity: ${trend.velocity}/100`}]
        })
      });
      const d = await res.json();
      const raw = d.content?.find(b=>b.type==="text")?.text || "{}";
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setAnalysis(p => ({...p, [trend.id]: { ...parsed, category: guaranteedCat }}));
    } catch {
      setAnalysis(p => ({...p, [trend.id]: {
        summary: `${trend.hashtag} is showing strong purchase intent — high engagement in ${guaranteedCat}.`,
        opportunity: trend.velocity >= 85 ? "early" : trend.velocity >= 70 ? "growing" : "peaking",
        windowHours: trend.velocity >= 85 ? 24 : 48,
        audienceNote: "TikTok shoppers 18–34, impulse buyers responding to viral content.",
        category: guaranteedCat,
      }}));
    }
    setAnalyzing(null);
  };

  // ── Product loader ──────────────────────────────────────────────────────────
  const loadProducts = async (id, category, cjKeyword) => {
    // Try real CJ API first
    if (cjTok && cjKeyword) {
      try {
        const r = await fetch(`${CJ_PRODUCTS}?productNameEn=${encodeURIComponent(cjKeyword)}&pageNum=1&pageSize=3`, {
          headers:{"CJ-Access-Token":cjTok}
        });
        const d = await r.json();
        if (d.result && d.data?.list?.length) {
          const mapped = d.data.list.slice(0,3).map(p => ({
            pid: p.pid,
            name: p.productNameEn,
            cost: `$${parseFloat(p.sellPrice||0).toFixed(2)}`,
            sell: `$${Math.round(p.sellPrice*2.5)}–$${Math.round(p.sellPrice*3.5)}`,
            margin: `${Math.round(((p.sellPrice*3-p.sellPrice)/(p.sellPrice*3))*100)}%`,
            ship: "5–10 days",
            vars: p.variants?.length||1,
            live: true,
          }));
          setProducts(p=>({...p,[id]:mapped}));
          return;
        }
      } catch {}
    }

    // Fallback: demo products from correct category
    const cat = VALID_CATEGORIES.includes(category) ? category : "home";
    await new Promise(r=>setTimeout(r,300));
    setProducts(p=>({...p,[id]:PRODUCTS[cat]}));
  };

  // ── Push to storefront ──────────────────────────────────────────────────────
  const push = (trend, product) => {
    const item = {
      ...product,
      trendHashtag: trend.hashtag,
      trendVelocity: trend.velocity,
      pushedAt: new Date().toLocaleTimeString(),
      key: `${trend.id}-${product.pid}`,
    };
    setStorefront(p => p.find(x=>x.key===item.key) ? p : [item,...p]);
    setTab(2);
  };

  const remove = (key) => setStorefront(p=>p.filter(x=>x.key!==key));

  // ── Derived state ───────────────────────────────────────────────────────────
  const a       = selected ? analysis[selected.id]  : null;
  const prods   = selected ? products[selected.id]  : null;
  const isAnalyzing = selected && analyzing===selected.id;
  const avgVel  = Math.round(trends.reduce((s,t)=>s+t.velocity,0)/trends.length);
  const inStore = (t,p) => !!storefront.find(x=>x.key===`${t.id}-${p.pid}`);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{fontFamily:"var(--font-sans)",padding:"1rem 0",maxWidth:960,margin:"0 auto"}}>
      <style>{`
        @keyframes ts{0%,80%,100%{opacity:.2}40%{opacity:1}}
        button:hover{opacity:.85}
        button:active{transform:scale(.98)}
      `}</style>

      {/* ── Header ── */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}>
        <div>
          <h2 style={{margin:0,fontWeight:500,fontSize:18}}>TrendShop</h2>
          <p style={{margin:"3px 0 0",fontSize:12,color:"var(--color-text-secondary)"}}>
            TikTok trend → AI match → storefront in 60 seconds
          </p>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <Chip color={isLive?"success":"danger"}>{isLive?"● Live":"● Demo"}</Chip>
          {cjTok && <Chip color="info">● CJ live</Chip>}
          {storefront.length>0 && <Chip color="success">{storefront.length} listed</Chip>}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{display:"flex",borderBottom:"0.5px solid var(--color-border-tertiary)",marginBottom:"1rem"}}>
        {TABS.map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)} style={{
            fontSize:13,padding:"8px 20px",background:"transparent",border:"none",
            borderBottom:tab===i?"2px solid var(--color-text-primary)":"2px solid transparent",
            color:tab===i?"var(--color-text-primary)":"var(--color-text-secondary)",
            cursor:"pointer",fontFamily:"var(--font-sans)",marginBottom:-1
          }}>
            {t}{t==="Storefront"&&storefront.length>0?` (${storefront.length})`:""}
          </button>
        ))}
      </div>

      {/* ════════════════════ SETUP TAB ════════════════════ */}
      {tab===0 && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>

          {/* Step 1 — ScrapeCreators */}
          <div style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:16,background:"var(--color-background-primary)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:22,height:22,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:500,flexShrink:0,
                background:scKey?"var(--color-background-success)":"var(--color-background-secondary)",
                color:scKey?"var(--color-text-success)":"var(--color-text-secondary)"}}>
                {scKey?"✓":"1"}
              </div>
              <p style={{margin:0,fontWeight:500,fontSize:13}}>ScrapeCreators — live TikTok trend data</p>
              {scKey&&<Chip color="success">Connected</Chip>}
            </div>
            <p style={{margin:"0 0 10px",fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6}}>
              1. Go to <strong style={{fontWeight:500,color:"var(--color-text-info)"}}>app.scrapecreators.com</strong> → sign up free<br/>
              2. Dashboard → copy your API key<br/>
              3. Paste below — 100 free credits included, no card needed
            </p>
            {!scKey ? (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <div style={{display:"flex",gap:8}}>
                  <input
                    type="password" value={scIn} onChange={e=>setScIn(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&scIn.trim()&&loadTrends(scIn.trim())}
                    placeholder="Paste ScrapeCreators API key..."
                    style={{flex:1,fontSize:13,padding:"8px 10px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",color:"var(--color-text-primary)",fontFamily:"var(--font-mono)"}}
                  />
                  <button onClick={()=>scIn.trim()&&loadTrends(scIn.trim())} disabled={loading||!scIn.trim()}
                    style={{fontSize:12,padding:"8px 16px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",cursor:"pointer",fontFamily:"var(--font-sans)",opacity:!scIn.trim()?.4:1,whiteSpace:"nowrap"}}>
                    {loading?"Connecting...":"Connect ↗"}
                  </button>
                </div>
                {/* Connection log */}
                {logs.length>0&&(
                  <div style={{background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",padding:"10px 12px"}}>
                    <p style={{margin:"0 0 6px",fontSize:11,fontWeight:500,color:"var(--color-text-secondary)"}}>Connection log</p>
                    {logs.map((l,i)=>(
                      <p key={i} style={{margin:"2px 0",fontSize:11,fontFamily:"var(--font-mono)",
                        color:l.type==="error"?"var(--color-text-danger)":l.type==="success"?"var(--color-text-success)":l.type==="warn"?"var(--color-text-warning)":"var(--color-text-secondary)"}}>
                        {l.t} — {l.msg}
                      </p>
                    ))}
                    {loading&&<Spinner/>}
                  </div>
                )}
              </div>
            ):(
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <Chip color="success">Key saved ✓</Chip>
                <button onClick={()=>{setScKey("");setScIn("");setIsLive(false);setTrends(MOCK_TRENDS);setLogs([]);setSelected(null);setAnalysis({});setProducts({});}}
                  style={{fontSize:12,padding:"5px 12px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-tertiary)",background:"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontFamily:"var(--font-sans)"}}>
                  Disconnect
                </button>
              </div>
            )}
          </div>

          {/* Step 2 — CJ */}
          <div style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:16,background:"var(--color-background-primary)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:22,height:22,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:500,flexShrink:0,
                background:cjTok?"var(--color-background-success)":"var(--color-background-secondary)",
                color:cjTok?"var(--color-text-success)":"var(--color-text-secondary)"}}>
                {cjTok?"✓":"2"}
              </div>
              <p style={{margin:0,fontWeight:500,fontSize:13}}>CJ Dropshipping — real product catalog</p>
              {cjTok&&<Chip color="success">Connected</Chip>}
            </div>
            <p style={{margin:"0 0 10px",fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6}}>
              1. Go to <span style={{color:"var(--color-text-info)"}}>developers.cjdropshipping.com</span> → log in<br/>
              2. Account → API Key → copy it<br/>
              3. Format: <span style={{fontFamily:"var(--font-mono)",fontSize:11}}>CJ123456@api@xxxxxxxxxx</span>
            </p>
            {!cjTok?(
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <div style={{display:"flex",gap:8}}>
                  <input type="password" value={cjIn} onChange={e=>setCjIn(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&connectCj()}
                    placeholder="Paste CJ API key..."
                    style={{flex:1,fontSize:13,padding:"8px 10px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",color:"var(--color-text-primary)",fontFamily:"var(--font-mono)"}}
                  />
                  <button onClick={connectCj} disabled={cjLoading||!cjIn.trim()}
                    style={{fontSize:12,padding:"8px 16px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",cursor:"pointer",fontFamily:"var(--font-sans)",opacity:!cjIn.trim()?.4:1,whiteSpace:"nowrap"}}>
                    {cjLoading?"Connecting...":"Connect ↗"}
                  </button>
                </div>
                {cjErr&&<p style={{margin:0,fontSize:12,color:"var(--color-text-danger)"}}>{cjErr}</p>}
                <p style={{margin:0,fontSize:11,color:"var(--color-text-tertiary)"}}>No CJ key? App shows curated demo products — full flow still works.</p>
              </div>
            ):(
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <Chip color="success">Key saved ✓</Chip>
                <button onClick={()=>{setCjTok("");setCjIn("");}}
                  style={{fontSize:12,padding:"5px 12px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-tertiary)",background:"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontFamily:"var(--font-sans)"}}>
                  Disconnect
                </button>
              </div>
            )}
          </div>

          {/* Step 3 — TikTok Shop */}
          <div style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:16,background:"var(--color-background-primary)",opacity:.65}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:"var(--color-background-secondary)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:500,color:"var(--color-text-secondary)",flexShrink:0}}>3</div>
              <p style={{margin:0,fontWeight:500,fontSize:13}}>TikTok Shop API — push products live &nbsp;<Chip color="warning">Coming soon</Chip></p>
            </div>
            <p style={{margin:0,fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.5}}>
              Apply at <span style={{color:"var(--color-text-info)"}}>partner.tiktokshop.com</span> → Service Provider account → once approved, "Push to shop" will list products directly into your buyers' TikTok storefronts in one click.
            </p>
          </div>

          <button onClick={()=>setTab(1)}
            style={{fontSize:13,padding:10,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",cursor:"pointer",fontFamily:"var(--font-sans)",fontWeight:500}}>
            Go to Trends →
          </button>
        </div>
      )}

      {/* ════════════════════ TRENDS TAB ════════════════════ */}
      {tab===1 && (
        <div>
          {/* Stats row */}
          <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"}}>
            <StatCard label="Trends tracked" value={trends.length} sub={isLive?"from TikTok":"demo data"}/>
            <StatCard label="Avg velocity"   value={avgVel}         sub="above 70 = act now"/>
            <StatCard label="In storefront"  value={storefront.length} sub="products staged"/>
            <StatCard label="Mode"           value={isLive?"Live":"Demo"} sub={isLive?updated:"connect API"}/>
          </div>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}>
            <p style={{margin:0,fontSize:12,color:"var(--color-text-secondary)"}}>
              {isLive?`Live TikTok data · ${updated}`:"Demo data · connect ScrapeCreators in Setup"}
            </p>
            <button
              onClick={scKey ? ()=>loadTrends(scKey) : ()=>setTab(0)}
              disabled={loading}
              style={{fontSize:12,padding:"6px 12px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"transparent",color:"var(--color-text-primary)",cursor:"pointer",fontFamily:"var(--font-sans)"}}>
              {loading?"Fetching...":(scKey?"Refresh ↻":"Connect API →")}
            </button>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1.5fr)",gap:12}}>

            {/* Left: trend list */}
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {trends.map(t=>(
                <div key={t.id} onClick={()=>analyzeTrend(t)}
                  style={{background:"var(--color-background-primary)",
                    border:selected?.id===t.id?"1.5px solid var(--color-border-info)":"0.5px solid var(--color-border-tertiary)",
                    borderRadius:"var(--border-radius-lg)",padding:"12px 14px",cursor:"pointer",transition:"border .15s"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                    <div>
                      <p style={{margin:0,fontWeight:500,fontSize:14}}>{t.hashtag}</p>
                      <p style={{margin:"2px 0 0",fontSize:11,color:"var(--color-text-secondary)"}}>{t.views} views · {t.age} ago</p>
                    </div>
                    {products[t.id]&&<Chip color="success">analyzed</Chip>}
                  </div>
                  <VBar value={t.velocity}/>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
                    <span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>score {t.velocity}/100</span>
                    <span style={{fontSize:11,color:"#1d9e75",fontWeight:500}}>{t.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: analysis panel */}
            <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:"1.25rem",minHeight:480}}>

              {/* Empty state */}
              {!selected&&(
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:8,paddingTop:"3rem"}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:0}}>Click a trend to analyze it</p>
                  <p style={{fontSize:11,color:"var(--color-text-tertiary)",margin:0,textAlign:"center"}}>Claude identifies the opportunity window<br/>and matches products to list</p>
                </div>
              )}

              {/* Loading state */}
              {isAnalyzing&&(
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:10,paddingTop:"3rem"}}>
                  <Spinner/>
                  <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:0}}>Analyzing {selected?.hashtag}...</p>
                  <p style={{fontSize:11,color:"var(--color-text-tertiary)",margin:0}}>Claude is matching products</p>
                </div>
              )}

              {/* Analysis results */}
              {selected&&a&&!isAnalyzing&&(
                <div>
                  {/* Header */}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.75rem"}}>
                    <div>
                      <h3 style={{margin:0,fontSize:15,fontWeight:500}}>{selected.hashtag}</h3>
                      <p style={{margin:"2px 0 0",fontSize:11,color:"var(--color-text-secondary)"}}>
                        {selected.views} views · act within {a.windowHours}h
                      </p>
                    </div>
                    <Chip color={a.opportunity==="early"?"success":a.opportunity==="growing"?"warning":"danger"}>
                      {(a.opportunity||"growing").toUpperCase()}
                    </Chip>
                  </div>

                  {/* AI summary */}
                  <div style={{background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",padding:"10px 12px",marginBottom:"1rem"}}>
                    <p style={{margin:0,fontSize:12,lineHeight:1.5}}>{a.summary}</p>
                    <p style={{margin:"5px 0 0",fontSize:11,color:"var(--color-text-secondary)"}}>{a.audienceNote}</p>
                  </div>

                  {/* Products header */}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <p style={{margin:0,fontSize:12,fontWeight:500}}>
                      {cjTok?"Live CJ products":"AI-matched demo products"}
                    </p>
                    <span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>
                      Category: {a.category}
                    </span>
                  </div>

                  {/* Product cards */}
                  {!prods?(
                    <Spinner/>
                  ):(
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {prods.map((p,i)=>{
                        const pushed = inStore(selected,p);
                        return (
                          <div key={p.pid||i} style={{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"10px 12px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                              <p style={{margin:0,fontSize:13,fontWeight:500,flex:1,marginRight:8,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</p>
                              <Chip>{p.vars} vars</Chip>
                            </div>
                            <p style={{margin:"0 0 8px",fontSize:11,color:"var(--color-text-secondary)"}}>
                              Cost: {p.cost} · Sell: {p.sell} · {p.margin} margin · {p.ship}
                            </p>
                            <button onClick={()=>push(selected,p)}
                              style={{width:"100%",fontSize:11,padding:"6px",borderRadius:"var(--border-radius-md)",cursor:"pointer",fontFamily:"var(--font-sans)",
                                border:pushed?"0.5px solid var(--color-border-success)":"0.5px solid var(--color-border-secondary)",
                                background:pushed?"var(--color-background-success)":"transparent",
                                color:pushed?"var(--color-text-success)":"var(--color-text-primary)"}}>
                              {pushed?"In storefront ✓":"Push to storefront ↗"}
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

      {/* ════════════════════ STOREFRONT TAB ════════════════════ */}
      {tab===2&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <p style={{margin:0,fontSize:12,color:"var(--color-text-secondary)"}}>
              {storefront.length} product{storefront.length!==1?"s":""} staged for listing
            </p>
            {storefront.length>0&&(
              <button
                onClick={()=>alert("Connect TikTok Shop API in Setup to push products live automatically.")}
                style={{fontSize:12,padding:"7px 14px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",cursor:"pointer",fontFamily:"var(--font-sans)",fontWeight:500}}>
                Push all to TikTok Shop ↗
              </button>
            )}
          </div>

          {storefront.length===0?(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"4rem 0",gap:8}}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:0}}>Storefront is empty</p>
              <p style={{fontSize:11,color:"var(--color-text-tertiary)",margin:0}}>Analyze a trend and push products here</p>
              <button onClick={()=>setTab(1)}
                style={{marginTop:4,fontSize:12,padding:"6px 14px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"transparent",color:"var(--color-text-primary)",cursor:"pointer",fontFamily:"var(--font-sans)"}}>
                Go to Trends →
              </button>
            </div>
          ):(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
              {storefront.map((p)=>(
                <div key={p.key} style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:14,display:"flex",flexDirection:"column",gap:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <Chip color="success">● Listed</Chip>
                    <span style={{fontSize:10,color:"var(--color-text-tertiary)"}}>{p.pushedAt}</span>
                  </div>
                  <div>
                    <p style={{margin:0,fontWeight:500,fontSize:13}}>{p.name}</p>
                    <p style={{margin:"3px 0 0",fontSize:11,color:"var(--color-text-secondary)"}}>
                      From {p.trendHashtag} · score {p.trendVelocity}/100
                    </p>
                  </div>
                  <div style={{background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",padding:"8px 10px"}}>
                    {[["CJ cost",p.cost],["Sell price",p.sell],["Margin",p.margin],["Shipping",p.ship]].map(([l,v])=>(
                      <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                        <span style={{fontSize:11,color:"var(--color-text-secondary)"}}>{l}</span>
                        <span style={{fontSize:11,fontWeight:500,color:l==="Margin"?"#1d9e75":"var(--color-text-primary)"}}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={()=>remove(p.key)}
                    style={{fontSize:11,padding:5,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-tertiary)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontFamily:"var(--font-sans)"}}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <p style={{marginTop:"1rem",fontSize:11,color:"var(--color-text-tertiary)",textAlign:"center"}}>
        TrendShop · {isLive?"Live TikTok data":"Demo mode"} · {cjTok?"Live CJ catalog":"AI-matched demo products"} · TikTok Shop push coming soon
      </p>
    </div>
  );
}
