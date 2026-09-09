import { ColorSizeSection } from "../components/ColorSizeSection";
import { Configurator } from "../components/Configurator";
import { FAQ } from "../components/FAQ";
import { Gallery } from "../components/Gallery";
import { Hero } from "../components/Hero";
import { MadeToMeasure } from "../components/MadeToMeasure";
import { MeasurementGuide } from "../components/MeasurementGuide";
import { OrderSteps } from "../components/OrderSteps";
import { PleatedDemo } from "../components/PleatedDemo";
import { ProductDetail } from "../components/ProductDetail";
import { WhyPleated } from "../components/WhyPleated";

export function HomePage() {
  return (
    <>
      <Hero />
      <WhyPleated />
      <ProductDetail />
      <OrderSteps />
      <MadeToMeasure />
      <Gallery />
      <Configurator />
      <PleatedDemo />
      <ColorSizeSection />
      <MeasurementGuide />
      <FAQ />
    </>
  );
}
