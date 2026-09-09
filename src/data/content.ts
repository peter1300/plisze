const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const photos = {
  hero: asset("photos/hero-terrace.png"),
  whyOpen: asset("photos/why-open.png"),
  whyMid: asset("photos/why-mid.png"),
  whyWide: asset("photos/why-wide.png"),
  whyQuality: asset("photos/why-quality.png"),
  mesh: asset("photos/mesh-macro.png"),
  interior: asset("photos/interior-dining.png"),
  galleryDusk: asset("photos/gallery-dusk.png"),
  galleryWhite: asset("photos/gallery-white.png"),
  galleryWindow: asset("photos/gallery-window.png"),
  demo: asset("photos/demo-doors.png"),
  measure: asset("photos/measure-door.png"),
  consultant: asset("photos/consultant.png"),
} as const;

export const benefits = [
  { title: "Egyedi méretre", text: "Milliméterre gyártva" },
  { title: "Prémium minőség", text: "Alumínium keret" },
  { title: "Gyors gyártás", text: "10–14 munkanap" },
  { title: "2 év garancia", text: "Keret és mechanika" },
] as const;

export const whyItems = [
  {
    title: "Eltűnik, amikor nincs rá szükség",
    text: "A pliszé háló harmonikaszerűen összecsukódik. Nyitva szinte láthatatlan.",
    image: photos.whyOpen,
  },
  {
    title: "Nem csapódik vissza",
    text: "Nincs rugós tok. A háló ott marad, ahova húzod.",
    image: photos.whyMid,
  },
  {
    title: "Akár 4 méteres nyílásra",
    text: "Kétszárnyú kivitelben a két szárny a középvonalban találkozik.",
    image: photos.whyWide,
  },
  {
    title: "Alumínium, ami kitart",
    text: "UV-álló háló, precíz keret, 2 év gyártási garancia.",
    image: photos.whyQuality,
  },
] as const;

export const orderSteps = [
  {
    n: "01",
    title: "Mérd le",
    text: "Három ponton, milliméterben. A legkisebb számot add meg.",
    image: photos.measure,
  },
  {
    n: "02",
    title: "Állítsd össze",
    text: "Típus, nyitás, méret, szín. Az ár azonnal látszik.",
    image: photos.hero,
  },
  {
    n: "03",
    title: "Rendeld meg",
    text: "Kapcsolat, szállítás, fizetés. Négy rövid lépés.",
    image: photos.interior,
  },
  {
    n: "04",
    title: "Mi elkészítjük",
    text: "Pont a te nyílásodra. 10–14 munkanap.",
    image: photos.galleryDusk,
  },
] as const;

export const measureTabs = [
  { id: "door", label: "Ajtónyílás" },
  { id: "terrace", label: "Teraszajtó" },
  { id: "window", label: "Ablak" },
] as const;

export const measurePoints = [
  { n: 1, title: "Felső szélesség", text: "A tok belsejében, fent." },
  { n: 2, title: "Középső szélesség", text: "Mellmagasságban, ugyanúgy tokban." },
  { n: 3, title: "Alsó szélesség", text: "A küszöbnél. A legkisebbet add meg." },
  { n: 4, title: "Bal magasság", text: "Fentről le, a bal oldali tokban." },
  { n: 5, title: "Jobb magasság", text: "Fentről le, a jobb oldali tokban." },
] as const;
