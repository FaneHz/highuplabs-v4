"use client";

import { ArticleBlock } from "@/content/articles/types";

export default function ArticleRenderer({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-base leading-[1.7] text-[#D4D4D8]">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="text-2xl md:text-3xl font-bold text-white mt-16 mb-6 tracking-tight">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="text-xl font-bold text-white mt-12 mb-4">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3 my-6">
                {block.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[#D4D4D8]">
                    <span className="text-[#CCFF00] font-mono text-sm flex-shrink-0 mt-1">-</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} className="leading-[1.7]" />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-4 my-6">
                {block.items?.map((item, j) => (
                  <li key={j} className="flex gap-4 text-[#D4D4D8]">
                    <span className="text-[#CCFF00] font-mono text-sm font-bold flex-shrink-0">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: item }} className="leading-[1.7]" />
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <div
                key={i}
                className={`my-8 p-6 border-l-2 ${
                  block.tone === "warning" || block.tone === "red"
                    ? "border-[#EF3E36] bg-[#EF3E36]/5"
                    : block.tone === "success" || block.tone === "lime"
                    ? "border-[#CCFF00] bg-[#CCFF00]/5"
                    : "border-[#CCFF00] bg-[#111111]"
                }`}
              >
                {block.title && (
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2 text-[#CCFF00]">
                    {block.title}
                  </div>
                )}
                <p className="text-sm text-[#D4D4D8] leading-relaxed">{block.text}</p>
              </div>
            );
          case "table":
            return (
              <div key={i} className="my-8 overflow-x-auto border border-[#1A1A1A]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1A1A1A] bg-[#111111]">
                      {block.headers?.map((h, j) => (
                        <th key={j} className="text-left p-4 text-[10px] font-mono text-[#CCFF00] uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows?.map((row, j) => (
                      <tr key={j} className="border-b border-[#1A1A1A] last:border-b-0">
                        {row.map((cell, k) => (
                          <td key={k} className="p-4 text-[#D4D4D8]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
