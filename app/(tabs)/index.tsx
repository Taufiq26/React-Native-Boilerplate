import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { Bell, Search } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PropertyCard } from '@/src/features/properties/components/PropertyCard';
import { DUMMY_PROPERTIES } from '@/src/features/properties/data/dummyProperties';
import { Property } from '@/src/features/properties/types';

export default function TabOneScreen() {
  const PILLS = ['All', 'Occupied', 'Vacant', 'Renting'];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const totalValue = DUMMY_PROPERTIES.reduce((acc, curr) => acc + curr.estimatedValue, 0);

  const filteredProperties = DUMMY_PROPERTIES.filter((prop) => {
    const matchesFilter = activeFilter === 'All' || prop.status === activeFilter;
    const matchesSearch =
      prop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const headerElement = (
    <View className="mb-6 pt-4">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">Welcome back, Jon!</Text>
          <Text className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">My Properties</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <Pressable 
            onPress={() => router.push('/notifications')}
            className="relative rounded-full bg-white p-3 shadow-sm dark:bg-zinc-800"
          >
            <Bell size={20} className="text-gray-800 dark:text-gray-200" strokeWidth={2.5} />
            <View className="absolute right-3 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500 dark:border-zinc-800" />
          </Pressable>
        </View>
      </View>

      <View className="mt-8 flex-row items-center justify-between rounded-3xl bg-gray-900 p-6 shadow-md dark:bg-zinc-800">
        <View>
          <Text className="text-sm font-semibold text-gray-400">Total Asset Value</Text>
          <Text className="mt-2 text-2xl font-bold text-white">{formatter.format(totalValue)}</Text>
        </View>
        <View className="rounded-full bg-white/20 px-4 py-2">
          <Text className="text-sm font-bold text-white">{DUMMY_PROPERTIES.length} Units</Text>
        </View>
      </View>

      <View className="mt-8 flex-row items-center">
        <View className="flex-1 flex-row items-center rounded-fill rounded-full bg-white px-5 py-4 shadow-sm dark:bg-zinc-800">
          <Search size={20} className="text-gray-400" strokeWidth={2.5} />
          <TextInput
            placeholder="Search your properties..."
            className="ml-3 flex-1 text-base text-gray-900 placeholder:text-gray-400 dark:text-white"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-8" contentContainerStyle={{ paddingRight: 20 }}>
        {PILLS.map((pill) => (
          <Pressable
            key={pill}
            onPress={() => setActiveFilter(pill)}
            className={`mr-3 rounded-full border px-6 py-2.5 ${activeFilter === pill
                ? 'border-gray-900 bg-gray-900 dark:border-white dark:bg-white'
                : 'border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-800'
              }`}
          >
            <Text
              className={`text-sm font-semibold ${activeFilter === pill ? 'text-white dark:text-gray-900' : 'text-gray-700 dark:text-gray-300'
                }`}
            >
              {pill}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View className="mb-2 mt-8 flex-row items-end justify-between">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">Your Listings</Text>
        <Text className="text-sm font-semibold text-gray-400">
          {filteredProperties.length} found
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA] dark:bg-zinc-900" edges={['top']}>
      <FlashList<Property>
        data={filteredProperties}
        renderItem={({ item }) => <PropertyCard property={item} />}
        keyExtractor={(item) => item.id}
        // @ts-ignore: estimatedItemSize is required but errantly missing from FlashListProps type in some TS setups
        estimatedItemSize={350}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        ListHeaderComponent={headerElement}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
