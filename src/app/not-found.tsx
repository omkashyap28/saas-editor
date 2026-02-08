"use client";

import { MoveLeft } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-125">
      <div className="flex justify-center max-w-4xl w-full">
        <div>
          <h1 className="text-4xl text-neutral-400 tracking-tight mb-2">
            404 | Page Not found
          </h1>
          <p className="mb-5">
            Page your are trying to access is not found. Please go back!!
          </p>
          <motion.button
            onClick={() => router.back()}
            className="flex gap-2 items-center text-lg ring-1 ring-neutral-600/50 rounded-md px-4 py-1 text-gray-400"
          >
            <MoveLeft className="size-4" />
            Go back
          </motion.button>
        </div>
      </div>
    </div>
  );
}
