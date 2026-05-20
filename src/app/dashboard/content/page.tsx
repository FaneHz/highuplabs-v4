import { ContentGenerator } from "@/components/dashboard/ContentGenerator";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function ContentPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-mono uppercase tracking-tight text-gray-900">
          Content Generator
        </h1>
        <p className="mt-2 text-sm text-gray-500 font-mono">
          Generează postări optimizate pentru social media în câteva secunde.
        </p>
      </div>

      <ErrorBoundary>
        <ContentGenerator />
      </ErrorBoundary>
    </div>
  );
}
