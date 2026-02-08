import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyBtn from "../app/snippets/[id]/_components/copy-btn";
import Image from "next/image";

export default function CodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const trimmedCode = code
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  return (
    <div className="my-4 bg-[#0a0a0f] rounded-lg overflow-hidden border border-[#ffffff0a]">
      {/* header bar showing language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#ffffff08]">
        {/* language indicator with icon */}
        <div className="flex items-center gap-2">
          <Image
            src={`/${language}.png`}
            alt={language}
            className="size-4 object-contain"
            height={16}
            width={16}
          />
          <span className="text-sm text-gray-400">
            {language || "plaintext"}
          </span>
        </div>
        <CopyBtn code={trimmedCode} />
      </div>

      <div className="relative max-h-102 overflow-y-auto">
        <SyntaxHighlighter
          language={language || "plaintext"}
          style={atomOneDark}
          customStyle={{
            padding: "1rem",
            background: "transparent",
            margin: 0,
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {trimmedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
