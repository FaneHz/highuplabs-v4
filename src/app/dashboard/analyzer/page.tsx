import { WebsiteAnalyzer } from "@/components/dashboard/WebsiteAnalyzer";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function AnalyzerPage() {
  return (
    <div className="p-8">
      <ErrorBoundary>
        <WebsiteAnalyzer />
      </ErrorBoundary>
    </div>
  );
}