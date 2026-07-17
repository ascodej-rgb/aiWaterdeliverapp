import { DeliveryZone, TankerCapacity } from '../types';

export const RATE_PER_LITER = 20; // 20 Birr per Liter
export const DISTANCE_RATE_PER_KM = 60; // 60 Birr per Km
export const VAT_RATE = 0.15; // 15% VAT

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: 'bole', name: 'Bole District (10 km)', distanceKm: 10, deliveryFee: 10 * DISTANCE_RATE_PER_KM },
  { id: 'akaki', name: 'Akaki Kality Industrial Zone (24 km)', distanceKm: 24, deliveryFee: 24 * DISTANCE_RATE_PER_KM },
  { id: 'nifas_silk', name: 'Nifas Silk Lafto (15 km)', distanceKm: 15, deliveryFee: 15 * DISTANCE_RATE_PER_KM },
  { id: 'kolfe', name: 'Kolfe Keranio (18 km)', distanceKm: 18, deliveryFee: 18 * DISTANCE_RATE_PER_KM },
  { id: 'yeka', name: 'Yeka District (14 km)', distanceKm: 14, deliveryFee: 14 * DISTANCE_RATE_PER_KM },
  { id: 'gullele', name: 'Gullele District (12 km)', distanceKm: 12, deliveryFee: 12 * DISTANCE_RATE_PER_KM },
  { id: 'arada', name: 'Arada District (Central) (5 km)', distanceKm: 5, deliveryFee: 5 * DISTANCE_RATE_PER_KM },
  { id: 'lideta', name: 'Lideta District (8 km)', distanceKm: 8, deliveryFee: 8 * DISTANCE_RATE_PER_KM },
  { id: 'kirkos', name: 'Kirkos District (7 km)', distanceKm: 7, deliveryFee: 7 * DISTANCE_RATE_PER_KM },
  { id: 'sululta', name: 'Sululta Area (28 km)', distanceKm: 28, deliveryFee: 28 * DISTANCE_RATE_PER_KM },
  { id: 'bishoftu', name: 'Bishoftu (Debre Zeyit) (45 km)', distanceKm: 45, deliveryFee: 45 * DISTANCE_RATE_PER_KM },
  { id: 'sebeta', name: 'Sebeta Industrial Hub (30 km)', distanceKm: 30, deliveryFee: 30 * DISTANCE_RATE_PER_KM },
  { id: 'sendafa', name: 'Sendafa Area (38 km)', distanceKm: 38, deliveryFee: 38 * DISTANCE_RATE_PER_KM },
];

export const TANKER_CAPACITIES: TankerCapacity[] = [
  {
    id: 'medium',
    name: 'Hydro-Medium Tanker',
    capacityLiters: 10000,
    basePrice: 10000 * RATE_PER_LITER,
    image: 'https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?auto=format&fit=crop&q=80&w=800',
    description: 'A agile, maneuverable dual-axle tanker built for fast urban access and narrow construction sites.',
    idealFor: 'Medium hotels, commercial construction sites, private office parks, and residential complexes.',
  },
  {
    id: 'heavy',
    name: 'Hydro-Heavy Duty Tanker',
    capacityLiters: 20000,
    basePrice: 20000 * RATE_PER_LITER,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    description: 'Our high-efficiency commercial tri-axle bulk water carrier equipped with dual pressure pump discharge systems.',
    idealFor: 'Industrial manufacturing, large-scale concrete batching, deep-foundation work, and beverage factories.',
  },
  {
    id: 'mega',
    name: 'Hydro-Mega Titan Semi-Trailer',
    capacityLiters: 30000,
    basePrice: 30000 * RATE_PER_LITER,
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate high-volume multi-compartment heavy hauler designed for maximum logistical throughput.',
    idealFor: 'Municipal emergency reserve backup, large industrial cooling systems, multi-tank filling, and mega infrastructure projects.',
  },
];

export const FAQS = [
  {
    question: 'Are your bulk water tankers approved for drinking water (Potable)?',
    answer: 'Absolutely. We operate a dedicated fleet specifically for certified, health-department-approved potable water. These tankers undergo regular laboratory testing, sanitized cleaning protocols, and are fitted with food-grade stainless steel tanks and hoses.',
  },
  {
    question: 'How quickly can you deliver in case of an emergency?',
    answer: 'For emergency water supply outages, we maintain a dedicated 24/7 hotline. Emergency dispatch tankers can typically reach central commercial hubs in under 2 hours, subject to immediate traffic conditions.',
  },
  {
    question: 'What commercial documents do you provide for tax and audit compliance?',
    answer: 'We provide full tax invoices, detailed delivery logs with driver signatures, water quality certificates upon request, and VAT registration documents containing our commercial Tax ID. Every transaction is legally recorded and receipted.',
  },
  {
    question: 'How does the tanker discharge the water at our facility?',
    answer: 'Our tankers are fully self-powered and equipped with commercial-grade high-flow transfer pumps. We can pump water vertically up to 5 floors or discharge at rapid speeds into underground reservoirs, ground tanks, or swimming pools. Standard delivery includes up to 50 meters of industrial food-grade hose.',
  },
  {
    question: 'Do you offer custom commercial discounts for recurring delivery contracts?',
    answer: 'Yes! For manufacturing plants, construction phases lasting over 3 months, or regular weekly commercial supplies, we offer custom long-term Service Level Agreements (SLAs) with discounted volume rates and priority scheduling.',
  },
];
