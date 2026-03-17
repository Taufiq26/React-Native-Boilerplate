import { Property } from '@/src/features/properties/types';
import { Image } from 'expo-image';
import { Bath, Bed, Car, Heart } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface PropertyCardProps {
  property: Property;
  onPress?: (property: Property) => void;
}

export const PropertyCard = ({ property, onPress }: PropertyCardProps) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  return (
    <Pressable
      onPress={() => onPress?.(property)}
      className="mb-8 rounded-[32px] bg-white p-4 shadow-sm dark:bg-zinc-800"
      style={({ pressed }) => ({
        opacity: pressed ? 0.95 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <View className="relative h-56 w-full rounded-[24px] overflow-hidden">
        <Image
          source={{ uri: property.imageUrl }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          transition={200}
        />
        <View className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 opacity-90">
          <Text className="text-xs font-bold text-gray-900">{property.type}</Text>
        </View>
        <View className="absolute right-4 top-4 rounded-full bg-white/40 p-2 backdrop-blur-md">
          <Heart size={20} color="#fff" strokeWidth={2.5} />
        </View>
      </View>

      <View className="mt-5 px-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900 dark:text-white" numberOfLines={1}>
            {property.name}
          </Text>
          <Text className="text-xl font-extrabold text-gray-900 dark:text-white">
            {formatter.format(property.estimatedValue)}
          </Text>
        </View>

        <View className="mt-1">
          <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Location: {property.address}
          </Text>
        </View>

        <View className="mt-5 flex-row items-center gap-3">
          <View className="flex-row items-center rounded-xl bg-gray-50 px-3 py-2 dark:bg-zinc-700">
            <Bed size={16} className="text-gray-600 dark:text-gray-300" strokeWidth={2} />
            <Text className="ml-2 text-sm font-bold text-gray-700 dark:text-gray-200">
              {property.beds} <Text className="font-normal text-gray-500">Beds</Text>
            </Text>
          </View>
          <View className="flex-row items-center rounded-xl bg-gray-50 px-3 py-2 dark:bg-zinc-700">
            <Bath size={16} className="text-gray-600 dark:text-gray-300" strokeWidth={2} />
            <Text className="ml-2 text-sm font-bold text-gray-700 dark:text-gray-200">
              {property.baths} <Text className="font-normal text-gray-500">Baths</Text>
            </Text>
          </View>
          <View className="flex-row items-center rounded-xl bg-gray-50 px-3 py-2 dark:bg-zinc-700">
            <Car size={16} className="text-gray-600 dark:text-gray-300" strokeWidth={2} />
            <Text className="ml-2 text-sm font-bold text-gray-700 dark:text-gray-200">
              {property.garage} <Text className="font-normal text-gray-500">Garage</Text>
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
