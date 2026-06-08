import { ContactSection } from "@/components/modules/home/ContactSection";
import Hero from "@/components/modules/home/Hero";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sheba Lab - AI-Powered Healthcare Platform</title>
        <meta name="description" content="Find the right doctor for your health needs with Sheba Lab's AI-powered healthcare platform. Book appointments, manage medical records, and experience the future of healthcare." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <ContactSection />
      </main>
    </>
  );
}
