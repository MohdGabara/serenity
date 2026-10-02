import SerenityApp from "@/components/SerenityApp";
export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SerenityApp locale={locale === "de" || locale === "ar" ? locale : "en"} />;
}
