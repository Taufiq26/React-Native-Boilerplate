export interface Property {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  type: string;
  status: 'Occupied' | 'Vacant' | 'Renting';
  estimatedValue: number;
  beds: number;
  baths: number;
  garage: number;
}
