import { Text, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-xl font-bold text-black dark:text-white">Setting Page</Text>

      <View className="my-7 h-[1px] w-4/5 bg-gray-200 dark:bg-white/10" />
    </View>
  );
}
