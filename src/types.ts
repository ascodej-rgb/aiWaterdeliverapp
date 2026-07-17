export interface DeliveryZone {
  id: string;
  name: string;
  distanceKm: number;
  deliveryFee: number; // calculated as distanceKm * costPerKm or a fixed premium zone rate
}

export interface TankerCapacity {
  id: string;
  name: string;
  capacityLiters: number;
  image: string;
  description: string;
  idealFor: string;
  basePrice: number; // capacityLiters * 20 Birr
}

export interface BookingDetails {
  companyName: string;
  taxId: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  deliveryZoneId: string;
  tankerCapacityId: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  specialInstructions?: string;
  waterType: 'potable' | 'industrial_non_potable';
}

export interface BookingEstimation {
  basePrice: number;
  distanceFee: number;
  subtotal: number;
  vatAmount: number;
  totalPrice: number;
}
