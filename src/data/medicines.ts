export interface PharmacyOffer {
  pharmacyId: string;
  pharmacyName: string;
  price: number;
  mrp: number;
  inStock: boolean;
  area: string;
  distance: string;
}

export interface Product {
  id: string;
  name: string;
  genericName: string;
  category: string;
  subcategory: string;
  manufacturer: string;
  packSize: string;
  prescription: boolean;
  offers: PharmacyOffer[];
  description: string;
  tags: string[];
  image?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Azithromycin 500mg',
    genericName: 'Azithromycin',
    category: 'antibiotics',
    subcategory: 'Macrolide Antibiotics',
    manufacturer: 'Sun Pharma',
    packSize: '3 Tablets',
    prescription: true,
    description: 'Broad-spectrum antibiotic for respiratory and skin infections.',
    tags: ['antibiotic', 'infection', 'respiratory'],
    offers: [
      { pharmacyId: 'ph-001', pharmacyName: 'MedPlus, Banjara Hills', price: 68, mrp: 78, inStock: true, area: 'Banjara Hills', distance: '0.8 km' },
      { pharmacyId: 'ph-002', pharmacyName: 'Apollo Pharmacy, Jubilee Hills', price: 72, mrp: 78, inStock: true, area: 'Jubilee Hills', distance: '1.4 km' },
      { pharmacyId: 'ph-003', pharmacyName: 'Wellness Forever, Kondapur', price: 65, mrp: 78, inStock: false, area: 'Kondapur', distance: '3.2 km' },
    ],
  },
  {
    id: 'prod-002',
    name: 'Paracetamol 650mg',
    genericName: 'Paracetamol',
    category: 'pain-fever',
    subcategory: 'Analgesics & Antipyretics',
    manufacturer: 'GSK',
    packSize: '15 Tablets',
    prescription: false,
    description: 'Relieves pain and reduces fever. Suitable for adults and children.',
    tags: ['fever', 'pain relief', 'OTC'],
    offers: [
      { pharmacyId: 'ph-001', pharmacyName: 'MedPlus, Banjara Hills', price: 22, mrp: 28, inStock: true, area: 'Banjara Hills', distance: '0.8 km' },
      { pharmacyId: 'ph-004', pharmacyName: 'Netmeds Store, Gachibowli', price: 20, mrp: 28, inStock: true, area: 'Gachibowli', distance: '2.1 km' },
    ],
  },
  {
    id: 'prod-003',
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine HCl',
    category: 'allergy',
    subcategory: 'Antihistamines',
    manufacturer: 'Cipla',
    packSize: '10 Tablets',
    prescription: false,
    description: 'Non-drowsy antihistamine for allergic rhinitis, hives, and itching.',
    tags: ['allergy', 'antihistamine', 'OTC'],
    offers: [
      { pharmacyId: 'ph-002', pharmacyName: 'Apollo Pharmacy, Jubilee Hills', price: 18, mrp: 24, inStock: true, area: 'Jubilee Hills', distance: '1.4 km' },
      { pharmacyId: 'ph-003', pharmacyName: 'Wellness Forever, Kondapur', price: 19, mrp: 24, inStock: true, area: 'Kondapur', distance: '3.2 km' },
    ],
  },
  {
    id: 'prod-004',
    name: 'Vitamin D3 60000 IU',
    genericName: 'Cholecalciferol',
    category: 'vitamins',
    subcategory: 'Vitamin D',
    manufacturer: 'Abbott',
    packSize: '4 Soft Gelatin Capsules',
    prescription: false,
    description: 'Weekly dose for Vitamin D deficiency. Supports bone health and immunity.',
    tags: ['vitamin D', 'bone health', 'immunity'],
    offers: [
      { pharmacyId: 'ph-001', pharmacyName: 'MedPlus, Banjara Hills', price: 145, mrp: 185, inStock: true, area: 'Banjara Hills', distance: '0.8 km' },
      { pharmacyId: 'ph-004', pharmacyName: 'Netmeds Store, Gachibowli', price: 138, mrp: 185, inStock: true, area: 'Gachibowli', distance: '2.1 km' },
      { pharmacyId: 'ph-005', pharmacyName: 'Pharmeasy Hub, Koramangala', price: 152, mrp: 185, inStock: false, area: 'Koramangala', distance: '4.5 km' },
    ],
  },
  {
    id: 'prod-005',
    name: 'Omeprazole 20mg',
    genericName: 'Omeprazole',
    category: 'gastro',
    subcategory: 'Proton Pump Inhibitors',
    manufacturer: 'Dr. Reddy\'s',
    packSize: '10 Capsules',
    prescription: false,
    description: 'Reduces stomach acid for acidity, GERD, and peptic ulcers.',
    tags: ['acidity', 'GERD', 'stomach'],
    offers: [
      { pharmacyId: 'ph-003', pharmacyName: 'Wellness Forever, Kondapur', price: 42, mrp: 55, inStock: true, area: 'Kondapur', distance: '3.2 km' },
      { pharmacyId: 'ph-001', pharmacyName: 'MedPlus, Banjara Hills', price: 45, mrp: 55, inStock: true, area: 'Banjara Hills', distance: '0.8 km' },
    ],
  },
  {
    id: 'prod-006',
    name: 'Metformin 500mg',
    genericName: 'Metformin HCl',
    category: 'diabetes',
    subcategory: 'Biguanides',
    manufacturer: 'USV',
    packSize: '20 Tablets',
    prescription: true,
    description: 'First-line oral antidiabetic for Type 2 diabetes management.',
    tags: ['diabetes', 'blood sugar', 'Type 2'],
    offers: [
      { pharmacyId: 'ph-004', pharmacyName: 'Netmeds Store, Gachibowli', price: 38, mrp: 48, inStock: true, area: 'Gachibowli', distance: '2.1 km' },
      { pharmacyId: 'ph-002', pharmacyName: 'Apollo Pharmacy, Jubilee Hills', price: 40, mrp: 48, inStock: true, area: 'Jubilee Hills', distance: '1.4 km' },
    ],
  },
  {
    id: 'prod-007',
    name: 'Sunscreen SPF 50+',
    genericName: 'Titanium Dioxide + Zinc Oxide',
    category: 'skin-care',
    subcategory: 'Sun Protection',
    manufacturer: 'Himalaya',
    packSize: '50g Lotion',
    prescription: false,
    description: 'Broad-spectrum UVA/UVB protection. Non-greasy, suitable for all skin types.',
    tags: ['sunscreen', 'SPF 50', 'skin care'],
    offers: [
      { pharmacyId: 'ph-001', pharmacyName: 'MedPlus, Banjara Hills', price: 198, mrp: 250, inStock: true, area: 'Banjara Hills', distance: '0.8 km' },
      { pharmacyId: 'ph-005', pharmacyName: 'Pharmeasy Hub, Koramangala', price: 210, mrp: 250, inStock: true, area: 'Koramangala', distance: '4.5 km' },
    ],
  },
  {
    id: 'prod-008',
    name: 'Amlodipine 5mg',
    genericName: 'Amlodipine Besylate',
    category: 'cardiac',
    subcategory: 'Calcium Channel Blockers',
    manufacturer: 'Pfizer',
    packSize: '10 Tablets',
    prescription: true,
    description: 'For hypertension and angina. Long-acting calcium channel blocker.',
    tags: ['hypertension', 'BP', 'cardiac'],
    offers: [
      { pharmacyId: 'ph-002', pharmacyName: 'Apollo Pharmacy, Jubilee Hills', price: 55, mrp: 68, inStock: true, area: 'Jubilee Hills', distance: '1.4 km' },
      { pharmacyId: 'ph-001', pharmacyName: 'MedPlus, Banjara Hills', price: 52, mrp: 68, inStock: false, area: 'Banjara Hills', distance: '0.8 km' },
    ],
  },
  {
    id: 'prod-009',
    name: 'Multivitamin Daily Pack',
    genericName: 'Multivitamin + Multimineral',
    category: 'vitamins',
    subcategory: 'Multivitamins',
    manufacturer: 'Revital',
    packSize: '30 Tablets',
    prescription: false,
    description: 'Complete daily nutrition support with 12 vitamins and 9 minerals.',
    tags: ['multivitamin', 'daily health', 'immunity'],
    offers: [
      { pharmacyId: 'ph-003', pharmacyName: 'Wellness Forever, Kondapur', price: 320, mrp: 395, inStock: true, area: 'Kondapur', distance: '3.2 km' },
      { pharmacyId: 'ph-004', pharmacyName: 'Netmeds Store, Gachibowli', price: 298, mrp: 395, inStock: true, area: 'Gachibowli', distance: '2.1 km' },
    ],
  },
  {
    id: 'prod-010',
    name: 'Insulin Glargine 100IU/mL',
    genericName: 'Insulin Glargine',
    category: 'diabetes',
    subcategory: 'Insulin',
    manufacturer: 'Sanofi',
    packSize: '1 Pen Cartridge (3mL)',
    prescription: true,
    description: 'Long-acting basal insulin analogue for Type 1 and Type 2 diabetes.',
    tags: ['insulin', 'diabetes', 'Type 1'],
    offers: [
      { pharmacyId: 'ph-001', pharmacyName: 'MedPlus, Banjara Hills', price: 1150, mrp: 1380, inStock: true, area: 'Banjara Hills', distance: '0.8 km' },
      { pharmacyId: 'ph-004', pharmacyName: 'Netmeds Store, Gachibowli', price: 1095, mrp: 1380, inStock: true, area: 'Gachibowli', distance: '2.1 km' },
    ],
  },
  {
    id: 'prod-011',
    name: 'Salbutamol Inhaler',
    genericName: 'Salbutamol Sulphate',
    category: 'respiratory',
    subcategory: 'Bronchodilators',
    manufacturer: 'GSK',
    packSize: '200 Doses MDI',
    prescription: true,
    description: 'Rescue inhaler for asthma and COPD. Fast-acting bronchodilator.',
    tags: ['asthma', 'inhaler', 'respiratory'],
    offers: [
      { pharmacyId: 'ph-002', pharmacyName: 'Apollo Pharmacy, Jubilee Hills', price: 168, mrp: 195, inStock: true, area: 'Jubilee Hills', distance: '1.4 km' },
      { pharmacyId: 'ph-003', pharmacyName: 'Wellness Forever, Kondapur', price: 172, mrp: 195, inStock: false, area: 'Kondapur', distance: '3.2 km' },
    ],
  },
  {
    id: 'prod-012',
    name: 'Face Moisturiser SPF 15',
    genericName: 'Ceramide + Hyaluronic Acid',
    category: 'skin-care',
    subcategory: 'Moisturisers',
    manufacturer: 'CeraVe',
    packSize: '100mL',
    prescription: false,
    description: 'Daily moisturiser with ceramides and hyaluronic acid for dry skin.',
    tags: ['moisturiser', 'ceramide', 'skin care'],
    offers: [
      { pharmacyId: 'ph-005', pharmacyName: 'Pharmeasy Hub, Koramangala', price: 420, mrp: 520, inStock: true, area: 'Koramangala', distance: '4.5 km' },
      { pharmacyId: 'ph-001', pharmacyName: 'MedPlus, Banjara Hills', price: 399, mrp: 520, inStock: true, area: 'Banjara Hills', distance: '0.8 km' },
    ],
  },
];

export const MEDICINE_CATEGORIES = [
  {
    slug: 'antibiotics',
    name: 'Antibiotics',
    icon: '💊',
    subcategories: ['Macrolide Antibiotics', 'Penicillins', 'Fluoroquinolones', 'Cephalosporins'],
  },
  {
    slug: 'vitamins',
    name: 'Vitamins & Supplements',
    icon: '🌟',
    subcategories: ['Vitamin D', 'Vitamin B12', 'Multivitamins', 'Omega-3', 'Iron Supplements'],
  },
  {
    slug: 'diabetes',
    name: 'Diabetes Care',
    icon: '💉',
    subcategories: ['Biguanides', 'Insulin', 'SGLT2 Inhibitors', 'Glucometers & Strips'],
  },
  {
    slug: 'cardiac',
    name: 'Cardiac Care',
    icon: '❤️',
    subcategories: ['Calcium Channel Blockers', 'Beta Blockers', 'Statins', 'Anticoagulants'],
  },
  {
    slug: 'skin-care',
    name: 'Skin Care',
    icon: '🌿',
    subcategories: ['Sun Protection', 'Moisturisers', 'Acne Treatment', 'Anti-Fungal'],
  },
  {
    slug: 'pain-fever',
    name: 'Pain & Fever',
    icon: '🌡️',
    subcategories: ['Analgesics & Antipyretics', 'NSAIDs', 'Muscle Relaxants'],
  },
  {
    slug: 'allergy',
    name: 'Allergy & Immunity',
    icon: '🛡️',
    subcategories: ['Antihistamines', 'Nasal Sprays', 'Immunomodulators'],
  },
  {
    slug: 'gastro',
    name: 'Gastro & Digestive',
    icon: '🔬',
    subcategories: ['Proton Pump Inhibitors', 'Antacids', 'Laxatives', 'Probiotics'],
  },
  {
    slug: 'respiratory',
    name: 'Respiratory',
    icon: '🫁',
    subcategories: ['Bronchodilators', 'Corticosteroids', 'Expectorants', 'Nasal Decongestants'],
  },
];

export const HEALTH_CONCERNS = [
  { slug: 'diabetes', name: 'Diabetes', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { slug: 'hypertension', name: 'Hypertension', color: 'bg-red-50 text-red-700 border-red-200' },
  { slug: 'skin-care', name: 'Skin Care', color: 'bg-green-50 text-green-700 border-green-200' },
  { slug: 'respiratory', name: 'Respiratory', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { slug: 'vitamins', name: 'Vitamins', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { slug: 'cardiac', name: 'Cardiac Care', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { slug: 'pain-fever', name: 'Pain & Fever', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { slug: 'allergy', name: 'Allergy', color: 'bg-purple-50 text-purple-700 border-purple-200' },
];

export function lowestOffer(product: Product): PharmacyOffer | null {
  const inStock = product.offers.filter((o) => o.inStock);
  const pool = inStock.length > 0 ? inStock : product.offers;
  return pool.reduce<PharmacyOffer | null>((best, o) => (!best || o.price < best.price ? o : best), null);
}

export function hasStock(product: Product): boolean {
  return product.offers.some((o) => o.inStock);
}

export function discountPct(offer: PharmacyOffer): number {
  return Math.round(((offer.mrp - offer.price) / offer.mrp) * 100);
}