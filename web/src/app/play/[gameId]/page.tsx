import { HomeCard } from "@/components/card/HomeCard";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-brand">
      <Header />
      <HomeCard />
      <Footer />
    </main>
  );
}
