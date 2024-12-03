import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/site-footer";
import Powered from "@/components/sections/powered";
import { setRequestLocale } from "next-intl/server";
import Features from "@/components/sections/features";
import PreviewLanding from "@/components/sections/preview-landing";
import HeroLanding from "@/components/sections/hero-landing";
import Testimonials from "@/components/sections/testimonials";
import BentoGrid from "@/components/sections/bentogrid";

export default function LandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <HeroLanding />
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}
