export type ProductType = "single" | "double" | "window";
export type Placement = "door" | "terrace" | "window";
export type OpeningMode = "ltr" | "rtl" | "center";
export type ColorId =
  | "white"
  | "anthracite"
  | "brown"
  | "black"
  | "goldenOak"
  | "walnut";

export type ConfiguratorStep = 1 | 2 | 3 | 4 | 5;

export interface ProductConfig {
  productType: ProductType;
  placement: Placement;
  opening: OpeningMode;
  width: number;
  height: number;
  colorId: ColorId;
}

export interface CartItem extends ProductConfig {
  id: string;
  quantity: number;
  unitPrice: number;
}

export interface PriceBreakdown {
  area: number;
  basePrice: number;
  areaPrice: number;
  typeSurcharge: number;
  colorSurcharge: number;
  subtotal: number;
  total: number;
}

export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  shippingStreet: string;
  shippingCity: string;
  shippingZip: string;
  billingSame: boolean;
  billingStreet: string;
  billingCity: string;
  billingZip: string;
  isCompany: boolean;
  companyName: string;
  taxNumber: string;
  payment: "card" | "transfer";
  note: string;
}
