"use client";

import Image from "next/image";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { motion } from "motion/react";

export default function PreviewLanding() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-6 sm:pb-16 mx-auto"
    >
      <MaxWidthWrapper>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl md:bg-muted/30 md:p-3.5 md:ring-1 md:ring-inset md:ring-border"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl border md:rounded-lg">
            <Image
              className="size-full object-cover object-center dark:opacity-85 dark:invert"
              src="/post.jpg"
              alt={"imageAlt"}
              width={2000}
              height={1000}
              priority={true}
            />
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </motion.div>
  );
}
