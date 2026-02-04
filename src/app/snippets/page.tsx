"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import MainHeader from "@/components/main-header";
import SnippetSkeleton from "./_components/snippets-skeleton";
import { motion } from "motion/react";
import { BookOpen, Grid, Rows, Search, Tags, X } from "lucide-react";
import Image from "next/image";

export default function Snippets() {
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "rows">("grid");

  if (snippets === undefined) {
    return (
      <div className="h-screen">
        <MainHeader />
        <SnippetSkeleton />
      </div>
    );
  }

  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);
  return (
    <div className="h-screen container mx-auto px-4 sm:px-7 md:px-14 py-3">
      <MainHeader />
      <div className="relative max-w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 text-sm text-gray-400 mt-6 mb-8"
        >
          <BookOpen className="size-4" />
          Community Code Library
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text"
        >
          Discover & Share Code Snippets
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-500 mb-8"
        >
          Explore a curated collection of code snippets from the community
        </motion.p>
      </div>
      <div className="relative max-w-full mx-auto mb-12 space-y-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 hoveR:opacity-1 transition-all duration-500" />
          <div className="relative flex items-center">
            <Search className="absolute  left-4 size-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search snippets by title, language or author"
              className="w-full pl-12 pr-4 py-2 bg-[#1e1e2e]/80 hover:bg-[#1e1e2e] text-white rounded-xl border border-[#313244] hover:border-[#414155] transition-all duration-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        {/* filter */}
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-1 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
              <Tags className="size-4 text-gray-500" />
              <span>Languages</span>
            </div>
            {popularLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLanguage((lang) =>
                    lang === selectedLanguage ? null : lang,
                  );
                }}
                className={`group relative px-3 py-1 rounded-lg transition-all duration-300
                ${selectedLanguage === lang ? "text-blue-400 bg-blue-500/10 ring-2 ring-blue-500/10" : "text-gray-300 bg-[#1e1e2e] hover:text-gray-200 hover:bg-[#262627] ring-1 ring-gray-800"}
              `}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={`/${lang}.png`}
                    alt={lang}
                    height={16}
                    width={16}
                    className="size-4 object-contain"
                  />
                  <span>{lang}</span>
                </div>
              </button>
            ))}
            {selectedLanguage && (
              <button
                type="button"
                onClick={() => setSelectedLanguage(null)}
                className="flex items-center gap-1 px-2 py-1 text0gra-400 hover:text-gray-300"
              >
                <X className="size-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span>snippets found</span>

            <div className="flex items-center gap-1 p-1 b-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
              <button
                onClick={() => setView("grid")}
                className={`p-1 rounded-md transition-all
                    ${
                      view === "grid"
                        ? "bg-blue-500/50 text-blue-400"
                        : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                    }
                  `}
              >
                <Grid className="size-4" />
              </button>
              <button
                onClick={() => setView("rows")}
                className={`p-1 rounded-md transition-all
                  ${
                    view === "rows"
                      ? "bg-blue-500/50 text-blue-400"
                      : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                  }
                  `}
              >
                <Rows className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
