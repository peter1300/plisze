import { ColorSizeSection } from "../components/ColorSizeSection";
import { Configurator } from "../components/Configurator";
import { FAQ } from "../components/FAQ";
import { Gallery } from "../components/Gallery";
import { Hero } from "../components/Hero";
import { MadeToMeasure } from "../components/MadeToMeasure";
import { MeasurementGuide } from "../components/MeasurementGuide";
import { OrderSteps } from "../components/OrderSteps";
import { PlacementCards } from "../components/PlacementCards";
import { PleatedDemo } from "../components/PleatedDemo";
import { ProductDetail } from "../components/ProductDetail";
import { ProofStats } from "../components/ProofStats";
import { QuoteCTA } from "../components/QuoteCTA";
import { WhyPleated } from "../components/WhyPleated";

export function HomePage() {
  return (
    <>
      <Hero />
      <PlacementCards />
      <WhyPleated />
      <ProductDetail />
      <ProofStats />
      <OrderSteps />
      <MadeToMeasure />
      <Gallery />
      <Configurator />
      <PleatedDemo />
      <ColorSizeSection />
      <MeasurementGuide />
      <QuoteCTA />
      <FAQ />
    </>
  );
}
