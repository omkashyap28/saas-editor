"use client";

import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import SnippetLoadingSkeleton from "./_components/snippet-loading-skeleton";
import Image from "next/image";
import { Clock, MessageSquare, User } from "lucide-react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/constants";
import { Editor } from "@monaco-editor/react";
import CopyBtn from "./_components/copy-btn";
import { useEditorStore } from "@/store/useEditorStore";
import Comments from "./_components/comments";

export default function SnippetsDetailsPage() {
  const snippetId = useParams().id;
  const theme = useEditorStore((state) => state.theme);
  const fontSize = useEditorStore((state) => state.fontSize);

  const snippet = useQuery(api.snippets.getSippetById, {
    snippetId: snippetId as Id<"snippets">,
  });

  const comments = useQuery(api.snippets.getSnippetsComments, {
    snippetId: snippetId as Id<"snippets">,
  });

  if (snippet === undefined) return <SnippetLoadingSkeleton />;

  return (
    <main className="max-w-300 mx-auto py-4">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white mb-1">
          {snippet.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-1 text-[#8b8b8d]">
            <User className="w-4 h-4" />
            <span>{snippet.userName}</span>
          </div>
          <div className="flex items-center gap-1 text-[#8b8b8d]">
            <Clock className="w-4 h-4" />
            <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 text-[#8b8b8d]">
            <MessageSquare className="w-4 h-4" />
            <span>{comments?.length} comments</span>
          </div>
        </div>
      </div>
      <div className="max-w-300 mx-auto">
        {/* Code Editor */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
            <div className=" rounded overflow-hidden">
              <Image
                src={`/${snippet.language}.png`}
                alt={`${snippet.language} logo`}
                height={32}
                width={32}
                className="size-8 aspect-square"
              />
            </div>
            <div className="flex gap-3 items-center">
              <CopyBtn code={snippet.code} />
            </div>
          </div>
          <Editor
            height="56vh"
            language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
            value={snippet.code}
            theme={theme}
            beforeMount={defineMonacoThemes}
            options={{
              minimap: { enabled: false },
              fontSize,
              readOnly: true,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              padding: { top: 16 },
              renderWhitespace: "selection",
              fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
              fontLigatures: true,
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
            }}
          />
        </div>

        <Comments snippetId={snippet._id} />
      </div>
    </main>
  );
}
