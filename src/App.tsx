import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ConfiguratorPage } from "./pages/ConfiguratorPage";
import { HomePage } from "./pages/HomePage";
import { AszfPage, ContactPage, PrivacyPage, ShippingPage } from "./pages/LegalPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/konfigurator" element={<ConfiguratorPage />} />
          <Route path="/kosar" element={<CartPage />} />
          <Route path="/rendeles" element={<CheckoutPage />} />
          <Route path="/aszf" element={<AszfPage />} />
          <Route path="/adatkezeles" element={<PrivacyPage />} />
          <Route path="/szallitas" element={<ShippingPage />} />
          <Route path="/kapcsolat" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
