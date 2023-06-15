import ProductListSection from "@/components/section/ProductListSection";
import HomePageHero from "@components/hero/HomePageHero";

export default function Home() {
  return (
    <div className="min-h-screen h-full ">
      
        <div className="flex flex-col space-y-8">
        <HomePageHero />
        <ProductListSection />
        </div>
    </div>
  )
}
