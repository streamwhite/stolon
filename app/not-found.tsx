import { NotFoundState } from "@/components/feedback/not-found-state";
import { PageContainer } from "@/components/layout/page-container";

export default function NotFound() {
  return (
    <PageContainer className="flex min-h-svh items-center">
      <NotFoundState className="w-full max-w-lg" />
    </PageContainer>
  );
}
