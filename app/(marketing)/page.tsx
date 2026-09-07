import { PageContainer } from "@/components/layout/page-container";
import { getTranslations } from "@/lib/i18n/server";

export default async function HomePage() {
  const common = await getTranslations("common");

  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {common("appName")}
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Next.js · TypeScript · Tailwind CSS v4 · shadcn/ui · i18next · React
          Hook Form · Zod · Vitest · Playwright
        </p>
      </div>
    </PageContainer>
  );
}
