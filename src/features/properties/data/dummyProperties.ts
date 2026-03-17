import { Property } from '@/src/features/properties/types';

export const DUMMY_PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Redwood Villas',
    address: 'Mississauga, ON',
    imageUrl: 'https://i.pinimg.com/1200x/bd/8b/00/bd8b008253b5f769a168f7dcc5e04be4.jpg',
    type: 'House',
    status: 'Occupied',
    estimatedValue: 785000,
    beds: 3,
    baths: 2,
    garage: 1,
  },
  {
    id: '2',
    name: 'Green View Apartment',
    address: 'Toronto, ON',
    imageUrl: 'https://i.pinimg.com/1200x/bd/8b/00/bd8b008253b5f769a168f7dcc5e04be4.jpg',
    type: 'Apartment',
    status: 'Renting',
    estimatedValue: 450000,
    beds: 2,
    baths: 1,
    garage: 0,
  },
  {
    id: '3',
    name: 'Villa Sejahtera',
    address: 'Oakville, ON',
    imageUrl: 'https://i.pinimg.com/1200x/bd/8b/00/bd8b008253b5f769a168f7dcc5e04be4.jpg',
    type: 'Villa',
    status: 'Vacant',
    estimatedValue: 1200000,
    beds: 4,
    baths: 3,
    garage: 2,
  }
];
