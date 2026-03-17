import { Image } from 'expo-image';
import { Bell, ChevronRight, Heart, Key, MapPin, MessageSquare, ShoppingBag, Smartphone, Users } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();

  const MenuItem = ({ icon: Icon, title, isLast = false }: any) => (
    <Pressable className={`flex-row items-center justify-between py-4 ${!isLast ? 'border-b border-gray-100 dark:border-white/10' : ''}`}>
      <View className="flex-row items-center">
        <View className="w-8 items-center justify-center">
          <Icon size={24} color="#9CA3AF" strokeWidth={2.5} />
        </View>
        <Text className="ml-4 text-[17px] font-bold text-gray-800 dark:text-gray-200">{title}</Text>
      </View>
      <ChevronRight size={20} color="#D1D5DB" strokeWidth={3} />
    </Pressable>
  );

  return (
    <ScrollView className="flex-1 bg-[#F8F9FA] dark:bg-black" bounces={false} showsVerticalScrollIndicator={false}>
      <View className="relative h-[400px] w-full items-center">
        {/* Cover Image */}
        <Image
          source={require('@/assets/images/living-room.jpg')}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          contentFit="cover"
        />
        {/* Dark overlay to make text readable */}
        <View className="absolute h-full w-full bg-black/40" />

        {/* Top Header Icons */}
        <View
          className="absolute w-full flex-row justify-end px-6"
          style={{ paddingTop: Math.max(insets.top, 20) + 10 }}
        >
          <Pressable className="mr-5 mt-1">
            <Heart size={26} color="#fff" strokeWidth={2.5} />
          </Pressable>
          <Pressable className="relative mt-1">
            <ShoppingBag size={26} color="#fff" strokeWidth={2.5} />
            <View className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#1E1E1E] bg-red-500" />
          </Pressable>
        </View>

        {/* Profile Info */}
        <View className="mt-[110px] items-center">
          <View className="h-[100px] w-[100px] overflow-hidden rounded-full border-4 border-white">
            <Image
              source={{ uri: 'https://i.pinimg.com/1200x/a5/31/34/a53134b2b21dd4ecc80b7ca00a4c52c9.jpg' }}
              style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
              contentFit="cover"
            />
          </View>
          <Text className="mt-4 text-[26px] font-bold tracking-tight text-white">John Snow</Text>
          <Text className="mt-2 w-4/5 text-center text-sm font-medium leading-5 text-white/90">
            Work hard in silence. Let your success be the noise.
          </Text>
        </View>
      </View>

      {/* Cards Section */}
      <View className="-mt-[28px] flex-1 px-5 pb-10">
        {/* First Card */}
        <View className="mb-6 rounded-[28px] bg-white px-5 py-2 shadow-sm dark:bg-zinc-900">
          <MenuItem icon={MapPin} title="My Address" />
          <MenuItem icon={Users} title="Account" isLast={true} />
        </View>

        {/* Second Card */}
        <View className="rounded-[28px] bg-white px-5 py-2 shadow-sm dark:bg-zinc-900">
          <MenuItem icon={Bell} title="Notifications" />
          <MenuItem icon={Smartphone} title="Devices" />
          <MenuItem icon={Key} title="Passwords" />
          <MenuItem icon={MessageSquare} title="Language" isLast={true} />
        </View>
      </View>
    </ScrollView>
  );
}
