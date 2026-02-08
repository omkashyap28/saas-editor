"use client";
import { LANGUAGE_CONFIG, defineMonacoThemes } from "@/constants";
import { useEditorStore } from "@/store/useEditorStore";
import { useClerk } from "@clerk/nextjs";
import { Editor } from "@monaco-editor/react";
import { RotateCcwIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { EditorPanelSkeleton } from "./editor-panel-skeleton";
import useMounted from "@/hooks/useMounted";
import SettingDialogueBox from "../app/(root)/_components/settings-dialoge-box";
import LanguageSelector from "@/app/(root)/_components/language-selector";
import useConvexUser from "@/hooks/getConvexUser";
import RunButton from "@/app/(root)/_components/run-btn";
import ShareButton from "./share-btn";

export default function EditorPanel({
  setActive,
}: {
  setActive: (active: "editor" | "output") => void;
}) {
  const clerk = useClerk();

  const mounted = useMounted();
  const language = useEditorStore((state) => state.language);
  const fontSize = useEditorStore((state) => state.fontSize);
  const wordWrap = useEditorStore((state) => state.wordWrap);
  const theme = useEditorStore((state) => state.theme);
  const editor = useEditorStore((state) => state.editor);
  const setEditor = useEditorStore((state) => state.setEditor);
  const convexUser = useConvexUser();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  if (!mounted) return null;
  return (
    <div className="w-full h-full flex flex-col min-h-0">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/5 py-4 sm:px-4 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 max-sm:px-4 shrink-0">
          <div className="flex items-center gap-3">
            <LanguageSelector hasAccess={convexUser?.isPro} />
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="size-4 text-gray-400" />
            </motion.button>

            <ShareButton />
            <SettingDialogueBox />
            <RunButton setActive={setActive} />
          </div>
        </div>

        {/* Editor Container */}
        <div className="flex-1 min-h-0 rounded-xl overflow-hidden ring-1 ring-white/5">
          {clerk.loaded ? (
            <Editor
              height="100%"
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize,
                wordWrap,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
          ) : (
            <EditorPanelSkeleton />
          )}
        </div>
      </div>
    </div>
  );
}
