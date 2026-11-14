import type { StaticImageData } from "next/image";
import { getProductImages, type RoomKey } from "@/data/images";

export type ProductColor = {
  name: string;
  swatchClassName: string;
};

export type ProductCategory = RoomKey;

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: StaticImageData;
  alt: string;
  gallery: StaticImageData[];
  description: string;
  sizes: string[];
  colors: ProductColor[];
  material: string;
  inStock: boolean;
  isNew?: boolean;
};

export const categoryRoutes: Record<ProductCategory, string> = {
  Living: "/living",
  Dining: "/dining",
  Bedroom: "/bedroom",
};

// One cover image per photo in src/data/images.ts:
// Living -> living1..living8, Dining -> dining1..dining10, Bedroom -> bed1..bed8.
export const products: Product[] = [
  {
    id: "modular-linen-sofa",
    name: "Modular Linen Sofa",
    category: "Living",
    price: 2890,
    ...getProductImages("Living", 0),
    alt: "Cream modular sofa with a walnut and glass coffee table",
    description:
      "A modular sofa in washed linen, built as separate seats that lock together without tools. Deep feather seats and a low back make it easy to reconfigure for a room.",
    sizes: ["W280 × D95 × H72 cm", "W320 × D95 × H72 cm"],
    colors: [
      { name: "Oatmeal", swatchClassName: "bg-stone-200" },
      { name: "Sand", swatchClassName: "bg-stone-300" },
      { name: "Charcoal", swatchClassName: "bg-zinc-800" },
    ],
    material: "Washed linen, solid pine",
    inStock: true,
  },
  {
    id: "round-glass-coffee-table",
    name: "Round Glass Coffee Table",
    category: "Living",
    price: 690,
    ...getProductImages("Living", 1),
    alt: "Round glass coffee table with a black metal frame",
    description:
      "A round glass top set into a slim blackened steel frame, with a lower shelf for books and trays. The smoked glass keeps the surface calm in a busy room.",
    sizes: ["Ø80 × H42 cm", "Ø90 × H42 cm"],
    colors: [
      { name: "Smoke", swatchClassName: "bg-zinc-500" },
      { name: "Clear", swatchClassName: "bg-zinc-200" },
      { name: "Black", swatchClassName: "bg-zinc-900" },
    ],
    material: "Tempered glass, blackened steel",
    inStock: false,
  },
  {
    id: "boucle-lounge-chair",
    name: "Boucle Lounge Chair",
    category: "Living",
    price: 890,
    ...getProductImages("Living", 2),
    alt: "Cream boucle lounge chair in a living room",
    description:
      "A rounded lounge chair upholstered in textured boucle, with a deep seat and a soft backrest. The low profile suits a corner by the window or a reading spot.",
    sizes: ["W82 × D84 × H74 cm", "W92 × D88 × H74 cm"],
    colors: [
      { name: "Ecru", swatchClassName: "bg-stone-200" },
      { name: "Sand", swatchClassName: "bg-stone-300" },
      { name: "Olive", swatchClassName: "bg-emerald-800" },
    ],
    material: "Boucle wool, solid oak",
    inStock: true,
    isNew: true,
  },
  {
    id: "wool-sofa",
    name: "Wool Sofa",
    category: "Living",
    price: 2190,
    ...getProductImages("Living", 3),
    alt: "Cream wool sofa with a wooden coffee table and table lamp",
    description:
      "A three-seat sofa in dense wool upholstery, built on a kiln-dried hardwood frame. Feather-wrapped cushions keep their shape and soften with use.",
    sizes: [
      "W200 × D90 × H80 cm",
      "W230 × D95 × H80 cm",
      "W260 × D95 × H80 cm",
    ],
    colors: [
      { name: "Ecru", swatchClassName: "bg-stone-200" },
      { name: "Walnut", swatchClassName: "bg-amber-900" },
      { name: "Charcoal", swatchClassName: "bg-zinc-800" },
    ],
    material: "Dense wool, kiln-dried hardwood",
    inStock: true,
  },
  {
    id: "terracotta-armchair",
    name: "Terracotta Armchair",
    category: "Living",
    price: 940,
    ...getProductImages("Living", 4),
    alt: "Orange terracotta armchair in a leafy living room",
    description:
      "A channel-tufted armchair in a warm terracotta velvet, with a low back and deep arms. The wide seat holds two comfortably and anchors a pale room.",
    sizes: ["W92 × D86 × H72 cm", "W102 × D92 × H72 cm"],
    colors: [
      { name: "Terracotta", swatchClassName: "bg-orange-600" },
      { name: "Olive", swatchClassName: "bg-emerald-800" },
      { name: "Cream", swatchClassName: "bg-stone-200" },
    ],
    material: "Cotton velvet, solid beech",
    inStock: true,
  },
  {
    id: "linen-sectional-sofa",
    name: "Linen Sectional Sofa",
    category: "Living",
    price: 2680,
    ...getProductImages("Living", 5),
    alt: "Beige linen sectional sofa with a round oak coffee table",
    description:
      "A deep sectional with a chaise end and a low arm, upholstered in a linen blend. The reclining back is adjustable, so it works for sitting or lounging.",
    sizes: ["W260 × D160 × H78 cm", "W300 × D170 × H78 cm"],
    colors: [
      { name: "Oatmeal", swatchClassName: "bg-stone-200" },
      { name: "Fog", swatchClassName: "bg-zinc-300" },
      { name: "Charcoal", swatchClassName: "bg-zinc-800" },
    ],
    material: "Linen blend, hardwood frame",
    inStock: true,
  },
  {
    id: "glass-brass-coffee-table",
    name: "Glass and Brass Coffee Table",
    category: "Living",
    price: 720,
    ...getProductImages("Living", 6),
    alt: "Glass and brass coffee table in a green and gold living room",
    description:
      "A clear glass top on a brass-plated frame, with a lower shelf that doubles the surface. The thin profile reads light even in a small room.",
    sizes: ["W120 × D60 × H40 cm", "W140 × D70 × H40 cm"],
    colors: [
      { name: "Brass", swatchClassName: "bg-yellow-600" },
      { name: "Chrome", swatchClassName: "bg-zinc-300" },
      { name: "Matte Black", swatchClassName: "bg-zinc-900" },
    ],
    material: "Tempered glass, brass-plated steel",
    inStock: true,
  },
  {
    id: "rattan-pendant-light",
    name: "Rattan Pendant Light",
    category: "Living",
    price: 260,
    ...getProductImages("Living", 7),
    alt: "Rattan pendant lights hanging over a living room",
    description:
      "A hand-woven rattan shade on a fabric cord, shaped to throw light down and across. Hang one low over a table or a pair above a seating group.",
    sizes: ["Ø35 × H45 cm", "Ø45 × H55 cm"],
    colors: [
      { name: "Natural", swatchClassName: "bg-amber-600" },
      { name: "White", swatchClassName: "bg-zinc-100" },
      { name: "Black", swatchClassName: "bg-zinc-900" },
    ],
    material: "Woven rattan, fabric cord",
    inStock: true,
  },
  {
    id: "reclaimed-wood-dining-table",
    name: "Reclaimed Wood Dining Table",
    category: "Dining",
    price: 1580,
    ...getProductImages("Dining", 0),
    alt: "Reclaimed wood dining table with bentwood chairs by a window",
    description:
      "A generous table built from reclaimed oak boards, each one left with its own marks and grain. The thick top sits on a pair of sculpted trestle legs.",
    sizes: ["W200 × D95 × H75 cm", "W240 × D100 × H75 cm"],
    colors: [
      { name: "Weathered Oak", swatchClassName: "bg-stone-600" },
      { name: "Dark Walnut", swatchClassName: "bg-amber-900" },
      { name: "White Washed", swatchClassName: "bg-stone-200" },
    ],
    material: "Reclaimed oak",
    inStock: true,
  },
  {
    id: "upholstered-dining-chair",
    name: "Upholstered Dining Chair",
    category: "Dining",
    price: 380,
    ...getProductImages("Dining", 1),
    alt: "Oatmeal upholstered dining chairs around a dark round table",
    description:
      "A dining chair with a curved upholstered back and a solid beech frame. The padded seat stays comfortable through long dinners.",
    sizes: ["W50 × D56 × H84 cm", "W52 × D58 × H88 cm"],
    colors: [
      { name: "Oatmeal", swatchClassName: "bg-stone-200" },
      { name: "Sage", swatchClassName: "bg-emerald-800" },
      { name: "Charcoal", swatchClassName: "bg-zinc-800" },
    ],
    material: "Wool blend, solid beech",
    inStock: true,
  },
  {
    id: "moulded-dining-chair",
    name: "Moulded Dining Chair",
    category: "Dining",
    price: 290,
    ...getProductImages("Dining", 2),
    alt: "Moulded shell dining chairs with wire bases at a white table",
    description:
      "A moulded shell seat on a wire base, light enough to move with one hand. The seat has a gentle curve that supports the back without a cushion.",
    sizes: ["Set of 2", "Set of 4"],
    colors: [
      { name: "White", swatchClassName: "bg-zinc-100" },
      { name: "Grey", swatchClassName: "bg-zinc-400" },
      { name: "Charcoal", swatchClassName: "bg-zinc-800" },
    ],
    material: "Moulded polypropylene, steel wire",
    inStock: true,
  },
  {
    id: "tiered-pendant-light",
    name: "Tiered Pendant Light",
    category: "Dining",
    price: 420,
    ...getProductImages("Dining", 3),
    alt: "Tiered white pendant light above a wooden dining table",
    description:
      "Three stacked shades in powder-coated aluminium, lit from the inside with a warm glow. It is sized to hang over the centre of a long table.",
    sizes: ["Ø40 × H60 cm", "Ø50 × H70 cm"],
    colors: [
      { name: "White", swatchClassName: "bg-zinc-100" },
      { name: "Sand", swatchClassName: "bg-stone-300" },
      { name: "Matte Black", swatchClassName: "bg-zinc-900" },
    ],
    material: "Powder-coated aluminium",
    inStock: true,
  },
  {
    id: "leather-dining-chair",
    name: "Leather Dining Chair",
    category: "Dining",
    price: 460,
    ...getProductImages("Dining", 4),
    alt: "Cream leather dining chairs around a wooden table",
    description:
      "A high-backed dining chair in aniline leather, with a solid oak frame and tapered legs. The seat is firm at first and softens to the sitter.",
    sizes: ["W52 × D58 × H86 cm", "W54 × D60 × H90 cm"],
    colors: [
      { name: "Cream", swatchClassName: "bg-stone-200" },
      { name: "Cognac", swatchClassName: "bg-amber-700" },
      { name: "Black", swatchClassName: "bg-zinc-900" },
    ],
    material: "Aniline leather, solid oak",
    inStock: true,
  },
  {
    id: "bentwood-dining-chair",
    name: "Bentwood Dining Chair",
    category: "Dining",
    price: 340,
    ...getProductImages("Dining", 5),
    alt: "Bentwood dining chairs with woven seats around a round table",
    description:
      "A steam-bent beech chair with a woven seat, made to the same pattern for more than a century. Light, stackable, and comfortable without upholstery.",
    sizes: ["W44 × D50 × H84 cm", "W46 × D52 × H88 cm"],
    colors: [
      { name: "Natural", swatchClassName: "bg-amber-600" },
      { name: "Walnut", swatchClassName: "bg-amber-900" },
      { name: "Black", swatchClassName: "bg-zinc-900" },
    ],
    material: "Steam-bent beech, woven cane",
    inStock: true,
  },
  {
    id: "velvet-dining-chair",
    name: "Velvet Dining Chair",
    category: "Dining",
    price: 420,
    ...getProductImages("Dining", 6),
    alt: "Emerald velvet dining chairs with brass legs at a stone table",
    description:
      "A tub-shaped dining chair in cotton velvet, raised on slim brass-finished legs. The low arms tuck neatly under a table.",
    sizes: ["W55 × D58 × H78 cm", "W58 × D60 × H82 cm"],
    colors: [
      { name: "Emerald", swatchClassName: "bg-emerald-800" },
      { name: "Ink", swatchClassName: "bg-slate-900" },
      { name: "Sand", swatchClassName: "bg-stone-300" },
    ],
    material: "Cotton velvet, steel legs",
    inStock: true,
    isNew: true,
  },
  {
    id: "cage-pendant-light",
    name: "Cage Pendant Light",
    category: "Dining",
    price: 340,
    ...getProductImages("Dining", 7),
    alt: "Cage pendant lights hanging above a reclaimed wood table",
    description:
      "An open steel cage around four candle bulbs, with no glass to clean or break. The frame casts a geometric pattern across the ceiling.",
    sizes: ["Ø40 × H45 cm", "Ø50 × H55 cm"],
    colors: [
      { name: "Matte Black", swatchClassName: "bg-zinc-900" },
      { name: "Bronze", swatchClassName: "bg-amber-900" },
      { name: "White", swatchClassName: "bg-zinc-100" },
    ],
    material: "Powder-coated steel",
    inStock: false,
  },
  {
    id: "round-pedestal-table",
    name: "Round Pedestal Table",
    category: "Dining",
    price: 1580,
    ...getProductImages("Dining", 8),
    alt: "Round dark wood pedestal table with grey chairs and a brass chandelier",
    description:
      "A round table on a single turned pedestal, finished by hand. The circular top keeps conversation even and fits tighter rooms than a rectangular plan.",
    sizes: ["Ø120 × H75 cm", "Ø140 × H75 cm"],
    colors: [
      { name: "Smoked Oak", swatchClassName: "bg-stone-700" },
      { name: "Natural Oak", swatchClassName: "bg-amber-700" },
      { name: "White Oiled", swatchClassName: "bg-stone-200" },
    ],
    material: "Solid oak",
    inStock: true,
  },
  {
    id: "pine-dining-table",
    name: "Pine Dining Table",
    category: "Dining",
    price: 1180,
    ...getProductImages("Dining", 9),
    alt: "Pine dining table set with candles under a white pendant",
    description:
      "A long pine table with a plank top and a simple apron, waxed rather than lacquered. Knots and colour shifts are part of the finish.",
    sizes: ["W200 × D90 × H75 cm", "W240 × D95 × H75 cm"],
    colors: [
      { name: "Natural Pine", swatchClassName: "bg-amber-600" },
      { name: "White Washed", swatchClassName: "bg-stone-200" },
      { name: "Dark Stain", swatchClassName: "bg-stone-700" },
    ],
    material: "Solid pine",
    inStock: true,
  },
  {
    id: "oak-writing-desk",
    name: "Oak Writing Desk",
    category: "Bedroom",
    price: 890,
    ...getProductImages("Bedroom", 0),
    alt: "Oak writing desk with drawers and a slipcovered chair",
    description:
      "A slim writing desk with three drawers and a shallow top, sized for a laptop and a lamp. The oak is left open-pored so the grain stays visible.",
    sizes: ["W120 × D55 × H75 cm", "W140 × D55 × H75 cm"],
    colors: [
      { name: "Natural Oak", swatchClassName: "bg-amber-700" },
      { name: "White Oiled", swatchClassName: "bg-stone-200" },
      { name: "Graphite", swatchClassName: "bg-zinc-700" },
    ],
    material: "Solid oak",
    inStock: true,
  },
  {
    id: "upholstered-bed",
    name: "Upholstered Bed",
    category: "Bedroom",
    price: 1680,
    ...getProductImages("Bedroom", 1),
    alt: "Upholstered bed with a tall headboard in a grey bedroom",
    description:
      "A fully upholstered bed with a tall, gently curved headboard and a solid slatted base. The removable cover can be refreshed without dismantling the frame.",
    sizes: [
      "Double — W140 × L200 cm",
      "Queen — W160 × L200 cm",
      "King — W180 × L200 cm",
    ],
    colors: [
      { name: "Cloud", swatchClassName: "bg-zinc-200" },
      { name: "Sand", swatchClassName: "bg-stone-300" },
      { name: "Charcoal", swatchClassName: "bg-zinc-800" },
    ],
    material: "Wool blend, solid pine slats",
    inStock: true,
  },
  {
    id: "striped-fabric-headboard",
    name: "Striped Fabric Headboard",
    category: "Bedroom",
    price: 680,
    ...getProductImages("Bedroom", 2),
    alt: "Striped fabric headboard behind a white bed",
    description:
      "A wide headboard in a woven stripe, padded for sitting up against. It mounts to the wall, so any standard divan base will fit beneath it.",
    sizes: [
      "Double — W140 × H110 cm",
      "Queen — W160 × H110 cm",
      "King — W180 × H110 cm",
    ],
    colors: [
      { name: "Ochre Stripe", swatchClassName: "bg-orange-200" },
      { name: "Sand", swatchClassName: "bg-stone-300" },
      { name: "Ink", swatchClassName: "bg-slate-900" },
    ],
    material: "Wool blend, plywood",
    inStock: true,
  },
  {
    id: "spindle-wood-bed",
    name: "Spindle Wood Bed",
    category: "Bedroom",
    price: 1280,
    ...getProductImages("Bedroom", 3),
    alt: "Spindle wood bed frame with a light ash finish",
    description:
      "A light bed frame with turned spindles along the headboard and a low footboard. The open frame keeps a small bedroom feeling larger.",
    sizes: [
      "Double — W140 × L200 cm",
      "Queen — W160 × L200 cm",
      "King — W180 × L200 cm",
    ],
    colors: [
      { name: "Natural Ash", swatchClassName: "bg-stone-300" },
      { name: "White Oiled", swatchClassName: "bg-stone-200" },
      { name: "Black", swatchClassName: "bg-zinc-900" },
    ],
    material: "Solid ash",
    inStock: true,
  },
  {
    id: "sputnik-chandelier",
    name: "Sputnik Chandelier",
    category: "Bedroom",
    price: 480,
    ...getProductImages("Bedroom", 4),
    alt: "Sputnik chandelier hanging above a tufted bed",
    description:
      "A radial chandelier with glass rods and exposed bulbs on a polished metal core. It spreads light in every direction, so no lamp is needed either side.",
    sizes: ["Ø45 × H50 cm", "Ø60 × H60 cm"],
    colors: [
      { name: "Chrome", swatchClassName: "bg-zinc-300" },
      { name: "Brass", swatchClassName: "bg-yellow-600" },
      { name: "Matte Black", swatchClassName: "bg-zinc-900" },
    ],
    material: "Polished steel, glass rods",
    inStock: true,
    isNew: true,
  },
  {
    id: "swivel-accent-chair",
    name: "Swivel Accent Chair",
    category: "Bedroom",
    price: 780,
    ...getProductImages("Bedroom", 5),
    alt: "Brown swivel accent chair in a modern bedroom",
    description:
      "A low accent chair on a four-star swivel base, upholstered in a dense wool. It turns easily between a window and a bed, so it works as a reading chair.",
    sizes: ["W76 × D78 × H72 cm", "W84 × D84 × H72 cm"],
    colors: [
      { name: "Umber", swatchClassName: "bg-amber-900" },
      { name: "Cream", swatchClassName: "bg-stone-200" },
      { name: "Charcoal", swatchClassName: "bg-zinc-800" },
    ],
    material: "Dense wool, steel swivel base",
    inStock: true,
  },
  {
    id: "bedside-table-with-shelf",
    name: "Bedside Table with Shelf",
    category: "Bedroom",
    price: 280,
    ...getProductImages("Bedroom", 6),
    alt: "White bedside table with a drawer and lower shelf",
    description:
      "A compact bedside table with one drawer and an open shelf below. The painted finish wipes clean and the small footprint suits tight rooms.",
    sizes: ["W40 × D36 × H55 cm", "W45 × D40 × H60 cm"],
    colors: [
      { name: "White", swatchClassName: "bg-zinc-100" },
      { name: "Natural", swatchClassName: "bg-amber-600" },
      { name: "Black", swatchClassName: "bg-zinc-900" },
    ],
    material: "Painted oak, solid pine",
    inStock: false,
  },
  {
    id: "channel-tufted-bed",
    name: "Channel-Tufted Bed",
    category: "Bedroom",
    price: 1890,
    ...getProductImages("Bedroom", 7),
    alt: "White channel-tufted bed with brass legs",
    description:
      "A low bed with channel tufting across the headboard and footboard, raised on brass-finished legs. The upholstery wraps the frame so no base is visible.",
    sizes: [
      "Double — W140 × L200 cm",
      "Queen — W160 × L200 cm",
      "King — W180 × L200 cm",
    ],
    colors: [
      { name: "Cloud", swatchClassName: "bg-zinc-200" },
      { name: "Sand", swatchClassName: "bg-stone-300" },
      { name: "Olive", swatchClassName: "bg-emerald-800" },
    ],
    material: "Velvet, solid beech",
    inStock: true,
  },
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export const productIds: string[] = products.map((product) => product.id);

const featuredIds: string[] = [
  "modular-linen-sofa",
  "wool-sofa",
  "round-pedestal-table",
  "velvet-dining-chair",
  "upholstered-bed",
  "channel-tufted-bed",
  "boucle-lounge-chair",
  "reclaimed-wood-dining-table",
];

export const featuredProducts: Product[] = products.filter((product) =>
  featuredIds.includes(product.id),
);
