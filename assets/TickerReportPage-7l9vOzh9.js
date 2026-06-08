import{S as e,_ as t,g as n}from"./authStore-CoQdF-Ph.js";import{C as r,D as i,E as a}from"./index-CFbq_e3t.js";import{n as o,t as s}from"./useTickerTA-CVHA_6Ai.js";var c=e(t(),1),l=n();function u(e){return`$${e.toFixed(2)}`}function d(e){return e>=1e6?`$${(e/1e6).toFixed(2)}M`:e>=1e3?`$${(e/1e3).toFixed(0)}K`:`$${e.toFixed(0)}`}function f(e){return`${e>0?`+`:``}${e.toFixed(2)}%`}function p(e,t,n){if(t==null)return`—`;let r=e-t;return Math.abs(r/t)<.01?`ATM`:n===`call`&&t>e||n===`put`&&t<e?`ITM`:`$${Math.abs(r).toFixed(0)} OTM`}function m(e,t,n){let i=t===`call`?`C`:`P`;return`$${e.toFixed(0)}${i} ${r(n)}`}var h={1:`HIGH`,2:`MED`};function g(e){return e.split(/\n+/).map((e,t)=>e.trim()?e.startsWith(`### `)?(0,l.jsx)(`div`,{className:`report-label`,style:{marginTop:t===0?0:8},children:e.slice(4)},t):(0,l.jsx)(`p`,{children:_(e)},t):null)}function _(e){return e.split(/(\*\*[^*]+\*\*)/g).map((e,t)=>e.startsWith(`**`)&&e.endsWith(`**`)?(0,l.jsx)(`strong`,{children:e.slice(2,-2)},t):(0,l.jsx)(`span`,{children:e},t))}function v(){let{ticker:e}=a(),t=(e??``).toUpperCase(),[n]=i(),r=n.get(`print`)===`1`,{data:_,isLoading:v,error:b}=o(t),{data:x,isLoading:S}=s(t);(0,c.useEffect)(()=>{let e=new Date().toISOString().slice(0,10),n=document.title;return document.title=`${t} report - ${e}`,()=>{document.title=n}},[t]),(0,c.useEffect)(()=>{if(!r||v||!_)return;if(S&&!x){let e=window.setTimeout(()=>window.print(),12e3);return()=>window.clearTimeout(e)}let e=window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>window.print())});return()=>window.cancelAnimationFrame(e)},[r,v,_,S,x]);let C=(0,c.useMemo)(()=>new Date().toLocaleDateString(`en-US`,{year:`numeric`,month:`long`,day:`numeric`}),[]);if(v||!_)return(0,l.jsxs)(`div`,{className:`report-root`,children:[(0,l.jsxs)(`div`,{style:{padding:48,color:`#666`,fontSize:14},children:[`Loading `,t,` report…`]}),(0,l.jsx)(y,{})]});if(b)return(0,l.jsxs)(`div`,{className:`report-root`,children:[(0,l.jsxs)(`div`,{style:{padding:48,color:`#a00`,fontSize:14},children:[`Failed to load `,t,` report: `,b.message]}),(0,l.jsx)(y,{})]});let w=_.header.data,T=_.bias.data,E=_.confluence.data,D=_.levels.data,O=_.flow.data,k=x?.analyst.data??_.analyst.data,A=x?.ta_levels.data??_.ta_levels.data;return(0,l.jsxs)(`div`,{className:`report-root`,children:[(0,l.jsx)(y,{}),(0,l.jsxs)(`div`,{className:`no-print report-toolbar`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`strong`,{children:t}),` report preview · generated `,C]}),(0,l.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,l.jsx)(`button`,{type:`button`,onClick:()=>window.history.back(),className:`report-btn-secondary`,children:`Back`}),(0,l.jsx)(`button`,{type:`button`,onClick:()=>window.print(),className:`report-btn-primary`,children:`Save as PDF`})]})]}),(0,l.jsxs)(`article`,{className:`report-page`,children:[(0,l.jsxs)(`header`,{className:`report-masthead`,children:[(0,l.jsx)(`div`,{className:`report-brand`,children:`ALPHA POD`}),(0,l.jsxs)(`div`,{className:`report-brand-sub`,children:[`Ticker Brief · `,C]})]}),(0,l.jsxs)(`section`,{className:`report-title-block`,children:[(0,l.jsxs)(`div`,{className:`report-title-left`,children:[(0,l.jsx)(`h1`,{className:`report-ticker`,children:t}),w&&(0,l.jsx)(`div`,{className:`report-company`,children:w.company_name}),w&&(0,l.jsxs)(`div`,{className:`report-meta`,children:[w.sector,` · `,w.market_cap]})]}),w&&(0,l.jsxs)(`div`,{className:`report-title-right`,children:[(0,l.jsx)(`div`,{className:`report-price`,children:u(w.price)}),(0,l.jsxs)(`div`,{className:`report-change ${w.change_abs>=0?`pos`:`neg`}`,children:[w.change_abs>=0?`+`:``,w.change_abs.toFixed(2),` · `,f(w.change_pct)]}),(0,l.jsxs)(`div`,{className:`report-meta`,children:[`Vol `,(w.volume/1e6).toFixed(1),`M · Avg`,` `,(w.avg_volume_30d/1e6).toFixed(1),`M (`,w.volume_ratio.toFixed(2),`x)`]})]})]}),T&&(0,l.jsxs)(`section`,{className:`report-section`,children:[(0,l.jsx)(`h2`,{className:`report-h2`,children:`Thesis`}),(0,l.jsxs)(`div`,{className:`report-bias-row`,children:[(0,l.jsx)(`span`,{className:`report-pill ${T.direction}`,children:T.direction.toUpperCase()}),(0,l.jsx)(`span`,{className:`report-pill-muted`,children:T.trend_label}),(0,l.jsx)(`span`,{className:`report-pill conv-${T.conviction.toLowerCase()}`,children:T.conviction_label}),(0,l.jsxs)(`span`,{className:`report-score`,children:[`Score `,(0,l.jsx)(`strong`,{children:T.score}),`/100 · `,T.consensus_agree,` of`,` `,T.consensus_total,` models agree`]})]}),(0,l.jsxs)(`p`,{className:`report-prose`,children:[(0,l.jsx)(`strong`,{children:t}),` — `,T.direction,` setup,`,` `,T.conviction.toLowerCase(),` conviction. Thesis broken below`,` `,(0,l.jsx)(`span`,{className:`report-price-broken`,children:u(T.thesis_broken_price)}),` `,`(`,T.thesis_broken_level_label,`); hard stop`,` `,(0,l.jsx)(`span`,{className:`report-price-stop`,children:u(T.hard_stop_price)}),`.`]})]}),E&&E.level_count>0&&(0,l.jsxs)(`section`,{className:`report-section`,children:[(0,l.jsx)(`h2`,{className:`report-h2`,children:`Confluence Zone`}),(0,l.jsxs)(`p`,{className:`report-prose`,children:[(0,l.jsxs)(`strong`,{children:[E.level_count,` levels`]}),` align in a tight`,` `,E.band_width_pct.toFixed(1),`% band from`,` `,(0,l.jsx)(`strong`,{children:u(E.band_low)}),` to`,` `,(0,l.jsx)(`strong`,{children:u(E.band_high)}),` —`,` `,(0,l.jsx)(`em`,{children:E.setup_label}),`.`]})]}),D&&D.items.length>0&&(0,l.jsxs)(`section`,{className:`report-section`,children:[(0,l.jsx)(`h2`,{className:`report-h2`,children:`Key Levels`}),(0,l.jsxs)(`table`,{className:`report-table`,children:[(0,l.jsx)(`thead`,{children:(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`th`,{style:{width:`26%`},children:`Role`}),(0,l.jsx)(`th`,{style:{width:`20%`},children:`Price`}),(0,l.jsx)(`th`,{style:{width:`14%`},children:`Distance`}),(0,l.jsx)(`th`,{style:{width:`40%`},children:`Notes`})]})}),(0,l.jsx)(`tbody`,{children:D.items.map((e,t)=>(0,l.jsxs)(`tr`,{children:[(0,l.jsxs)(`td`,{children:[(0,l.jsx)(`span`,{className:`role-${e.role}`,children:e.role_label}),e.is_king&&(0,l.jsx)(`span`,{className:`king-mark`,children:` · KING`})]}),(0,l.jsx)(`td`,{className:`num`,children:u(e.price)}),(0,l.jsx)(`td`,{className:`num ${e.distance_pct>=0?`pos`:`neg`}`,children:f(e.distance_pct)}),(0,l.jsxs)(`td`,{className:`muted`,children:[e.chips.slice(0,3).join(` · `),e.extra_count>0&&` · +${e.extra_count}`]})]},`${e.role}-${t}`))})]})]}),O&&(0,l.jsxs)(`section`,{className:`report-section avoid-break`,children:[(0,l.jsx)(`h2`,{className:`report-h2`,children:`Options Positioning`}),(0,l.jsxs)(`div`,{className:`report-grid-2`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`report-label`,children:`Net Gamma`}),(0,l.jsxs)(`div`,{className:`report-stat`,children:[(0,l.jsxs)(`span`,{className:O.net_gamma_sign===`positive`?`pos`:`neg`,children:[O.net_gamma_sign===`positive`?`+`:`−`,`$`,Math.abs(O.net_gamma_billions).toFixed(2),`B`]}),` `,(0,l.jsxs)(`span`,{className:`muted`,children:[`· `,O.net_gamma_label]})]}),(0,l.jsx)(`div`,{className:`muted small`,children:O.net_gamma_blurb})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`report-label`,children:`Bull / Bear Premium (7d)`}),(0,l.jsxs)(`div`,{className:`report-stat`,children:[(0,l.jsxs)(`span`,{className:`pos`,children:[O.bullish_pct.toFixed(0),`%`]}),` / `,(0,l.jsxs)(`span`,{className:`neg`,children:[O.bearish_pct.toFixed(0),`%`]})]}),(0,l.jsxs)(`div`,{className:`muted small`,children:[`Total premium `,d(O.premium_total)]})]})]}),(O.call_walls.length>0||O.put_walls.length>0)&&(0,l.jsxs)(`div`,{className:`report-grid-2`,style:{marginTop:12},children:[O.call_walls.length>0&&(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`report-label`,children:`Call Walls (resistance)`}),(0,l.jsx)(`ul`,{className:`report-walls`,children:O.call_walls.slice(0,3).map(e=>(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`strong`,{children:u(e.strike)}),e.oi!=null&&(0,l.jsxs)(`span`,{className:`muted`,children:[` `,`· `,(e.oi/1e3).toFixed(1),`K OI`]})]},`c${e.strike}`))})]}),O.put_walls.length>0&&(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`report-label`,children:`Put Walls (support)`}),(0,l.jsx)(`ul`,{className:`report-walls`,children:O.put_walls.slice(0,3).map(e=>(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`strong`,{children:u(e.strike)}),e.oi!=null&&(0,l.jsxs)(`span`,{className:`muted`,children:[` `,`· `,(e.oi/1e3).toFixed(1),`K OI`]})]},`p${e.strike}`))})]})]})]}),O&&O.top_flows.length>0&&(0,l.jsxs)(`section`,{className:`report-section`,children:[(0,l.jsx)(`h2`,{className:`report-h2`,children:`Top Flows · 7d (HIGH/MED conviction)`}),(0,l.jsxs)(`table`,{className:`report-table`,children:[(0,l.jsx)(`thead`,{children:(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`th`,{style:{width:`10%`},children:`Side`}),(0,l.jsx)(`th`,{style:{width:`12%`},children:`Type`}),(0,l.jsx)(`th`,{style:{width:`22%`},children:`Contract`}),(0,l.jsx)(`th`,{style:{width:`18%`},children:`Premium`}),(0,l.jsx)(`th`,{style:{width:`14%`},children:`Conf.`}),(0,l.jsx)(`th`,{style:{width:`24%`},children:`Moneyness`})]})}),(0,l.jsx)(`tbody`,{children:O.top_flows.slice(0,8).map(e=>(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`td`,{className:e.side===`buy`?`pos`:e.side===`sell`?`neg`:`muted`,children:e.side.toUpperCase()}),(0,l.jsx)(`td`,{className:e.option_type===`call`?`pos`:`neg`,children:e.option_type.toUpperCase()}),(0,l.jsx)(`td`,{className:`num`,children:m(e.strike,e.option_type,e.expiration)}),(0,l.jsx)(`td`,{className:`num`,children:d(e.premium)}),(0,l.jsx)(`td`,{children:h[e.tier]??`—`}),(0,l.jsxs)(`td`,{className:`muted`,children:[p(e.strike,e.spot_at_alert,e.option_type),e.has_sweep&&` · sweep`,e.has_floor&&` · floor`]})]},e.alert_id))})]})]}),A&&A.items.length>0&&(0,l.jsxs)(`section`,{className:`report-section`,children:[(0,l.jsxs)(`h2`,{className:`report-h2`,children:[`TA Levels`,A.model&&(0,l.jsxs)(`span`,{className:`report-h2-sub`,children:[` · `,A.model]})]}),(0,l.jsxs)(`table`,{className:`report-table`,children:[(0,l.jsx)(`thead`,{children:(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`th`,{style:{width:`22%`},children:`Role`}),(0,l.jsx)(`th`,{style:{width:`22%`},children:`Price`}),(0,l.jsx)(`th`,{style:{width:`14%`},children:`Conf.`}),(0,l.jsx)(`th`,{style:{width:`42%`},children:`Label`})]})}),(0,l.jsx)(`tbody`,{children:A.items.map((e,t)=>(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`td`,{children:(0,l.jsx)(`span`,{className:`ta-role ta-${e.color}`,children:e.role.replace(`_`,` `).toUpperCase()})}),(0,l.jsx)(`td`,{className:`num`,children:e.price_low!=null&&e.price_high!=null?`${u(e.price_low)} – ${u(e.price_high)}`:u(e.price)}),(0,l.jsx)(`td`,{children:(0,l.jsx)(`span`,{className:`ta-conf ta-conf-${e.confidence}`,children:e.confidence.toUpperCase()})}),(0,l.jsx)(`td`,{className:`muted small`,children:e.label})]},`ta-${t}-${e.price}`))})]})]}),A&&A.body_markdown&&(0,l.jsxs)(`section`,{className:`report-section`,children:[(0,l.jsx)(`h2`,{className:`report-h2`,children:`TA Read`}),(0,l.jsx)(`div`,{className:`report-prose small ta-body`,children:g(A.body_markdown)})]}),k&&k.status===`complete`&&(0,l.jsxs)(`section`,{className:`report-section`,children:[(0,l.jsxs)(`h2`,{className:`report-h2`,children:[`Analyst (v5.7 Engine)`,k.gex&&(0,l.jsxs)(`span`,{className:`report-h2-sub`,children:[` · GEX `,(0,l.jsx)(`span`,{className:k.gex.sign===`positive`?`pos`:`neg`,children:k.gex.label})]})]}),k.bottom_line&&(0,l.jsx)(`p`,{className:`report-prose small`,style:{marginBottom:10},children:k.bottom_line}),k.rr&&(0,l.jsxs)(`div`,{className:`rr-strip`,children:[(0,l.jsx)(`span`,{className:`report-label`,children:`R/R Setup`}),(0,l.jsxs)(`span`,{className:`rr-leg`,children:[`Entry `,(0,l.jsx)(`strong`,{children:u(k.rr.entry)})]}),(0,l.jsxs)(`span`,{className:`rr-leg`,children:[`Stop `,(0,l.jsx)(`strong`,{className:`neg`,children:u(k.rr.stop)})]}),(0,l.jsxs)(`span`,{className:`rr-leg`,children:[`Target `,(0,l.jsx)(`strong`,{className:`pos`,children:u(k.rr.target)})]}),(0,l.jsxs)(`span`,{className:`rr-leg rr-ratio`,children:[`R/R `,(0,l.jsxs)(`strong`,{children:[k.rr.rr.toFixed(2),`x`]})]})]}),(k.price_resistance.length>0||k.price_support.length>0)&&(0,l.jsxs)(`div`,{className:`report-grid-2`,style:{marginTop:10},children:[k.price_resistance.length>0&&(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`report-label`,children:`Resistance`}),(0,l.jsx)(`ul`,{className:`report-walls`,children:k.price_resistance.slice(0,4).map((e,t)=>(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`strong`,{className:`neg`,children:u(e.price)}),e.is_star&&(0,l.jsx)(`span`,{className:`king-mark`,children:` ★`}),e.touches>1&&(0,l.jsxs)(`span`,{className:`muted`,children:[` · `,e.touches,` touches`]}),e.tags.length>0&&(0,l.jsxs)(`span`,{className:`muted`,children:[` · `,e.tags.slice(0,2).join(`, `)]})]},`r${t}`))})]}),k.price_support.length>0&&(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`report-label`,children:`Support`}),(0,l.jsx)(`ul`,{className:`report-walls`,children:k.price_support.slice(0,4).map((e,t)=>(0,l.jsxs)(`li`,{children:[(0,l.jsx)(`strong`,{className:`pos`,children:u(e.price)}),e.is_star&&(0,l.jsx)(`span`,{className:`king-mark`,children:` ★`}),e.touches>1&&(0,l.jsxs)(`span`,{className:`muted`,children:[` · `,e.touches,` touches`]}),e.tags.length>0&&(0,l.jsxs)(`span`,{className:`muted`,children:[` · `,e.tags.slice(0,2).join(`, `)]})]},`s${t}`))})]})]}),k.confluence.length>0&&(0,l.jsxs)(`div`,{style:{marginTop:10},children:[(0,l.jsx)(`div`,{className:`report-label`,children:`Confluence (price + options)`}),(0,l.jsxs)(`table`,{className:`report-table`,children:[(0,l.jsx)(`thead`,{children:(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`th`,{style:{width:`22%`},children:`Type`}),(0,l.jsx)(`th`,{style:{width:`22%`},children:`Price`}),(0,l.jsx)(`th`,{style:{width:`28%`},children:`Touches`}),(0,l.jsx)(`th`,{style:{width:`28%`},children:`OI`})]})}),(0,l.jsx)(`tbody`,{children:k.confluence.slice(0,5).map((e,t)=>(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`td`,{className:e.type===`resistance`?`neg`:`pos`,children:e.type.toUpperCase()}),(0,l.jsx)(`td`,{className:`num`,children:u(e.price)}),(0,l.jsx)(`td`,{children:e.price_touches}),(0,l.jsxs)(`td`,{children:[(e.options_oi/1e3).toFixed(1),`K`]})]},`cf${t}`))})]})]}),k.void.length>0&&(0,l.jsxs)(`div`,{style:{marginTop:10},children:[(0,l.jsx)(`div`,{className:`report-label`,children:`Void Zones (low-resistance air)`}),(0,l.jsx)(`ul`,{className:`report-walls`,children:k.void.slice(0,3).map((e,t)=>(0,l.jsxs)(`li`,{children:[(0,l.jsxs)(`strong`,{children:[u(e.low),` – `,u(e.high)]}),(0,l.jsxs)(`span`,{className:`muted`,children:[` · `,e.gap_pct.toFixed(1),`% gap`]})]},`v${t}`))})]})]}),!k&&!A&&S&&(0,l.jsx)(`section`,{className:`report-section`,children:(0,l.jsx)(`p`,{className:`report-prose small muted`,children:`Analyst engine + TA levels were still generating when this report rendered. Re-export in 30–60 seconds for the full brief.`})}),(0,l.jsxs)(`footer`,{className:`report-footer`,children:[(0,l.jsxs)(`div`,{children:[`Generated by Alpha Pod · `,C,` · alphapod.com`]}),(0,l.jsx)(`div`,{className:`muted small`,children:`For informational purposes only. Not investment advice. Data may be delayed up to 30 seconds.`})]})]})]})}function y(){return(0,l.jsx)(`style`,{children:`
      .report-root {
        background: #ececec;
        min-height: 100vh;
        padding: 24px 0 80px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #111;
      }
      .report-toolbar {
        max-width: 760px;
        margin: 0 auto 16px;
        padding: 12px 18px;
        background: #fff;
        border: 1px solid #d0d0d0;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        color: #333;
      }
      .report-btn-primary {
        background: #111;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 7px 14px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
      }
      .report-btn-primary:hover { background: #333; }
      .report-btn-secondary {
        background: #fff;
        color: #333;
        border: 1px solid #d0d0d0;
        border-radius: 6px;
        padding: 7px 14px;
        font-size: 13px;
        cursor: pointer;
      }
      .report-page {
        max-width: 760px;
        margin: 0 auto;
        background: #fff;
        padding: 48px 56px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        line-height: 1.5;
      }
      .report-masthead {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        border-bottom: 2px solid #111;
        padding-bottom: 8px;
        margin-bottom: 24px;
      }
      .report-brand {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.18em;
        color: #c9a84c;
      }
      .report-brand-sub {
        font-size: 10px;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.10em;
      }
      .report-title-block {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 24px;
        margin-bottom: 28px;
      }
      .report-ticker {
        font-size: 36px;
        font-weight: 800;
        margin: 0 0 4px;
        letter-spacing: -0.02em;
      }
      .report-company {
        font-size: 14px;
        color: #444;
        margin-bottom: 4px;
      }
      .report-meta {
        font-size: 11px;
        color: #777;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .report-title-right {
        text-align: right;
      }
      .report-price {
        font-size: 28px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        margin-bottom: 4px;
      }
      .report-change { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
      .report-change.pos { color: #1f7a3a; }
      .report-change.neg { color: #b32020; }
      .report-section { margin-bottom: 22px; }
      .avoid-break { break-inside: avoid; page-break-inside: avoid; }
      .report-h2 {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #555;
        border-bottom: 1px solid #d0d0d0;
        padding-bottom: 4px;
        margin: 0 0 10px;
      }
      .report-bias-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;
      }
      .report-pill {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 3px 8px;
        border-radius: 3px;
        border: 1px solid;
      }
      .report-pill.bullish { color: #1f7a3a; background: #e8f5ec; border-color: #b8dcc4; }
      .report-pill.bearish { color: #b32020; background: #fbe8e8; border-color: #e6b8b8; }
      .report-pill.neutral { color: #555; background: #f0f0f0; border-color: #d0d0d0; }
      .report-pill-muted {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #666;
        background: #f4f4f4;
        border: 1px solid #e0e0e0;
        padding: 3px 8px;
        border-radius: 3px;
      }
      .report-pill.conv-high { color: #1f7a3a; background: #e8f5ec; border-color: #b8dcc4; }
      .report-pill.conv-medium { color: #8a6a16; background: #fbf3dc; border-color: #e6d3a3; }
      .report-pill.conv-low { color: #b56b00; background: #fdecd6; border-color: #f0c98c; }
      .report-score { font-size: 12px; color: #444; margin-left: auto; }
      .report-prose { font-size: 13px; color: #222; margin: 0; }
      .report-prose.small { font-size: 12px; }
      .report-price-broken { font-weight: 700; color: #8a6a16; }
      .report-price-stop { font-weight: 700; color: #b32020; }
      .report-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }
      .report-table th {
        text-align: left;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #666;
        padding: 6px 8px 6px 0;
        border-bottom: 1px solid #d0d0d0;
      }
      .report-table td {
        padding: 6px 8px 6px 0;
        border-bottom: 1px solid #ececec;
        vertical-align: top;
      }
      .report-table .num { font-variant-numeric: tabular-nums; font-weight: 600; }
      .report-table .pos { color: #1f7a3a; font-weight: 700; }
      .report-table .neg { color: #b32020; font-weight: 700; }
      .report-table .muted { color: #666; }
      .role-target, .role-first_target { color: #1f7a3a; font-weight: 700; text-transform: uppercase; font-size: 10px; letter-spacing: 0.08em; }
      .role-resistance { color: #b32020; font-weight: 700; text-transform: uppercase; font-size: 10px; letter-spacing: 0.08em; }
      .role-support_lost { color: #8a6a16; font-weight: 700; text-transform: uppercase; font-size: 10px; letter-spacing: 0.08em; }
      .role-thesis_broken { color: #c9a84c; font-weight: 700; text-transform: uppercase; font-size: 10px; letter-spacing: 0.08em; }
      .role-hard_stop { color: #b32020; font-weight: 700; text-transform: uppercase; font-size: 10px; letter-spacing: 0.08em; }
      .king-mark { color: #c9a84c; font-weight: 700; font-size: 10px; letter-spacing: 0.08em; }
      .report-grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }
      .report-label {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.10em;
        text-transform: uppercase;
        color: #666;
        margin-bottom: 4px;
      }
      .report-stat { font-size: 16px; font-weight: 700; font-variant-numeric: tabular-nums; }
      .report-stat .pos { color: #1f7a3a; }
      .report-stat .neg { color: #b32020; }
      .report-stat .muted { color: #666; font-weight: 500; font-size: 13px; }
      .small { font-size: 11px; }
      .muted { color: #666; }
      .pos { color: #1f7a3a; }
      .neg { color: #b32020; }
      .report-walls {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 12px;
      }
      .report-walls li { padding: 2px 0; }
      .ta-role { font-weight: 700; text-transform: uppercase; font-size: 10px; letter-spacing: 0.08em; }
      .ta-red { color: #b32020; }
      .ta-yellow { color: #8a6a16; }
      .ta-green { color: #1f7a3a; }
      .ta-white { color: #444; }
      .ta-conf {
        font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
        padding: 2px 6px; border-radius: 3px; border: 1px solid;
      }
      .ta-conf-high { color: #1f7a3a; background: #e8f5ec; border-color: #b8dcc4; }
      .ta-conf-medium { color: #8a6a16; background: #fbf3dc; border-color: #e6d3a3; }
      .ta-conf-low { color: #666; background: #f0f0f0; border-color: #d0d0d0; }
      .report-h2-sub {
        font-weight: 500; text-transform: none; letter-spacing: 0;
        color: #888; font-size: 10px; margin-left: 6px;
      }
      .ta-body p { margin: 0 0 6px; }
      .ta-body strong { color: #111; }
      .rr-strip {
        display: flex; flex-wrap: wrap; gap: 14px; align-items: baseline;
        padding: 8px 10px; background: #f7f7f5; border: 1px solid #ececec;
        border-radius: 4px; font-size: 12px; margin: 4px 0 8px;
      }
      .rr-leg { color: #444; }
      .rr-ratio { margin-left: auto; }
      .report-footer {
        margin-top: 36px;
        padding-top: 12px;
        border-top: 1px solid #d0d0d0;
        font-size: 11px;
        color: #666;
        text-align: center;
      }

      /* Print stylesheet — this is what makes the saved PDF clean. */
      @media print {
        @page {
          size: Letter;
          margin: 0.5in;
        }
        body, html { background: #fff !important; }
        .report-root {
          background: #fff !important;
          padding: 0 !important;
          min-height: 0;
        }
        .report-page {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .no-print { display: none !important; }
        .report-section { break-inside: avoid; page-break-inside: avoid; }
        .report-table thead { display: table-header-group; }
        .report-table tr { break-inside: avoid; }
      }
    `})}export{v as TickerReportPage};