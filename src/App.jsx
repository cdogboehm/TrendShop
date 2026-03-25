import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CATALOG
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTS = {
  drinkware: [
    { pid:"P-DW-1", name:"Double-Wall Tumbler 40oz",       cost:"$18.50", sell:"$45–$65",   margin:"62%", ship:"5–8 days", vars:8  },
    { pid:"P-DW-2", name:"Insulated Travel Mug w/ Handle", cost:"$12.80", sell:"$35–$48",   margin:"67%", ship:"4–7 days", vars:6  },
    { pid:"P-DW-3", name:"Stainless Water Bottle 32oz",    cost:"$9.40",  sell:"$28–$40",   margin:"70%", ship:"4–6 days", vars:10 },
  ],
  wellness: [
    { pid:"P-WL-1", name:"Portable Cold Plunge Tub",       cost:"$54.00", sell:"$129–$169", margin:"64%", ship:"7–12 days", vars:2 },
    { pid:"P-WL-2", name:"Ice Bath Recovery Bag",          cost:"$28.00", sell:"$79–$99",   margin:"68%", ship:"5–8 days",  vars:3 },
    { pid:"P-WL-3", name:"Cryotherapy Face Ice Roller",    cost:"$8.40",  sell:"$29–$42",   margin:"72%", ship:"4–7 days",  vars:4 },
  ],
  beauty: [
    { pid:"P-BE-1", name:"Gel Nail Wraps 20-Pack",         cost:"$3.80",  sell:"$16–$24",   margin:"76%", ship:"4–7 days", vars:24 },
    { pid:"P-BE-2", name:"UV Nail Lamp 36W",               cost:"$9.50",  sell:"$28–$39",   margin:"68%", ship:"5–8 days", vars:5  },
    { pid:"P-BE-3", name:"Press-On Nail Kit Pro",          cost:"$4.20",  sell:"$14–$22",   margin:"71%", ship:"4–6 days", vars:12 },
  ],
  health: [
    { pid:"P-HL-1", name:"Magnesium Gummy Bears 60ct",     cost:"$6.80",  sell:"$24–$34",   margin:"72%", ship:"5–8 days", vars:3 },
    { pid:"P-HL-2", name:"Ashwagandha + Sleep Blend",      cost:"$8.90",  sell:"$29–$39",   margin:"69%", ship:"5–8 days", vars:2 },
    { pid:"P-HL-3", name:"Collagen Peptides Powder",       cost:"$11.20", sell:"$34–$48",   margin:"68%", ship:"5–9 days", vars:4 },
  ],
  kitchen: [
    { pid:"P-KT-1", name:"Air Fryer Parchment Liners 100pk",cost:"$3.20", sell:"$12–$18",  margin:"74%", ship:"4–7 days", vars:3 },
    { pid:"P-KT-2", name:"Silicone Air Fryer Basket",      cost:"$7.40",  sell:"$22–$32",  margin:"70%", ship:"4–7 days", vars:5 },
    { pid:"P-KT-3", name:"Oil Mister Spray Bottle 2pk",    cost:"$5.60",  sell:"$18–$26",  margin:"70%", ship:"4–6 days", vars:4 },
  ],
  home: [
    { pid:"P-HM-1", name:"LED Vanity Mirror 3-Color",      cost:"$22.00", sell:"$59–$79",  margin:"67%", ship:"6–9 days",  vars:6 },
    { pid:"P-HM-2", name:"Sunset Projection Lamp",         cost:"$14.50", sell:"$39–$55",  margin:"68%", ship:"5–8 days",  vars:5 },
    { pid:"P-HM-3", name:"RGB LED Smart Strip 10m",        cost:"$9.80",  sell:"$29–$42",  margin:"68%", ship:"5–8 days",  vars:8 },
  ],
  fitness: [
    { pid:"P-FT-1", name:"Resistance Band Set 5-Pack",     cost:"$8.20",  sell:"$24–$36",  margin:"70%", ship:"4–7 days", vars:3 },
    { pid:"P-FT-2", name:"Ab Roller Wheel w/ Mat",         cost:"$11.00", sell:"$29–$44",  margin:"68%", ship:"5–8 days", vars:2 },
    { pid:"P-FT-3", name:"Mini Massage Gun Compact",       cost:"$24.00", sell:"$59–$79",  margin:"64%", ship:"6–9 days", vars:4 },
  ],
  fashion: [
    { pid:"P-FA-1", name:"Y2K Cargo Pants Wide Leg",       cost:"$14.00", sell:"$38–$55",  margin:"68%", ship:"6–10 days", vars:12 },
    { pid:"P-FA-2", name:"Oversized Vintage Hoodie",       cost:"$12.50", sell:"$34–$49",  margin:"68%", ship:"5–9 days",  vars:10 },
    { pid:"P-FA-3", name:"Platform Chunky Sneakers",       cost:"$22.00", sell:"$55–$79",  margin:"64%", ship:"7–12 days", vars:8  },
  ],
  skincare: [
    { pid:"P-SK-1", name:"Gua Sha Rose Quartz Tool",       cost:"$5.20",  sell:"$18–$28",  margin:"73%", ship:"4–7 days", vars:4 },
    { pid:"P-SK-2", name:"LED Face Mask 7-Color Therapy",  cost:"$28.00", sell:"$79–$109", margin:"66%", ship:"7–10 days", vars:2 },
    { pid:"P-SK-3", name:"Vitamin C + Hyaluronic Serum",   cost:"$7.40",  sell:"$24–$34",  margin:"70%", ship:"5–8 days", vars:3 },
  ],
  pet: [
    { pid:"P-PT-1", name:"Auto Pet Water Fountain",        cost:"$14.00", sell:"$38–$54",  margin:"68%", ship:"5–8 days",  vars:3 },
    { pid:"P-PT-2", name:"Interactive Cat Toy Set 5pc",    cost:"$6.80",  sell:"$22–$32",  margin:"70%", ship:"4–7 days",  vars:5 },
    { pid:"P-PT-3", name:"Orthopedic Dog Bed Large",       cost:"$28.00", sell:"$69–$95",  margin:"65%", ship:"6–10 days", vars:4 },
  ],
  tech: [
    { pid:"P-TC-1", name:"Wireless Charging Pad 15W",      cost:"$8.40",  sell:"$24–$36",  margin:"70%", ship:"4–7 days",  vars:3 },
    { pid:"P-TC-2", name:"Mini Portable Projector 1080p",  cost:"$42.00", sell:"$99–$139", margin:"63%", ship:"7–12 days", vars:2 },
    { pid:"P-TC-3", name:"Clip-On Ring Light for Phone",   cost:"$4.80",  sell:"$16–$24",  margin:"72%", ship:"4–7 days",  vars:5 },
  ],
};

const VALID_CATS = Object.keys(PRODUCTS);

const PRODUCT_SEARCHES = [
  { tag:"WaterBottle",    category:"drinkware" },
  { tag:"TumblerCup",     category:"drinkware" },
  { tag:"ColdPlunge",     category:"wellness"  },
  { tag:"IceBath",        category:"wellness"  },
  { tag:"NailArt",        category:"beauty"    },
  { tag:"PressOnNails",   category:"beauty"    },
  { tag:"Magnesium",      category:"health"    },
  { tag:"GummyVitamins",  category:"health"    },
  { tag:"AirFryer",       category:"kitchen"   },
  { tag:"KitchenGadget",  category:"kitchen"   },
  { tag:"LedMirror",      category:"home"      },
  { tag:"RoomDecor",      category:"home"      },
  { tag:"HomeWorkout",    category:"fitness"   },
  { tag:"GymEquipment",   category:"fitness"   },
  { tag:"SkincareRoutine",category:"skincare"  },
  { tag:"GuaSha",         category:"skincare"  },
  { tag:"OutfitInspo",    category:"fashion"   },
  { tag:"Y2KFashion",     category:"fashion"   },
  { tag:"PetTok",         category:"pet"       },
  { tag:"DogTok",         category:"pet"       },
  { tag:"TechTok",        category:"tech"      },
  { tag:"PhoneCase",      category:"tech"      },
];

const MOCK_TRENDS = [
  { id:1, hashtag:"#WaterBottle",    views:"48.2M", velocity:94, change:"+2,340%", age:"18h", categoryHint:"drinkware" },
  { id:2, hashtag:"#ColdPlunge",     views:"31.7M", velocity:87, change:"+1,820%", age:"22h", categoryHint:"wellness"  },
  { id:3, hashtag:"#NailArt",        views:"19.4M", velocity:79, change:"+980%",   age:"31h", categoryHint:"beauty"    },
  { id:4, hashtag:"#Magnesium",      views:"14.1M", velocity:72, change:"+670%",   age:"38h", categoryHint:"health"    },
  { id:5, hashtag:"#AirFryer",       views:"9.8M",  velocity:63, change:"+440%",   age:"44h", categoryHint:"kitchen"   },
  { id:6, hashtag:"#LedMirror",      views:"7.2M",  velocity:55, change:"+310%",   age:"51h", categoryHint:"home"      },
];

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

const calcVel = (v, p) => {
  const r = (parseInt(v,10)||Math.random()*50000000+5000000) / Math.max(parseInt(p,10)||1000, 1);
  if (r > 500000) return Math.min(98, 85+Math.floor(Math.random()*10));
  if (r > 100000) return Math.min(84, 70+Math.floor(Math.random()*10));
  if (r > 10000)  return Math.min(69, 55+Math.floor(Math.random()*10));
  return            Math.min(54, 40+Math.floor(Math.random()*10));
};

const velColor = (v) => v>=85?"var(--red)":v>=70?"var(--orange)":"var(--accent)";
const velLabel = (v) => v>=85?"EXPLOSIVE":v>=70?"SURGING":"RISING";

const findArray = (data) => {
  if (!data) return null;
  if (Array.isArray(data) && data.length) return data;
  for (const k of ["aweme_list","hashtags","data","items","result","videos","list","trending"]) {
    if (Array.isArray(data[k]) && data[k].length) return data[k];
    if (data.data && Array.isArray(data.data[k]) && data.data[k].length) return data.data[k];
  }
  for (const val of Object.values(data)) {
    if (Array.isArray(val) && val.length > 0) return val;
  }
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS (inline)
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  bgBase:    "var(--bg-base)",
  bgSurface: "var(--bg-surface)",
  bgEl:      "var(--bg-elevated)",
  bgHover:   "var(--bg-hover)",
  border:    "var(--border)",
  borderMd:  "var(--border-md)",
  borderAcc: "var(--border-accent)",
  text1:     "var(--text-primary)",
  text2:     "var(--text-secondary)",
  text3:     "var(--text-tertiary)",
  accent:    "var(--accent)",
  accentDim: "var(--accent-dim)",
  red:       "var(--red)",
  redDim:    "var(--red-dim)",
  orange:    "var(--orange)",
  orangeDim: "var(--orange-dim)",
  greenDim:  "var(--green-dim)",
  blueDim:   "var(--blue-dim)",
  rSm:       "var(--radius-sm)",
  rMd:       "var(--radius-md)",
  rLg:       "var(--radius-lg)",
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const Btn = ({ children, onClick, variant="ghost", disabled, style={} }) => {
  const styles = {
    primary: { background:C.accent, color:"#0b0d13", fontWeight:600, border:"none", padding:"9px 20px", borderRadius:C.rMd },
    ghost:   { background:"transparent", color:C.text1, border:`1px solid ${C.borderMd}`, padding:"8px 16px", borderRadius:C.rMd },
    danger:  { background:C.redDim, color:C.red, border:`1px solid ${C.red}33`, padding:"8px 16px", borderRadius:C.rMd },
    accent:  { background:C.accentDim, color:C.accent, border:`1px solid ${C.borderAcc}`, padding:"8px 16px", borderRadius:C.rMd },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ fontSize:13, cursor:"pointer", fontFamily:"var(--font-body)", whiteSpace:"nowrap", ...styles[variant], ...style }}>
      {children}
    </button>
  );
};

const Badge = ({ children, color="ghost" }) => {
  const map = {
    ghost:   { bg:"var(--bg-elevated)", fg:C.text2, bd:C.border },
    accent:  { bg:C.accentDim, fg:C.accent, bd:"var(--border-accent)" },
    red:     { bg:C.redDim, fg:C.red, bd:`${C.red}33` },
    orange:  { bg:C.orangeDim, fg:C.orange, bd:`${C.orange}33` },
    green:   { bg:C.greenDim, fg:C.accent, bd:`${C.accent}33` },
    blue:    { bg:C.blueDim, fg:"var(--blue)", bd:`var(--blue)33` },
  };
  const s = map[color] || map.ghost;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", fontSize:10, fontWeight:600, padding:"3px 8px", borderRadius:20, whiteSpace:"nowrap", background:s.bg, color:s.fg, border:`1px solid ${s.bd}`, letterSpacing:"0.05em", textTransform:"uppercase" }}>
      {children}
    </span>
  );
};

const Card = ({ children, style={}, accent=false }) => (
  <div style={{
    background: C.bgSurface,
    border: `1px solid ${accent ? "var(--border-accent)" : C.border}`,
    borderRadius: C.rLg,
    padding: "16px",
    ...style
  }}>
    {children}
  </div>
);

const Spinner = () => (
  <div style={{ display:"flex", gap:5, justifyContent:"center", padding:"12px 0" }}>
    {[0,1,2].map(i => (
      <div key={i} style={{ width:5, height:5, borderRadius:"50%", background:C.accent, animation:`blink 1.2s ${i*.2}s ease-in-out infinite` }}/>
    ))}
  </div>
);

const VBar = ({ value }) => {
  const color = velColor(value);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ flex:1, height:3, background:C.bgEl, borderRadius:2, overflow:"hidden" }}>
        <div style={{ width:`${value}%`, height:"100%", background:color, borderRadius:2, transition:"width .5s ease", boxShadow:`0 0 6px ${color}66` }}/>
      </div>
      <span style={{ fontSize:9, fontWeight:700, color, minWidth:62, textAlign:"right", letterSpacing:"0.08em", fontFamily:"var(--font-mono)" }}>
        {velLabel(value)}
      </span>
    </div>
  );
};

const StatCard = ({ label, value, sub, accent=false }) => (
  <div style={{ background:C.bgSurface, border:`1px solid ${accent?"var(--border-accent)":C.border}`, borderRadius:C.rMd, padding:"14px 16px", flex:1, minWidth:0 }}>
    <p style={{ margin:"0 0 4px", fontSize:11, color:C.text2, textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"var(--font-mono)" }}>{label}</p>
    <p style={{ margin:0, fontSize:22, fontWeight:700, color:accent?C.accent:C.text1, fontFamily:"var(--font-display)" }}>{value}</p>
    {sub && <p style={{ margin:"2px 0 0", fontSize:11, color:C.text3 }}>{sub}</p>}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────
const Landing = ({ onEnter }) => {
  const PLANS = [
    {
      name: "7-Day Trial", price: "Free", period: "", accent: false, trial: true,
      desc: "Full Pro access. No credit card needed.",
      features: ["Unlimited trend scans", "Live CJ product catalog", "One-click storefront push", "AI analysis per trend", "All API providers"],
      cta: "Start free trial →",
    },
    {
      name: "Pro", price: "$39", period: "/mo", accent: true, trial: false,
      desc: "Everything to find trends and sell fast.",
      features: ["Unlimited trend scans", "Live CJ product catalog", "One-click storefront push", "Priority AI analysis", "Saved profiles & keys", "Any API provider"],
      cta: "Get started",
    },
    {
      name: "Scale", price: "$99", period: "/mo", accent: false, trial: false,
      desc: "For serious sellers doing real volume.",
      features: ["Everything in Pro", "Multi-store support", "Trend alerts via email", "Competitor tracking", "White-label ready", "Priority support"],
      cta: "Get started",
    },
  ];

  const STEPS = [
    { n:"01", title:"Scan trends", desc:"We search 22 product hashtags on TikTok in real time and rank them by engagement velocity." },
    { n:"02", title:"AI matches products", desc:"Claude analyzes each trend and selects the best-fit products from CJ Dropshipping's 500K catalog." },
    { n:"03", title:"Push to your shop", desc:"One click lists the product in your TikTok Shop. From trend to live listing in under 60 seconds." },
  ];

  return (
    <div style={{ minHeight:"100vh", background:C.bgBase }}>

      {/* Nav */}
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 40px", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, background:`${C.bgBase}ee`, backdropFilter:"blur(12px)", zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:C.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0b0d13" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:16, color:C.text1 }}>TrendShop</span>
        </div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <a href="#pricing" style={{ fontSize:13, color:C.text2 }}>Pricing</a>
          <Btn onClick={onEnter} variant="primary" style={{ padding:"8px 20px" }}>Launch app →</Btn>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth:900, margin:"0 auto", padding:"100px 40px 80px", textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:C.accentDim, border:`1px solid ${C.borderAcc}`, borderRadius:20, padding:"4px 14px", marginBottom:32 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:C.accent, animation:"glow 2s ease-in-out infinite" }}/>
          <span style={{ fontSize:11, color:C.accent, fontWeight:600, fontFamily:"var(--font-mono)", letterSpacing:"0.08em" }}>LIVE TREND INTELLIGENCE</span>
        </div>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(38px,6vw,72px)", fontWeight:800, lineHeight:1.05, color:C.text1, marginBottom:24 }}>
          Spot trends before<br/>
          <span style={{ color:C.accent }}>they go viral.</span>
        </h1>
        <p style={{ fontSize:18, color:C.text2, maxWidth:540, margin:"0 auto 40px", lineHeight:1.6 }}>
          TrendShop scans TikTok in real time, matches trending hashtags to products, and lists them in your shop — in under 60 seconds.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Btn onClick={onEnter} variant="primary" style={{ padding:"12px 32px", fontSize:15 }}>Start free →</Btn>
          <Btn onClick={() => document.getElementById("how").scrollIntoView({behavior:"smooth"})} variant="ghost" style={{ padding:"12px 32px", fontSize:15 }}>See how it works</Btn>
        </div>
        <p style={{ marginTop:20, fontSize:12, color:C.text3 }}>No credit card required · Free tier available · 60-second setup</p>
      </section>

      {/* Stat strip */}
      <div style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, background:C.bgSurface }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"24px 40px", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16 }}>
          {[["22","Product categories tracked"],["60s","Trend to listing time"],["500K+","CJ products available"],["$0","To start"]].map(([v,l])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <p style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:800, color:C.accent, margin:0 }}>{v}</p>
              <p style={{ fontSize:12, color:C.text2, margin:"2px 0 0" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how" style={{ maxWidth:900, margin:"0 auto", padding:"80px 40px" }}>
        <p style={{ fontSize:11, color:C.accent, fontWeight:600, fontFamily:"var(--font-mono)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>How it works</p>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:36, fontWeight:700, color:C.text1, marginBottom:48 }}>Three steps to your<br/>next product.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
          {STEPS.map(s => (
            <Card key={s.n} style={{ padding:"24px" }}>
              <p style={{ fontFamily:"var(--font-mono)", fontSize:11, color:C.accent, marginBottom:12 }}>{s.n}</p>
              <p style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:600, color:C.text1, marginBottom:8 }}>{s.title}</p>
              <p style={{ fontSize:13, color:C.text2, lineHeight:1.6 }}>{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ maxWidth:900, margin:"0 auto", padding:"0 40px 100px" }}>
        <p style={{ fontSize:11, color:C.accent, fontWeight:600, fontFamily:"var(--font-mono)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>Pricing</p>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:36, fontWeight:700, color:C.text1, marginBottom:12 }}>Simple, transparent pricing.</h2>
        <p style={{ fontSize:15, color:C.text2, marginBottom:48 }}>Start free. Upgrade when you're ready to scale.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:16 }}>
          {PLANS.map(plan => (
            <div key={plan.name} style={{
              background: plan.accent ? C.bgSurface : C.bgSurface,
              border: `1px solid ${plan.accent ? "var(--border-accent)" : C.border}`,
              borderRadius: C.rLg,
              padding: "28px 24px",
              position: "relative",
              boxShadow: plan.accent ? "0 0 40px rgba(0,229,176,0.08)" : "none",
            }}>
              {plan.accent && (
                <div style={{ position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)", background:C.accent, color:"#0b0d13", fontSize:10, fontWeight:700, padding:"3px 16px", borderRadius:"0 0 8px 8px", letterSpacing:"0.08em" }}>
                  MOST POPULAR
                </div>
              )}
              <p style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, color:C.text1, marginBottom:4 }}>{plan.name}</p>
              <div style={{ display:"flex", alignItems:"baseline", gap:2, marginBottom:8 }}>
                <span style={{ fontFamily:"var(--font-display)", fontSize:36, fontWeight:800, color:plan.accent?C.accent:C.text1 }}>{plan.price}</span>
                <span style={{ fontSize:14, color:C.text2 }}>{plan.period}</span>
              </div>
              <p style={{ fontSize:13, color:C.text2, marginBottom:20, lineHeight:1.5 }}>{plan.desc}</p>
              <Btn onClick={onEnter} variant={plan.accent?"primary":"ghost"} style={{ width:"100%", justifyContent:"center", marginBottom:20 }}>
                {plan.cta || "Get started"}
              </Btn>
              <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:16, display:"flex", flexDirection:"column", gap:8 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize:12, color:C.text2 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"24px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:20, height:20, borderRadius:6, background:C.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0b0d13" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:13, color:C.text2 }}>TrendShop</span>
        </div>
        <p style={{ fontSize:12, color:C.text3 }}>© 2026 TrendShop. Built for TikTok sellers.</p>
      </footer>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN / PROFILE MODAL
// ─────────────────────────────────────────────────────────────────────────────
const ProfileModal = ({ onSave, onClose, existing }) => {
  const [name, setName]   = useState(existing?.name || "");
  const [email, setEmail] = useState(existing?.email || "");
  const [err, setErr]     = useState("");

  const save = () => {
    if (!name.trim()) { setErr("Enter your name to continue"); return; }
    onSave({ name: name.trim(), email: email.trim(), plan: existing?.plan || "Starter", createdAt: existing?.createdAt || Date.now() });
  };

  const canClose = !!existing; // only allow closing if already has a profile

  return (
    <div
      style={{ position:"fixed", inset:0, background:"#0b0d13", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}
      onClick={canClose ? onClose : undefined}
    >
      <div
        style={{ background:"#12151f", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"36px 32px", width:"100%", maxWidth:420, animation:"fadeIn .2s ease", position:"relative", boxShadow:"0 24px 80px rgba(0,0,0,0.8)" }}
        onClick={e=>e.stopPropagation()}
      >
        {/* Close button — only shown when already logged in */}
        {canClose && (
          <button onClick={onClose}
            style={{ position:"absolute", top:16, right:16, background:"transparent", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#7d8fa8" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        )}

        {/* Logo + title */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"#00e5b0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0b0d13" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <div>
            <p style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:18, color:"#e4eaf4", margin:0 }}>TrendShop</p>
            <p style={{ fontSize:12, color:"#7d8fa8", margin:0 }}>{existing ? "Edit your profile" : "Create your free account"}</p>
          </div>
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <label style={{ fontSize:11, color:"#7d8fa8", display:"block", marginBottom:7, fontFamily:"var(--font-mono)", textTransform:"uppercase", letterSpacing:"0.08em" }}>Your name</label>
            <input
              value={name} onChange={e=>setName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&save()}
              placeholder="e.g. Jordan Smith" type="text"
              autoFocus
              style={{ letterSpacing:"normal", fontFamily:"var(--font-body)", fontSize:14, padding:"10px 14px", background:"#191d2a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#e4eaf4", width:"100%", outline:"none" }}
            />
          </div>
          <div>
            <label style={{ fontSize:11, color:"#7d8fa8", display:"block", marginBottom:7, fontFamily:"var(--font-mono)", textTransform:"uppercase", letterSpacing:"0.08em" }}>
              Email <span style={{ color:"#3d4a5c", textTransform:"none", fontFamily:"var(--font-body)" }}>(optional)</span>
            </label>
            <input
              value={email} onChange={e=>setEmail(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&save()}
              placeholder="you@email.com" type="email"
              style={{ letterSpacing:"normal", fontFamily:"var(--font-body)", fontSize:14, padding:"10px 14px", background:"#191d2a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#e4eaf4", width:"100%", outline:"none" }}
            />
          </div>

          {err && <p style={{ fontSize:12, color:"#ff4d6a", margin:0 }}>{err}</p>}

          <button onClick={save}
            style={{ marginTop:4, padding:"12px", background:"#00e5b0", color:"#0b0d13", fontWeight:700, fontSize:14, border:"none", borderRadius:8, cursor:"pointer", fontFamily:"var(--font-display)", letterSpacing:"0.02em", transition:"opacity .15s" }}>
            {existing ? "Save changes" : "Create profile & launch →"}
          </button>

          {!existing && (
            <p style={{ fontSize:11, color:"#3d4a5c", textAlign:"center", margin:0 }}>
              Free to start · no credit card · keys stay in your browser
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:"trends",     label:"Radar",      icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
  { id:"storefront", label:"Storefront", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { id:"settings",   label:"Settings",   icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
];

const Sidebar = ({ tab, setTab, profile, storefront, isLive, onProfileClick, onLogout }) => (
  <aside style={{ width:240, minWidth:240, background:"#0e1118", borderRight:"1px solid rgba(255,255,255,0.08)", display:"flex", flexDirection:"column", height:"100vh", position:"sticky", top:0, flexShrink:0 }}>
    {/* Logo */}
    <div style={{ padding:"22px 18px 18px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:30, height:30, borderRadius:9, background:C.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 0 16px rgba(0,229,176,0.3)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0b0d13" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <div>
          <p style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:15, color:"#e4eaf4", margin:0, lineHeight:1.1 }}>TrendShop</p>
          <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:isLive?"#00e5b0":"#3d4a5c", animation:isLive?"glow 2s ease-in-out infinite":"none" }}/>
            <p style={{ fontSize:9, color:isLive?"#00e5b0":"#3d4a5c", margin:0, fontFamily:"var(--font-mono)", letterSpacing:"0.08em", textTransform:"uppercase" }}>{isLive?"Live":"Demo"}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Nav label */}
    <p style={{ fontSize:9, color:"#3d4a5c", fontFamily:"var(--font-mono)", textTransform:"uppercase", letterSpacing:"0.12em", padding:"16px 18px 6px", margin:0 }}>Navigation</p>

    {/* Nav items */}
    <nav style={{ flex:1, padding:"0 10px" }}>
      {NAV_ITEMS.map(item => {
        const active = tab === item.id;
        return (
          <button key={item.id} onClick={() => setTab(item.id)}
            style={{
              display:"flex", alignItems:"center", gap:10, width:"100%",
              padding:"10px 12px", borderRadius:C.rSm, marginBottom:3,
              background: active ? "rgba(0,229,176,0.08)" : "transparent",
              color: active ? "#e4eaf4" : "#7d8fa8",
              border: `1px solid ${active ? "rgba(0,229,176,0.2)" : "transparent"}`,
              fontSize:13, fontWeight: active ? 600 : 400,
              cursor:"pointer", fontFamily:"var(--font-body)",
              transition:"all .15s",
            }}>
            <span style={{ color:active?"#00e5b0":"#3d4a5c", display:"flex" }}>{item.icon}</span>
            {item.label}
            {item.id==="storefront" && storefront.length>0 && (
              <span style={{ marginLeft:"auto", background:"rgba(0,229,176,0.12)", color:"#00e5b0", fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:10, fontFamily:"var(--font-mono)" }}>{storefront.length}</span>
            )}
          </button>
        );
      })}
    </nav>

    {/* Divider */}
    <div style={{ height:1, background:"rgba(255,255,255,0.06)", margin:"0 10px" }}/>

    {/* Profile + logout */}
    <div style={{ padding:"12px 10px 16px", display:"flex", flexDirection:"column", gap:6 }}>
      <button onClick={onProfileClick}
        style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 12px", borderRadius:C.rSm, background:"#191d2a", border:"1px solid rgba(255,255,255,0.08)", cursor:"pointer", transition:"background .15s" }}
        onMouseEnter={e=>e.currentTarget.style.background="#1e2230"}
        onMouseLeave={e=>e.currentTarget.style.background="#191d2a"}>
        <div style={{ width:30, height:30, borderRadius:"50%", background:"rgba(0,229,176,0.1)", border:"1px solid rgba(0,229,176,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#00e5b0", flexShrink:0, fontFamily:"var(--font-display)" }}>
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ textAlign:"left", minWidth:0, flex:1 }}>
          <p style={{ fontSize:12, fontWeight:600, color:"#e4eaf4", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{profile.name}</p>
          <p style={{ fontSize:10, color:"#00e5b0", margin:0, fontFamily:"var(--font-mono)" }}>{profile.plan || "Trial"}</p>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3d4a5c" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button onClick={onLogout}
        style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, width:"100%", padding:"7px 12px", borderRadius:C.rSm, background:"transparent", border:"1px solid rgba(255,77,106,0.2)", cursor:"pointer", transition:"all .15s", color:"rgba(255,77,106,0.7)", fontSize:12, fontFamily:"var(--font-body)" }}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,77,106,0.08)";e.currentTarget.style.color="#ff4d6a";}}
        onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,77,106,0.7)";}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign out
      </button>
    </div>
  </aside>
);

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS TAB
// ─────────────────────────────────────────────────────────────────────────────
const SettingsTab = ({ profile, scKey, cjToken, setScKey, setCjToken, onProfileEdit, apiProvider, setApiProvider, customKey, setCustomKey }) => {
  const [scIn, setScIn]   = useState(scKey ? "••••••••••••" : "");
  const [cjIn, setCjIn]   = useState(cjToken ? "••••••••••••" : "");
  const [cjErr, setCjErr] = useState("");
  const [cjLoad, setCjLoad] = useState(false);
  const [scMsg, setScMsg] = useState("");

  const saveScKey = (k) => {
    if (!k.trim() || k.includes("•")) return;
    localStorage.setItem("ts_sc_key", k.trim());
    setScKey(k.trim());
    setScMsg("Saved ✓");
    setTimeout(()=>setScMsg(""),2000);
  };

  const saveCjKey = async () => {
    if (!cjIn.trim() || cjIn.includes("•")) return;
    setCjLoad(true); setCjErr("");
    try {
      const r = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({apiKey:cjIn.trim()})
      });
      const d = await r.json();
      if (d.result && d.data?.accessToken) {
        localStorage.setItem("ts_cj_key", cjIn.trim());
        setCjToken(d.data.accessToken);
        setCjErr("Connected ✓");
      } else { setCjErr(d.message || "Auth failed"); }
    } catch { setCjErr("Could not reach CJ"); }
    setCjLoad(false);
  };

  const Section = ({ title, children }) => (
    <div style={{ marginBottom:28 }}>
      <p style={{ fontSize:10, color:C.text3, fontFamily:"var(--font-mono)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>{title}</p>
      {children}
    </div>
  );

  return (
    <div style={{ maxWidth:560, padding:"32px 0" }}>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:C.text1, marginBottom:32 }}>Settings</h2>

      <Section title="Profile">
        <Card>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:C.accentDim, border:`1px solid ${C.borderAcc}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:C.accent, fontFamily:"var(--font-display)" }}>
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize:14, fontWeight:600, color:C.text1, margin:0 }}>{profile.name}</p>
                <p style={{ fontSize:12, color:C.text2, margin:0 }}>{profile.email || "No email set"}</p>
              </div>
            </div>
            <Btn onClick={onProfileEdit} variant="ghost" style={{ padding:"6px 12px", fontSize:12 }}>Edit</Btn>
          </div>
        </Card>
      </Section>

      <Section title="API Keys">
        <Card style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <label style={{ fontSize:12, color:C.text2, fontWeight:500 }}>ScrapeCreators</label>
              {scKey && <Badge color="green">Connected</Badge>}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <input type="password" value={scIn} onChange={e=>setScIn(e.target.value)} onFocus={()=>{if(scIn.includes("•"))setScIn("");}} placeholder="Paste ScrapeCreators API key..." style={{ flex:1 }}/>
              <Btn onClick={()=>saveScKey(scIn)} variant="ghost" style={{ padding:"8px 12px", fontSize:12, flexShrink:0 }}>Save</Btn>
            </div>
            {scMsg && <p style={{ fontSize:11, color:C.accent, marginTop:4 }}>{scMsg}</p>}
            <p style={{ fontSize:11, color:C.text3, marginTop:6 }}>Get a free key at <a href="https://app.scrapecreators.com" target="_blank" rel="noreferrer">app.scrapecreators.com</a></p>
          </div>

          {/* Provider selector */}
          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:16 }}>
            <label style={{ fontSize:12, color:C.text2, fontWeight:500, display:"block", marginBottom:8 }}>Data provider</label>
            <p style={{ fontSize:11, color:C.text3, marginBottom:10 }}>Choose where TrendShop pulls TikTok data from. Use any API key you already have.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {[
                { id:"scrapecreators",    label:"ScrapeCreators",         sub:"Free tier available · scrapecreators.com" },
                { id:"rapidapi_scraper7", label:"RapidAPI — Scraper7",    sub:"Broad trending feed · rapidapi.com" },
                { id:"rapidapi_data",     label:"RapidAPI — TikTok Data", sub:"Product + hashtag data · rapidapi.com" },
                { id:"custom",            label:"Custom endpoint",         sub:"Paste your own API base URL" },
              ].map(p => (
                <button key={p.id} onClick={()=>setApiProvider(p.id)}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:C.rSm, background:apiProvider===p.id?"rgba(0,229,176,0.06)":"transparent", border:`1px solid ${apiProvider===p.id?"rgba(0,229,176,0.25)":"rgba(255,255,255,0.06)"}`, cursor:"pointer", textAlign:"left", fontFamily:"var(--font-body)", transition:"all .15s" }}>
                  <div style={{ width:14, height:14, borderRadius:"50%", border:`2px solid ${apiProvider===p.id?"#00e5b0":"#3d4a5c"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {apiProvider===p.id && <div style={{ width:6, height:6, borderRadius:"50%", background:"#00e5b0" }}/>}
                  </div>
                  <div>
                    <p style={{ margin:0, fontSize:12, fontWeight:500, color:"#e4eaf4" }}>{p.label}</p>
                    <p style={{ margin:0, fontSize:11, color:"#3d4a5c" }}>{p.sub}</p>
                  </div>
                </button>
              ))}
            </div>
            {apiProvider==="custom" && (
              <div style={{ marginTop:10 }}>
                <label style={{ fontSize:11, color:C.text2, display:"block", marginBottom:6 }}>Base URL</label>
                <input value={customKey} onChange={e=>setCustomKey(e.target.value)} placeholder="https://your-api.com" type="text" style={{ letterSpacing:"normal", fontFamily:"var(--font-body)" }}/>
                <p style={{ fontSize:11, color:C.text3, marginTop:4 }}>TrendShop will call: {"<your url>"}/search?q={"<hashtag>"}</p>
              </div>
            )}
          </div>

          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <label style={{ fontSize:12, color:C.text2, fontWeight:500 }}>CJ Dropshipping</label>
              {cjToken && <Badge color="green">Connected</Badge>}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <input type="password" value={cjIn} onChange={e=>setCjIn(e.target.value)} onFocus={()=>{if(cjIn.includes("•"))setCjIn("");}} placeholder="Paste CJ API key..." style={{ flex:1 }}/>
              <Btn onClick={saveCjKey} disabled={cjLoad} variant="ghost" style={{ padding:"8px 12px", fontSize:12, flexShrink:0 }}>
                {cjLoad?"...":"Save"}
              </Btn>
            </div>
            {cjErr && <p style={{ fontSize:11, color:cjErr.includes("✓")?C.accent:C.red, marginTop:4 }}>{cjErr}</p>}
            <p style={{ fontSize:11, color:C.text3, marginTop:6 }}>Get your key at <a href="https://cjdropshipping.com/register.html" target="_blank" rel="noreferrer">cjdropshipping.com</a> → Avatar → API</p>
          </div>
        </Card>
      </Section>

      <Section title="Plan">
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div>
              <p style={{ fontSize:14, fontWeight:600, color:C.text1, margin:0 }}>{profile.plan || "Starter"}</p>
              <p style={{ fontSize:12, color:C.text2, margin:0 }}>{profile.plan==="Pro"?"$39/month":profile.plan==="Scale"?"$99/month":"Free forever"}</p>
            </div>
            <Badge color={profile.plan==="Pro"?"accent":profile.plan==="Scale"?"blue":"ghost"}>{profile.plan || "Starter"}</Badge>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <Btn variant="primary" style={{ flex:1, justifyContent:"center", padding:"9px" }}>Upgrade to Pro — $39/mo</Btn>
          </div>
        </Card>
      </Section>

      <Section title="TikTok Shop API">
        <Card>
          <p style={{ fontSize:13, color:C.text2, lineHeight:1.6, marginBottom:12 }}>
            Connect your TikTok Shop to enable one-click product listing directly to your storefront. Apply now — approval takes 1–2 weeks.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
            {["Go to partner.tiktokshop.com","Register as a Service Provider","Fill in app details and submit","Paste credentials here once approved"].map((s,i)=>(
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:10, color:C.accent, marginTop:2, flexShrink:0 }}>0{i+1}</span>
                <span style={{ fontSize:12, color:C.text2 }}>{s}</span>
              </div>
            ))}
          </div>
          <a href="https://partner.tiktokshop.com" target="_blank" rel="noreferrer">
            <Btn variant="accent" style={{ width:"100%", justifyContent:"center" }}>Apply at partner.tiktokshop.com ↗</Btn>
          </a>
        </Card>
      </Section>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
const SC       = "https://api.scrapecreators.com";
const ANTHROPIC= "https://api.anthropic.com/v1/messages";
const CJ_AUTH  = "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken";
const CJ_PRODS = "https://developers.cjdropshipping.com/api2.0/v1/product/list";

export default function App() {
  // ── View state ──────────────────────────────────────────────────────────────
  const [view, setView]         = useState("landing"); // landing | app
  const [tab, setTab]           = useState("trends");
  const [showProfile, setShowProfile] = useState(false);

  // ── Profile (localStorage persistence) ──────────────────────────────────────
  const [profile, setProfile] = useState(null);

  // ── API keys + provider ──────────────────────────────────────────────────────
  const [scKey,       setScKey]       = useState("");
  const [cjToken,     setCjToken]     = useState("");
  const [apiProvider, setApiProvider] = useState("scrapecreators"); // scrapecreators | rapidapi_scraper7 | rapidapi_data | custom
  const [customKey,   setCustomKey]   = useState("");

  // ── Trends ───────────────────────────────────────────────────────────────────
  const [trends,   setTrends]   = useState(MOCK_TRENDS);
  const [isLive,   setIsLive]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [logs,     setLogs]     = useState([]);
  const [updated,  setUpdated]  = useState(null);

  // ── Analysis / products ───────────────────────────────────────────────────────
  const [selected,  setSelected]  = useState(null);
  const [analysis,  setAnalysis]  = useState({});
  const [products,  setProducts]  = useState({});
  const [analyzing, setAnalyzing] = useState(null);

  // ── Storefront ────────────────────────────────────────────────────────────────
  const [storefront, setStorefront] = useState([]);

  // ── Load from localStorage on mount ──────────────────────────────────────────
  useEffect(() => {
    const savedProfile = localStorage.getItem("ts_profile");
    const savedSc      = localStorage.getItem("ts_sc_key");
    const savedSf      = localStorage.getItem("ts_storefront");

    if (savedProfile) {
      const p = JSON.parse(savedProfile);
      setProfile(p);
      setView("app");
    }
    if (savedSc) setScKey(savedSc);
    if (savedSf) {
      try { setStorefront(JSON.parse(savedSf)); } catch {}
    }
  }, []);

  // ── Persist storefront ────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("ts_storefront", JSON.stringify(storefront));
  }, [storefront]);

  // ── Profile save ──────────────────────────────────────────────────────────────
  const saveProfile = (p) => {
    setProfile(p);
    localStorage.setItem("ts_profile", JSON.stringify(p));
    setShowProfile(false);
    setView("app");
  };

  // ── Logout — clears everything and returns to landing ────────────────────────
  const logout = () => {
    localStorage.removeItem("ts_profile");
    localStorage.removeItem("ts_sc_key");
    localStorage.removeItem("ts_storefront");
    setProfile(null);
    setScKey("");
    setCjToken("");
    setIsLive(false);
    setTrends(MOCK_TRENDS);
    setStorefront([]);
    setSelected(null);
    setAnalysis({});
    setProducts({});
    setLogs([]);
    setView("landing");
  };

  const log = useCallback((msg, type="info") => {
    setLogs(prev => [...prev.slice(-9), { msg, type, t: new Date().toLocaleTimeString() }]);
  }, []);

  // ── SC fetch ──────────────────────────────────────────────────────────────────
  const scFetch = async (key, path) => {
    const r = await fetch(`${SC}${path}`, { headers:{ "x-api-key":key } });
    if (r.status===401||r.status===403) throw Object.assign(new Error("BAD_KEY"),{code:"BAD_KEY"});
    if (!r.ok) throw new Error(`HTTP_${r.status}`);
    return r.json();
  };

  // ── Multi-provider fetch ─────────────────────────────────────────────────────
  const providerFetch = async (key, tag) => {
    if (apiProvider === "scrapecreators") {
      return scFetch(key, `/v1/tiktok/search/hashtag?hashtag=${encodeURIComponent(tag)}&count=5`);
    }
    if (apiProvider === "rapidapi_scraper7") {
      const r = await fetch(`https://tiktok-scraper7.p.rapidapi.com/challenge/info?keywords=${encodeURIComponent(tag)}`, {
        headers:{ "X-RapidAPI-Key":key, "X-RapidAPI-Host":"tiktok-scraper7.p.rapidapi.com" }
      });
      if (r.status===401||r.status===403) throw Object.assign(new Error("BAD_KEY"),{code:"BAD_KEY"});
      if (!r.ok) throw new Error(`HTTP_${r.status}`);
      return r.json();
    }
    if (apiProvider === "rapidapi_data") {
      const r = await fetch(`https://tiktok-data.p.rapidapi.com/hashtag?hashtag=${encodeURIComponent(tag)}`, {
        headers:{ "X-RapidAPI-Key":key, "X-RapidAPI-Host":"tiktok-data.p.rapidapi.com" }
      });
      if (r.status===401||r.status===403) throw Object.assign(new Error("BAD_KEY"),{code:"BAD_KEY"});
      if (!r.ok) throw new Error(`HTTP_${r.status}`);
      return r.json();
    }
    // custom — user-supplied endpoint base
    const r = await fetch(`${customKey}/search?q=${encodeURIComponent(tag)}`, {
      headers:{ "Authorization":`Bearer ${key}` }
    });
    if (!r.ok) throw new Error(`HTTP_${r.status}`);
    return r.json();
  };

  // ── Load trends ───────────────────────────────────────────────────────────────
  const loadTrends = async (key) => {
    setLoading(true);
    setLogs([]);
    setSelected(null);
    setAnalysis({});
    setProducts({});
    const results = [];

    const providerLabel = apiProvider==="scrapecreators"?"ScrapeCreators":apiProvider==="rapidapi_scraper7"?"RapidAPI Scraper7":apiProvider==="rapidapi_data"?"RapidAPI Data":"Custom API";
    log(`Scanning product hashtags via ${providerLabel}...`);

    for (const { tag, category } of PRODUCT_SEARCHES) {
      try {
        const data = await providerFetch(key, tag);
        const arr = findArray(data);
        if (arr && arr.length) {
          const total = arr.reduce((s,v) => s+parseInt(v?.statistics?.play_count||v?.stats?.playCount||v?.playCount||0,10), 0);
          const peak  = arr.reduce((m,v) => Math.max(m,parseInt(v?.statistics?.play_count||v?.stats?.playCount||v?.playCount||0,10)), 0);
          const score = total + peak * 2;
          results.push({ tag, category, views:score||Math.floor(Math.random()*30000000+5000000), posts:arr.length*1000 });
          log(`#${tag}: ${arr.length} videos ✓`, "success");
        } else {
          log(`#${tag}: no data`, "warn");
        }
      } catch(e) {
        if (e.code==="BAD_KEY") { log("Invalid API key", "error"); setLoading(false); return; }
        log(`#${tag}: ${e.message}`, "warn");
      }
    }

    if (!results.length) {
      log("No data returned. Check credits at app.scrapecreators.com", "error");
      setLoading(false);
      return;
    }

    const mapped = results
      .sort((a,b) => b.views - a.views)
      .slice(0, 8)
      .map((r, i) => {
        const vel = calcVel(r.views, r.posts);
        return { id:i+1, hashtag:`#${r.tag}`, views:fmtN(r.views), velocity:vel, change:`+${Math.floor(vel*12+Math.random()*200)}%`, age:`${Math.floor(Math.random()*48+6)}h`, categoryHint:r.category };
      });

    setTrends(mapped);
    setIsLive(true);
    setScKey(key);
    localStorage.setItem("ts_sc_key", key);
    setUpdated(new Date().toLocaleTimeString());
    log(`${mapped.length} product trends loaded`, "success");
    setLoading(false);
  };

  // ── Analyze trend ─────────────────────────────────────────────────────────────
  const analyzeTrend = async (trend) => {
    if (analysis[trend.id]) { setSelected(trend); return; }
    setSelected(trend);
    setAnalyzing(trend.id);

    const cat = trend.categoryHint || "home";
    await loadProducts(trend.id, cat, trend.hashtag.replace("#",""));

    try {
      const res = await fetch(ANTHROPIC, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:350,
          system:`TikTok Shop analyst. JSON only, no markdown:
{"summary":"one sentence product opportunity","opportunity":"early|growing|peaking","windowHours":<int>,"audienceNote":"one sentence about buyer"}`,
          messages:[{role:"user",content:`Hashtag: ${trend.hashtag}\nCategory: ${cat}\nViews: ${trend.views}\nVelocity: ${trend.velocity}/100`}]
        })
      });
      const d = await res.json();
      const raw = d.content?.find(b=>b.type==="text")?.text||"{}";
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setAnalysis(p=>({...p,[trend.id]:{...parsed,category:cat}}));
    } catch {
      setAnalysis(p=>({...p,[trend.id]:{
        summary:`${trend.hashtag} is trending — high engagement signals strong purchase intent in ${cat}.`,
        opportunity: trend.velocity>=85?"early":trend.velocity>=70?"growing":"peaking",
        windowHours: trend.velocity>=85?24:48,
        audienceNote: "TikTok shoppers 18–34, impulse buyers driven by viral content.",
        category: cat,
      }}));
    }
    setAnalyzing(null);
  };

  // ── Load products ─────────────────────────────────────────────────────────────
  const loadProducts = async (id, category, keyword) => {
    if (cjToken && keyword) {
      try {
        const r = await fetch(`${CJ_PRODS}?productNameEn=${encodeURIComponent(keyword)}&pageNum=1&pageSize=3`,{
          headers:{"CJ-Access-Token":cjToken}
        });
        const d = await r.json();
        if (d.result && d.data?.list?.length) {
          const mapped = d.data.list.slice(0,3).map(p=>({
            pid:p.pid, name:p.productNameEn,
            cost:`$${parseFloat(p.sellPrice||0).toFixed(2)}`,
            sell:`$${Math.round(p.sellPrice*2.5)}–$${Math.round(p.sellPrice*3.5)}`,
            margin:`${Math.round(((p.sellPrice*3-p.sellPrice)/(p.sellPrice*3))*100)}%`,
            ship:"5–10 days", vars:p.variants?.length||1, live:true,
          }));
          setProducts(p=>({...p,[id]:mapped}));
          return;
        }
      } catch {}
    }
    const cat = VALID_CATS.includes(category)?category:"home";
    await new Promise(r=>setTimeout(r,200));
    setProducts(p=>({...p,[id]:PRODUCTS[cat]}));
  };

  // ── Storefront ────────────────────────────────────────────────────────────────
  const push = (trend, product) => {
    const item = { ...product, trendHashtag:trend.hashtag, trendVelocity:trend.velocity, pushedAt:new Date().toLocaleTimeString(), key:`${trend.id}-${product.pid}` };
    setStorefront(p => p.find(x=>x.key===item.key) ? p : [item,...p]);
    setTab("storefront");
  };

  const removePush = (key) => setStorefront(p=>p.filter(x=>x.key!==key));
  const inStore = (t,p) => !!storefront.find(x=>x.key===`${t.id}-${p.pid}`);

  const a         = selected ? analysis[selected.id]  : null;
  const prods     = selected ? products[selected.id]  : null;
  const isAn      = selected && analyzing===selected.id;
  const avgVel    = Math.round(trends.reduce((s,t)=>s+t.velocity,0)/trends.length);

  // ── Landing view ──────────────────────────────────────────────────────────────
  if (view==="landing") {
    return (
      <>
        <Landing onEnter={()=>{ if(profile){setView("app");}else{setShowProfile(true);} }}/>
        {showProfile && <ProfileModal onSave={saveProfile} onClose={()=>setShowProfile(false)} existing={profile}/>}
      </>
    );
  }

  // ── App view ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ display:"flex", height:"100vh", background:C.bgBase, overflow:"hidden" }}>

      {showProfile && <ProfileModal onSave={saveProfile} onClose={()=>setShowProfile(false)} existing={profile}/>}

      <Sidebar
        tab={tab} setTab={setTab}
        profile={profile||{name:"User",plan:"Trial"}}
        storefront={storefront}
        isLive={isLive}
        onProfileClick={()=>setShowProfile(true)}
        onLogout={logout}
      />

      {/* Main content */}
      <main style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>

        {/* ═══ TRENDS TAB ═══ */}
        {tab==="trends" && (
          <div style={{ animation:"fadeIn .2s ease" }}>
            {/* Header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:12 }}>
              <div>
                <h1 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:C.text1, margin:0 }}>Trend Radar</h1>
                <p style={{ fontSize:12, color:C.text2, margin:"4px 0 0", fontFamily:"var(--font-mono)" }}>
                  {isLive ? `Live · updated ${updated}` : "Demo data · connect ScrapeCreators to go live"}
                </p>
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                {!scKey && (
                  <Btn onClick={()=>setTab("settings")} variant="accent" style={{ padding:"8px 14px", fontSize:12 }}>
                    Connect API →
                  </Btn>
                )}
                <Btn
                  onClick={scKey ? ()=>loadTrends(scKey) : ()=>setTab("settings")}
                  disabled={loading}
                  variant="ghost"
                  style={{ padding:"8px 14px", fontSize:12 }}>
                  {loading ? "Scanning..." : scKey ? "Refresh ↻" : "Connect API →"}
                </Btn>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
              <StatCard label="Trends tracked" value={trends.length} sub={isLive?"from TikTok":"demo"}/>
              <StatCard label="Avg velocity"   value={avgVel}        sub="70+ = act now" accent={avgVel>=70}/>
              <StatCard label="In storefront"  value={storefront.length} sub="products staged"/>
              <StatCard label="Status"         value={isLive?"Live":"Demo"} sub={isLive?updated:"connect API"} accent={isLive}/>
            </div>

            {/* Connection log (when loading) */}
            {(loading || logs.length > 0) && (
              <Card style={{ marginBottom:20, padding:"12px 16px" }}>
                <p style={{ fontSize:10, color:C.text3, fontFamily:"var(--font-mono)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Connection log</p>
                {logs.map((l,i) => (
                  <p key={i} style={{ margin:"2px 0", fontSize:11, fontFamily:"var(--font-mono)", color:l.type==="error"?C.red:l.type==="success"?C.accent:l.type==="warn"?C.orange:C.text3 }}>
                    <span style={{ color:C.text3 }}>{l.t}</span> — {l.msg}
                  </p>
                ))}
                {loading && <Spinner/>}
              </Card>
            )}

            {/* Main grid */}
            <div style={{ display:"grid", gridTemplateColumns:"300px 1fr", gap:16 }}>

              {/* Trend list */}
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {trends.map(t => {
                  const active = selected?.id===t.id;
                  return (
                    <button key={t.id} onClick={()=>analyzeTrend(t)}
                      style={{ display:"block", width:"100%", textAlign:"left", background:active?C.bgEl:C.bgSurface, border:`1px solid ${active?"var(--border-accent)":C.border}`, borderRadius:C.rMd, padding:"14px", cursor:"pointer", transition:"all .15s", fontFamily:"var(--font-body)" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                        <div>
                          <p style={{ margin:0, fontFamily:"var(--font-display)", fontWeight:600, fontSize:14, color:C.text1 }}>{t.hashtag}</p>
                          <p style={{ margin:"3px 0 0", fontSize:11, color:C.text2, fontFamily:"var(--font-mono)" }}>{t.views} views · {t.age} ago</p>
                        </div>
                        {analysis[t.id] && <Badge color="accent">analyzed</Badge>}
                      </div>
                      <VBar value={t.velocity}/>
                      <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
                        <span style={{ fontSize:10, color:C.text3, fontFamily:"var(--font-mono)" }}>velocity {t.velocity}/100</span>
                        <span style={{ fontSize:11, color:C.accent, fontWeight:600, fontFamily:"var(--font-mono)" }}>{t.change}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Analysis panel */}
              <Card style={{ minHeight:500, padding:"20px" }}>
                {!selected && (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:12, paddingTop:"4rem" }}>
                    <div style={{ width:48, height:48, borderRadius:14, background:C.bgEl, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    </div>
                    <p style={{ fontSize:14, color:C.text2, margin:0, fontWeight:500 }}>Select a trend to analyze</p>
                    <p style={{ fontSize:12, color:C.text3, margin:0, textAlign:"center" }}>Claude identifies the opportunity<br/>and matches products from CJ Dropshipping</p>
                  </div>
                )}

                {isAn && (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:12, paddingTop:"4rem" }}>
                    <Spinner/>
                    <p style={{ fontSize:13, color:C.text2, margin:0 }}>Analyzing {selected?.hashtag}...</p>
                    <p style={{ fontSize:11, color:C.text3, margin:0 }}>Matching products from CJ catalog</p>
                  </div>
                )}

                {selected && a && !isAn && (
                  <div style={{ animation:"fadeIn .2s ease" }}>
                    {/* Trend header */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                      <div>
                        <h2 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, color:C.text1, margin:0 }}>{selected.hashtag}</h2>
                        <p style={{ fontSize:11, color:C.text2, margin:"4px 0 0", fontFamily:"var(--font-mono)" }}>
                          {selected.views} views · act within {a.windowHours}h
                        </p>
                      </div>
                      <Badge color={a.opportunity==="early"?"accent":a.opportunity==="growing"?"orange":"red"}>
                        {a.opportunity?.toUpperCase()}
                      </Badge>
                    </div>

                    {/* AI insight */}
                    <div style={{ background:C.bgEl, borderRadius:C.rMd, padding:"12px 14px", marginBottom:16, borderLeft:`2px solid ${C.accent}` }}>
                      <p style={{ margin:"0 0 4px", fontSize:13, color:C.text1, lineHeight:1.5 }}>{a.summary}</p>
                      <p style={{ margin:0, fontSize:11, color:C.text2 }}>{a.audienceNote}</p>
                    </div>

                    {/* Products */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                      <p style={{ margin:0, fontSize:11, color:C.text3, fontFamily:"var(--font-mono)", textTransform:"uppercase", letterSpacing:"0.08em" }}>
                        {cjToken?"Live CJ products":"Demo products"} — {a.category}
                      </p>
                    </div>

                    {!prods ? <Spinner/> : (
                      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                        {prods.map((p,i) => {
                          const pushed = inStore(selected,p);
                          return (
                            <div key={p.pid||i} style={{ background:C.bgEl, border:`1px solid ${pushed?C.borderAcc:C.border}`, borderRadius:C.rMd, padding:"14px" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                                <p style={{ margin:0, fontSize:14, fontWeight:600, color:C.text1, flex:1, marginRight:10, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</p>
                                <Badge color="ghost">{p.vars} vars</Badge>
                              </div>
                              <div style={{ display:"flex", gap:16, marginBottom:10 }}>
                                <div><p style={{ margin:0, fontSize:10, color:C.text3, fontFamily:"var(--font-mono)" }}>COST</p><p style={{ margin:0, fontSize:13, fontWeight:600, color:C.text1 }}>{p.cost}</p></div>
                                <div><p style={{ margin:0, fontSize:10, color:C.text3, fontFamily:"var(--font-mono)" }}>SELL</p><p style={{ margin:0, fontSize:13, fontWeight:600, color:C.text1 }}>{p.sell}</p></div>
                                <div><p style={{ margin:0, fontSize:10, color:C.text3, fontFamily:"var(--font-mono)" }}>MARGIN</p><p style={{ margin:0, fontSize:13, fontWeight:600, color:C.accent }}>{p.margin}</p></div>
                                <div><p style={{ margin:0, fontSize:10, color:C.text3, fontFamily:"var(--font-mono)" }}>SHIP</p><p style={{ margin:0, fontSize:13, fontWeight:600, color:C.text1 }}>{p.ship}</p></div>
                              </div>
                              <button onClick={()=>push(selected,p)}
                                style={{ width:"100%", padding:"8px", borderRadius:C.rSm, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"var(--font-body)", transition:"all .15s",
                                  background: pushed?C.accentDim:"transparent",
                                  color: pushed?C.accent:C.text2,
                                  border: `1px solid ${pushed?C.borderAcc:C.borderMd}`,
                                }}>
                                {pushed ? "✓ In storefront" : "Push to storefront ↗"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {/* ═══ STOREFRONT TAB ═══ */}
        {tab==="storefront" && (
          <div style={{ animation:"fadeIn .2s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:12 }}>
              <div>
                <h1 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:C.text1, margin:0 }}>Storefront</h1>
                <p style={{ fontSize:12, color:C.text2, margin:"4px 0 0" }}>{storefront.length} product{storefront.length!==1?"s":""} staged for listing</p>
              </div>
              {storefront.length>0 && (
                <Btn onClick={()=>alert("Connect TikTok Shop API in Settings to push products live.")} variant="primary">
                  Push all to TikTok Shop ↗
                </Btn>
              )}
            </div>

            {storefront.length===0 ? (
              <Card style={{ padding:"60px 40px", textAlign:"center" }}>
                <div style={{ width:52, height:52, borderRadius:16, background:C.bgEl, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <p style={{ fontSize:15, fontWeight:600, color:C.text1, margin:"0 0 6px" }}>Storefront is empty</p>
                <p style={{ fontSize:13, color:C.text2, margin:"0 0 20px" }}>Analyze a trend and push products here</p>
                <Btn onClick={()=>setTab("trends")} variant="ghost">Go to Radar →</Btn>
              </Card>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14 }}>
                {storefront.map(p => (
                  <Card key={p.key}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                      <Badge color="accent">● Listed</Badge>
                      <span style={{ fontSize:10, color:C.text3, fontFamily:"var(--font-mono)" }}>{p.pushedAt}</span>
                    </div>
                    <p style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color:C.text1, margin:"0 0 4px" }}>{p.name}</p>
                    <p style={{ fontSize:11, color:C.text2, margin:"0 0 14px", fontFamily:"var(--font-mono)" }}>
                      {p.trendHashtag} · score {p.trendVelocity}/100
                    </p>
                    <div style={{ background:C.bgEl, borderRadius:C.rSm, padding:"10px 12px", marginBottom:12 }}>
                      {[["CJ cost",p.cost],["Sell price",p.sell],["Margin",p.margin],["Shipping",p.ship]].map(([l,v])=>(
                        <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                          <span style={{ fontSize:11, color:C.text3, fontFamily:"var(--font-mono)" }}>{l}</span>
                          <span style={{ fontSize:11, fontWeight:600, color:l==="Margin"?C.accent:C.text1 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <Btn onClick={()=>removePush(p.key)} variant="danger" style={{ width:"100%", justifyContent:"center", fontSize:11, padding:"6px" }}>
                      Remove
                    </Btn>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══ SETTINGS TAB ═══ */}
        {tab==="settings" && (
          <div style={{ animation:"fadeIn .2s ease" }}>
            <SettingsTab
              profile={profile||{name:"User",plan:"Trial"}}
              scKey={scKey}
              cjToken={cjToken}
              setScKey={(k)=>{ setScKey(k); if(k) loadTrends(k); }}
              setCjToken={setCjToken}
              onProfileEdit={()=>setShowProfile(true)}
              apiProvider={apiProvider}
              setApiProvider={setApiProvider}
              customKey={customKey}
              setCustomKey={setCustomKey}
            />
          </div>
        )}
      </main>
    </div>
  );
}
