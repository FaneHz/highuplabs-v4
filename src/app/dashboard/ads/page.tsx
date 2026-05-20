import { AdsTable } from "@/components/dashboard/AdsTable";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function AdsPage() {
  return (
    <div className="p-8">
      <ErrorBoundary>
        <AdsTable />
      </ErrorBoundary>
    </div>
  );
}
