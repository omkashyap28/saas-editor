"use client";

import { useState } from "react";
import EditorPanel from "../../components/editor-panel";
import OutputPanel from "../../components/output-panel";

export default function Home() {
  const [active, setActive] = useState<"editor" | "output">("editor");

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col max-w-350 mx-auto overflow-hidden">
      {/* Mobile Toggle */}
      <div className="md:hidden flex gap-2 p-2">
        <button
          onClick={() => setActive("editor")}
          className={`flex-1 py-2 rounded font-medium transition ${
            active === "editor"
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-zinc-300"
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setActive("output")}
          className={`flex-1 py-2 rounded font-medium transition ${
            active === "output"
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-zinc-300"
          }`}
        >
          Output
        </button>
      </div>

      {/* VIEWPORT */}
      <div className="relative flex-1 overflow-hidden">
        {/* SLIDER TRACK */}
        <div
          className={`
            flex h-full transition-transform duration-300 ease-in-out
            ${active === "editor" ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          {/* Editor */}
          <div className="w-full md:w-1/2 h-full min-h-0 shrink-0 overflow-auto">
            <EditorPanel setActive={setActive} />
          </div>

          {/* Output */}
          <div className="w-full md:w-1/2 h-full min-h-0 shrink-0 overflow-auto">
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
