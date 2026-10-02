"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { currencies, experiences, fxRates, priceWithMarkup, type Currency, type Experience } from "@/lib/catalog";
import { isBookable } from "@/lib/booking";

type Locale = "en" | "de" | "ar";
type Day = { id: string; experienceId: string; date: string };
const copy = {
  en: { explore:"Explore Egypt", build:"Build my trip", scroll:"Scroll Egypt", hero:"DON’T JUST VISIT EGYPT.", story:"BUILD YOUR OWN STORY.", sub:"Watch the moments. Choose the experiences. Make Egypt yours.", day:"Day", add:"Add a day", change:"Change", keep:"Keep this experience", travelers:"Travelers", adults:"Adults", dates:"Travel dates", checkout:"Review & pay", admin:"Admin", total:"Your story", available:"Available", sold:"Unavailable", discover:"Discover experiences", back:"Back to story", choose:"Choose experience" },
  de: { explore:"Ägypten entdecken", build:"Reise planen", scroll:"Ägypten entdecken", hero:"BESUCHE ÄGYPTEN NICHT NUR.", story:"SCHREIBE DEINE EIGENE GESCHICHTE.", sub:"Erlebe die Momente. Wähle deine Erlebnisse. Mache Ägypten zu deinem.", day:"Tag", add:"Tag hinzufügen", change:"Ändern", keep:"Dieses Erlebnis behalten", travelers:"Reisende", adults:"Erwachsene", dates:"Reisedaten", checkout:"Prüfen & bezahlen", admin:"Admin", total:"Deine Geschichte", available:"Verfügbar", sold:"Nicht verfügbar", discover:"Erlebnisse entdecken", back:"Zurück zur Reise", choose:"Erlebnis wählen" },
  ar: { explore:"اكتشف مصر", build:"ابنِ رحلتك", scroll:"تصفح مصر", hero:"لا تزُر مصر فقط.", story:"اصنع قصتك الخاصة.", sub:"شاهد اللحظات. اختر التجارب. اجعل مصر رحلتك.", day:"اليوم", add:"أضف يوماً", change:"تغيير", keep:"احتفظ بهذه التجربة", travelers:"المسافرون", adults:"البالغون", dates:"تواريخ السفر", checkout:"مراجعة ودفع", admin:"الإدارة", total:"قصتك", available:"متاح", sold:"غير متاح", discover:"اكتشف التجارب", back:"العودة إلى الرحلة", choose:"اختر التجربة" },
} satisfies Record<Locale, Record<string, string>>;

const money = (cents: number, currency: Currency, locale: Locale) => new Intl.NumberFormat(locale === "ar" ? "ar-EG" : locale, { style:"currency", currency, maximumFractionDigits: 0 }).format(cents / 100);
const dateFor = (start: string, offset: number) => { const date = new Date(`${start}T12:00:00`); date.setDate(date.getDate() + offset); return date.toISOString().slice(0,10); };

function ReelCard({ experience, onAdd }: { experience: Experience; onAdd: (experience: Experience) => void }) {
  const selling = priceWithMarkup(experience.basePriceCents);
  return <article className="reel-card">
    <Image src={experience.image} alt="" fill sizes="(max-width: 700px) 80vw, 320px" className="cover" />
    <div className="reel-shade" />
    <span className="reel-play">▶</span><span className="reel-label">REEL READY</span>
    <div className="reel-copy"><p>{experience.city} · {experience.duration}</p><h3>{experience.title}</h3><div><strong>{money(selling, "USD", "en")}</strong><button onClick={() => onAdd(experience)}>+ Add</button></div></div>
  </article>;
}

export default function SerenityApp({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [screen, setScreen] = useState<"home"|"scroll"|"builder"|"admin"|"checkout">("home");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [startDate, setStartDate] = useState("2026-10-15");
  const [adults, setAdults] = useState(2);
  const [days, setDays] = useState<Day[]>([
    {id:"d1",experienceId:"hrg-orange",date:"2026-10-15"}, {id:"d2",experienceId:"hrg-dolphin",date:"2026-10-16"}, {id:"d3",experienceId:"hrg-quad",date:"2026-10-17"}, {id:"d4",experienceId:"hrg-luxor",date:"2026-10-18"},
  ]);
  const [picker, setPicker] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const quote = useMemo(() => {
    const totalUsdCents = days.reduce((sum, day) => { const exp = experiences.find(x => x.id === day.experienceId); return sum + (exp ? priceWithMarkup(exp.basePriceCents) * adults : 0); }, 0);
    return { totalUsdCents, display: Math.round(totalUsdCents * fxRates[currency]) };
  }, [days, adults, currency]);
  const goBuilder = () => setScreen("builder");
  const updateStart = (value: string) => { setStartDate(value); setDays(old => old.map((day, index) => ({ ...day, date: dateFor(value,index) }))); };
  const replace = (dayId: string, experienceId: string) => { setDays(old => old.map(d => d.id === dayId ? {...d,experienceId} : d)); setPicker(null); };
  const addExperience = (experience: Experience) => { const date = dateFor(startDate, days.length); setDays(old => [...old,{id:`d${Date.now()}`,experienceId:experience.id,date}]); setScreen("builder"); };
  const addDay = () => { const date = dateFor(startDate, days.length); setDays(old => [...old,{id:`d${Date.now()}`,experienceId:"hrg-orange",date}]); };
  const checkout = () => {
    const invalid = days.some(d => !isBookable(d.date,d.experienceId,adults));
    if (invalid) { setNotice("One or more experiences is unavailable on its selected date. Change the day before checkout."); return; }
    setScreen("checkout"); setNotice("");
  };

  return <main>
    <header className="topbar"><button className="brand" onClick={() => setScreen("home")}><Image src="/brand/serenity-logo.png" alt="Serenity Secrets" width={48} height={48}/><span>Serenity<br/><em>Secrets</em></span></button><nav><button onClick={() => setScreen("scroll")}>{t.scroll}</button><button onClick={goBuilder}>{t.build}</button><button onClick={() => setScreen("admin")}>{t.admin}</button></nav><div className="selectors"><select aria-label="Language" value={locale} onChange={e => window.location.href = `/${e.target.value}`}><option value="en">EN</option><option value="de">DE</option><option value="ar">العربية</option></select><select aria-label="Currency" value={currency} onChange={e => setCurrency(e.target.value as Currency)}>{currencies.map(c => <option key={c}>{c}</option>)}</select></div></header>

    {screen === "home" && <>
      <section className="hero"><Image src="https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1800&q=85" fill priority alt="Egyptian temple at sunset" className="cover"/><div className="hero-vignette"/><div className="hero-text"><p className="eyebrow">SERENITY SECRETS TOURS</p><h1>{t.hero}<br/><i>{t.story}</i></h1><p>{t.sub}</p><div className="hero-actions"><button className="primary" onClick={goBuilder}>{t.build} <span>→</span></button><button className="ghost" onClick={() => setScreen("scroll")}>{t.scroll}</button></div></div><div className="hero-note">Scroll to feel Egypt <b>↓</b></div></section>
      <section className="intro"><p className="eyebrow">SEE IT. BUILD IT. LIVE IT.</p><h2>Egypt, beyond the postcard.</h2><p>Curated days, real availability, and a story that is completely your own.</p></section>
      <section className="feature-grid"><div className="feature-card" onClick={() => setScreen("scroll")}><span>01</span><h2>{t.scroll}</h2><p>Let one visual moment lead to the next.</p></div><div className="feature-card dark" onClick={goBuilder}><span>02</span><h2>{t.build}</h2><p>Shape every day around exactly what you love.</p></div></section>
    </>}

    {screen === "scroll" && <section className="discovery"><div className="page-heading"><p className="eyebrow">IMMERSIVE DISCOVERY</p><h1>{t.scroll}</h1><p>{t.discover}. Every card is ready for your approved Reel upload.</p></div><div className="reel-grid">{experiences.filter(e => e.featured).concat(experiences.filter(e => !e.featured)).map(e => <ReelCard key={e.id} experience={e} onAdd={addExperience}/>)}</div><button className="floating-story" onClick={goBuilder}>{t.total}<strong>{money(quote.display,currency,locale)}</strong><span>→</span></button></section>}

    {screen === "builder" && <section className="builder"><div className="builder-main"><div className="page-heading compact"><p className="eyebrow">YOUR EGYPT STORY</p><h1>{t.build}</h1></div><div className="trip-controls"><label>{t.dates}<input type="date" value={startDate} onChange={e=>updateStart(e.target.value)}/></label><label>{t.travelers}<div className="stepper"><button onClick={()=>setAdults(Math.max(1,adults-1))}>−</button><b>{adults} {t.adults}</b><button onClick={()=>setAdults(adults+1)}>+</button></div></label></div>
      <div className="itinerary">{days.map((day,index) => { const exp=experiences.find(e=>e.id===day.experienceId)!; const available=isBookable(day.date, exp.id, adults); return <article className="day-card" key={day.id}><div className="day-number"><span>{t.day} {index+1}</span><time>{new Date(`${day.date}T12:00:00`).toLocaleDateString(locale,{weekday:"short",month:"short",day:"numeric"})}</time></div><div className="day-media"><Image src={exp.image} alt="" fill sizes="(max-width: 700px) 100vw, 460px" className="cover"/><span>▶</span></div><div className="day-detail"><p className={`availability ${available ? "yes" : "no"}`}>{available?t.available:t.sold}</p><h2>{exp.title}</h2><p>{exp.city} · {exp.duration} · {exp.startsAt} start</p><p className="description">{exp.excerpt}</p><strong>{money(Math.round(priceWithMarkup(exp.basePriceCents)*fxRates[currency]),currency,locale)} <small>/ person</small></strong><div><button className="text-button" onClick={()=>setPicker(day.id)}>{t.change} →</button><button className="remove" aria-label="Remove day" onClick={()=>setDays(old=>old.filter(d=>d.id!==day.id))}>×</button></div></div></article>})}</div><button className="add-day" onClick={addDay}>+ {t.add}</button></div>
      <aside className="summary"><p className="eyebrow">{t.total}</p><h2>{days.length} days in Egypt</h2><div>{days.map((d,i)=>{const e=experiences.find(x=>x.id===d.experienceId)!;return <p key={d.id}><span>{i+1}. {e.title}</span><b>{money(Math.round(priceWithMarkup(e.basePriceCents)*adults*fxRates[currency]),currency,locale)}</b></p>})}</div><p className="rate-note">Live display rate · Checkout charged in USD</p><strong className="grand">{money(quote.display,currency,locale)}</strong><button className="primary full" onClick={checkout}>{t.checkout} →</button>{notice && <p className="alert">{notice}</p>}</aside></section>}

    {picker && <div className="modal-backdrop" onClick={()=>setPicker(null)}><section className="picker" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setPicker(null)}>×</button><p className="eyebrow">{t.choose}</p><h2>Change this chapter</h2><div className="picker-list">{experiences.map(e=><button key={e.id} onClick={()=>replace(picker,e.id)}><Image src={e.image} alt="" width={84} height={64}/><span><b>{e.title}</b><small>{e.city} · {e.duration}</small></span><strong>{money(Math.round(priceWithMarkup(e.basePriceCents)*fxRates[currency]),currency,locale)}</strong></button>)}</div></section></div>}

    {screen === "checkout" && <section className="checkout"><div><p className="eyebrow">REVIEW YOUR EGYPT STORY</p><h1>Your journey is nearly yours.</h1><p>We recheck every date, capacity, price, and traveler count before payment.</p><div className="checkout-lines">{days.map((d,i)=>{const e=experiences.find(x=>x.id===d.experienceId)!;return <p key={d.id}><span>{i+1}. {e.title}<small>{d.date} · {adults} adults</small></span><b>{money(Math.round(priceWithMarkup(e.basePriceCents)*adults*fxRates[currency]),currency,locale)}</b></p>})}</div><div className="payment-box"><b>Secure test checkout</b><p>Your chosen provider will be connected here. For now, the test adapter confirms a USD booking only after server-side validation.</p><button className="primary" onClick={()=>{setNotice("Test booking confirmed. Your voucher is ready in the admin preview.");setScreen("builder")}}>Confirm test booking →</button></div></div><aside className="summary"><p className="eyebrow">TOTAL</p><strong className="grand">{money(quote.display,currency,locale)}</strong><p>Displayed in {currency}; charged in USD until the live gateway is enabled.</p></aside></section>}

    {screen === "admin" && <section className="admin"><div className="page-heading"><p className="eyebrow">SERENITY OPERATIONS</p><h1>Control what guests see.</h1><p>A production-shaped dashboard preview. Connect Supabase credentials to persist these controls.</p></div><div className="admin-grid"><article><span>16</span><p>Published experiences</p></article><article><span>10%</span><p>Global markup</p></article><article><span>24</span><p>Available dates this month</p></article><article><span>0</span><p>Confirmed test bookings</p></article></div><section className="admin-panel"><div><h2>Experience availability</h2><p>Dolphin House Snorkeling · October 2026</p></div><div className="calendar">{Array.from({length:28},(_,i)=><button className={(i+1)%7===0?"blocked":"open"} key={i}><b>{i+1}</b><small>{(i+1)%7===0?"Blocked":"24 seats"}</small></button>)}</div><div className="admin-actions"><button>Open date range</button><button>Set recurring rule</button><button>Override price</button><button>Upload Reel</button></div></section></section>}
  </main>;
}
