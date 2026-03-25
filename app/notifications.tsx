import { Stack } from 'expo-router';
import { Bell, CheckCircle2, AlertCircle } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Property Added',
    description: 'You successfully added "Green View Apartment" to your listings.',
    time: '2 hours ago',
    type: 'success',
  },
  {
    id: '2',
    title: 'Maintenance Alert',
    description: 'Scheduled maintenance for Villa Sejahtera is due tomorrow.',
    time: '5 hours ago',
    type: 'warning',
  },
  {
    id: '3',
    title: 'Market Update',
    description: 'Property values in Oakville have increased by 2.4% this month.',
    time: '1 day ago',
    type: 'info',
  },
];

export default function NotificationsScreen() {
  const getIconStatus = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={24} color="#10B981" strokeWidth={2.5} />;
      case 'warning':
        return <AlertCircle size={24} color="#F59E0B" strokeWidth={2.5} />;
      default:
        return <Bell size={24} color="#3B82F6" strokeWidth={2.5} />;
    }
  };

  const getIconBackground = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-100 dark:bg-emerald-900/30';
      case 'warning':
        return 'bg-amber-100 dark:bg-amber-900/30';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30';
    }
  };

  return (
    <View className="flex-1 bg-[#F8F9FA] dark:bg-black">
      <Stack.Screen
        options={{
          headerTitle: 'Notifications',
          headerBackTitle: 'Back',
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: 'transparent' },
        }}
      />
      
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map((notification) => (
          <View 
            key={notification.id} 
            className="mb-4 flex-row items-start rounded-3xl bg-white p-4 shadow-sm dark:bg-zinc-900"
          >
            <View className={`mt-1 h-12 w-12 items-center justify-center rounded-full ${getIconBackground(notification.type)}`}>
              {getIconStatus(notification.type)}
            </View>
            <View className="ml-4 flex-1">
              <View className="flex-row items-start justify-between">
                <Text className="flex-1 text-base font-bold text-gray-900 dark:text-gray-100">
                  {notification.title}
                </Text>
                <Text className="ml-2 text-xs font-medium text-gray-400">
                  {notification.time}
                </Text>
              </View>
              <Text className="mt-1 text-sm leading-5 text-gray-600 dark:text-gray-400">
                {notification.description}
              </Text>
            </View>
          </View>
        ))}
        
        {/* Placeholder for no more notifications */}
        <View className="mt-6 items-center pb-12">
          <Text className="text-sm font-medium text-gray-400">You're all caught up!</Text>
        </View>
      </ScrollView>
    </View>
  );
}
