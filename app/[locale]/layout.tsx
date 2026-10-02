export function generateStaticParams() { return [{ locale: "en" }, { locale: "de" }, { locale: "ar" }]; }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const rtl = locale === "ar";
  return <div lang={locale} dir={rtl ? "rtl" : "ltr"}>{children}</div>;
}
