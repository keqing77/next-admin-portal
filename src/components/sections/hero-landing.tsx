"use client";

import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "@/components/link/link";
import { Icons } from "@/components/shared/icons";
import { motion } from "motion/react";

export default function HeroLanding() {
  return (
    <motion.section
      className="space-y-6 py-12 sm:py-20 lg:py-24 mx-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <motion.h1
          className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className=" font-extrabold">
            A powerful portal for GenAI platform :{/* <span> */}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              {" Admin Portal"}
            </span>
          </span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat
          earum similique perferendis adipisci modi.
        </motion.p>

        <motion.div
          className="flex justify-center space-x-2 md:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href={`/dashboard`}
            // prefetch={true}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2"
            )}
          >
            <span>Start</span>
            <Icons.arrowRight className="size-4" />
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                rounded: "full",
              }),
              "px-5"
            )}
          >
            <Icons.gitHub className="mr-2 size-4" />
            <p>
              <span className="hidden sm:inline-block"></span> GitHub
            </p>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
