export type Currency = "USD" | "EUR" | "SAR" | "EGP" | "GBP";
export type Experience = {
  id: string; slug: string; title: string; city: string; category: string; duration: string;
  basePriceCents: number; image: string; excerpt: string; featured?: boolean; capacity: number;
  startsAt: string; published: boolean; supplierAuthorizedMedia: boolean;
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=82`;

export const experiences: Experience[] = [
  { id:"hrg-orange", slug:"orange-bay", title:"Orange Bay Island Escape", city:"Hurghada", category:"Sea", duration:"8 hours", basePriceCents:4000, image:img("photo-1507525428034-b723cf961d3e"), excerpt:"A full day of turquoise water, gentle reefs, and unhurried island time.", featured:true, capacity:24, startsAt:"08:00", published:true, supplierAuthorizedMedia:false },
  { id:"hrg-luxor", slug:"luxor-from-hurghada", title:"Luxor, Valley of the Kings & Karnak", city:"Hurghada", category:"History", duration:"16 hours", basePriceCents:6900, image:img("photo-1568322445389-f64ac2515020"), excerpt:"A guided journey from the Red Sea to ancient Thebes.", capacity:18, startsAt:"05:00", published:true, supplierAuthorizedMedia:false },
  { id:"hrg-quad", slug:"desert-quad-safari", title:"Desert Quad & Bedouin Sunset", city:"Hurghada", category:"Adventure", duration:"3 hours", basePriceCents:3500, image:img("photo-1548013146-72479768bada"), excerpt:"Ride through the Eastern Desert as the light turns gold.", featured:true, capacity:20, startsAt:"15:30", published:true, supplierAuthorizedMedia:false },
  { id:"hrg-dolphin", slug:"dolphin-house", title:"Dolphin House Snorkeling", city:"Hurghada", category:"Sea", duration:"7 hours", basePriceCents:3700, image:img("photo-1544551763-46a013bb70d5"), excerpt:"A Red Sea day with reefs, lunch, and wild-dolphin waters.", featured:true, capacity:28, startsAt:"08:00", published:true, supplierAuthorizedMedia:false },
  { id:"cai-giza", slug:"giza-pyramids", title:"Giza Pyramids, Sphinx & Museum", city:"Cairo", category:"History", duration:"8 hours", basePriceCents:9200, image:img("photo-1539650116574-75c0c6d73f6e"), excerpt:"The essential first chapter of an Egypt story.", featured:true, capacity:12, startsAt:"08:30", published:true, supplierAuthorizedMedia:false },
  { id:"cai-saqqara", slug:"saqqara-memphis", title:"Pyramids, Saqqara & Memphis", city:"Cairo", category:"History", duration:"8 hours", basePriceCents:8600, image:img("photo-1562679299-266ed893e45d"), excerpt:"See the evolution of the pyramid across Egypt's oldest capital.", capacity:12, startsAt:"08:30", published:true, supplierAuthorizedMedia:false },
  { id:"cai-gem", slug:"gem-citadel", title:"Grand Egyptian Museum & Citadel", city:"Cairo", category:"Culture", duration:"8 hours", basePriceCents:10400, image:img("photo-1524492412937-b28074a5d7da"), excerpt:"A modern museum day with a panoramic Cairo finale.", capacity:14, startsAt:"09:00", published:true, supplierAuthorizedMedia:false },
  { id:"cai-nile", slug:"nile-dinner-cruise", title:"Nile Dinner Cruise", city:"Cairo", category:"Romance", duration:"3 hours", basePriceCents:5800, image:img("photo-1544986581-efac024faf62"), excerpt:"Dinner, Tanoura, and Cairo lights reflected on the Nile.", capacity:30, startsAt:"19:00", published:true, supplierAuthorizedMedia:false },
  { id:"maa-sataya", slug:"sataya-dolphin-reef", title:"Sataya Dolphin Reef", city:"Marsa Alam", category:"Sea", duration:"9 hours", basePriceCents:6900, image:img("photo-1473116763249-2faaef81ccda"), excerpt:"A long, luminous day at the deep-south dolphin reef.", featured:true, capacity:20, startsAt:"06:30", published:true, supplierAuthorizedMedia:false },
  { id:"maa-abu", slug:"abu-dabbab", title:"Abu Dabbab Turtle Bay", city:"Marsa Alam", category:"Sea", duration:"6 hours", basePriceCents:5800, image:img("photo-1546026423-cc4642628d2b"), excerpt:"Snorkel calm seagrass waters known for turtles and dugongs.", capacity:16, startsAt:"08:00", published:true, supplierAuthorizedMedia:false },
  { id:"maa-wadi", slug:"wadi-el-gemal", title:"Wadi El Gemal 4x4 Safari", city:"Marsa Alam", category:"Adventure", duration:"7 hours", basePriceCents:8100, image:img("photo-1518684079-3c830dcef090"), excerpt:"A desert-and-coast safari with tea beneath an open sky.", capacity:12, startsAt:"11:00", published:true, supplierAuthorizedMedia:false },
  { id:"maa-luxor", slug:"luxor-road-trip", title:"Luxor Full-Day Road Journey", city:"Marsa Alam", category:"History", duration:"16 hours", basePriceCents:12700, image:img("photo-1553913861-c0fddf2619ee"), excerpt:"A full-day historic crossing from the coast to Luxor.", capacity:16, startsAt:"04:30", published:true, supplierAuthorizedMedia:false },
  { id:"ssh-ras", slug:"ras-mohammed", title:"Ras Mohammed & White Island", city:"Sharm El Sheikh", category:"Sea", duration:"8 hours", basePriceCents:4000, image:img("photo-1510414842594-a61c69b5ae57"), excerpt:"Sail to vivid reef walls and a shifting white sandbank.", featured:true, capacity:24, startsAt:"08:00", published:true, supplierAuthorizedMedia:false },
  { id:"ssh-sinai", slug:"mount-sinai", title:"Mount Sinai Sunrise", city:"Sharm El Sheikh", category:"Adventure", duration:"14 hours", basePriceCents:4600, image:img("photo-1539650116574-75c0c6d73f6e"), excerpt:"A night ascent, an unforgettable sunrise, and St Catherine's.", capacity:15, startsAt:"23:00", published:true, supplierAuthorizedMedia:false },
  { id:"ssh-canyon", slug:"coloured-canyon", title:"Coloured Canyon & Blue Hole", city:"Sharm El Sheikh", category:"Adventure", duration:"9 hours", basePriceCents:5200, image:img("photo-1500534623283-312aade485b7"), excerpt:"A rugged Sinai drive followed by the Blue Hole's clear water.", capacity:12, startsAt:"07:00", published:true, supplierAuthorizedMedia:false },
  { id:"ssh-tiran", slug:"tiran-island", title:"Tiran Island Snorkeling", city:"Sharm El Sheikh", category:"Sea", duration:"8 hours", basePriceCents:3500, image:img("photo-1500375592092-40eb2168fd21"), excerpt:"A yacht day exploring the famous reefs of the Straits of Tiran.", capacity:25, startsAt:"08:00", published:true, supplierAuthorizedMedia:false },
];

export const packages = [
  ["Cairo Short Break", 5, 83900], ["Cairo & Alexandria", 5, 57500], ["Cairo & Desert Adventure", 6, 132200], ["Cairo, Cruise & Hurghada", 8, 159800], ["Iconic Egypt with Nile Cruise", 7, 193800],
].map(([title, days, basePriceCents], index) => ({ id:`pkg-${index + 1}`, title, days, basePriceCents, published:true }));

export const fxRates: Record<Currency, number> = { USD: 1, EUR: .92, SAR: 3.75, EGP: 50.5, GBP: .78 };
export const currencies: Currency[] = ["USD", "EUR", "SAR", "EGP", "GBP"];
export const priceWithMarkup = (basePriceCents: number, markup = .1) => Math.round(basePriceCents * (1 + markup));
