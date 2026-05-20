import { VideoScriptGenerator } from "@/components/dashboard/VideoScriptGenerator";
import { SocialMediaStrategist } from "@/components/dashboard/SocialMediaStrategist";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";

export default async function SocialPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold font-mono uppercase tracking-tight text-gray-900">
          Social Media Studio
        </h1>
        <p className="mt-2 text-sm text-gray-500 font-mono">
          Generează scripturi video și strategii sociale cu AI.
        </p>
      </div>

      {/* Video Script Generator */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-gray-900">
            Video Script Generator
          </h2>
          <p className="mt-1 text-sm text-gray-500 font-mono">
            Creează scripturi video structurate cu direcții vizuale și audio.
          </p>
        </div>
        <ErrorBoundary>
          <VideoScriptGenerator />
        </ErrorBoundary>
      </section>

      {/* Social Media Strategist */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-bold font-mono uppercase tracking-tight text-gray-900">
            Social Media Strategist
          </h2>
          <p className="mt-1 text-sm text-gray-500 font-mono">
            Generează strategii complete de 30 de zile cu calendar de conținut.
          </p>
        </div>
        <ErrorBoundary>
          <SocialMediaStrategist />
        </ErrorBoundary>
      </section>
    </div>
  );
}
