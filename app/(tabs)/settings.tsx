import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Bell, ChevronRight, Key, MapPin, MessageSquare, Smartphone, Users, LogOut } from 'lucide-react-native';
import { useAuth } from '@/src/context/AuthContext';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { SuccessModal } from '@/src/components/SuccessModal';
import { WarningModal } from '@/src/components/WarningModal';

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const { signOut, user } = useAuth();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const userEmail = `${user?.name?.toLowerCase().replace(/\s+/g, '') || 'john'}@demo.com`;

  const MenuItem = ({ icon: Icon, title, isLast = false, onPress }: any) => (
    <Pressable onPress={onPress} className={`flex-row items-center justify-between py-4 ${!isLast ? 'border-b border-gray-100 dark:border-white/10' : ''}`}>
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

        {/* Profile Info */}
        <View className="mt-[110px] items-center">
          <View className="h-[100px] w-[100px] overflow-hidden rounded-full border-4 border-white">
            <Image
              source={{ uri: 'https://i.pinimg.com/1200x/a5/31/34/a53134b2b21dd4ecc80b7ca00a4c52c9.jpg' }}
              style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
              contentFit="cover"
            />
          </View>
          <Text className="mt-4 text-[26px] font-bold tracking-tight text-white">{user?.name || 'John Snow'}</Text>
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
          <MenuItem icon={Bell} title="Notifications" onPress={() => router.push('/notifications')} />
          <MenuItem icon={Smartphone} title="Devices" />
          <MenuItem icon={Key} title="Change Password" onPress={() => setShowOtpModal(true)} />
          <MenuItem icon={MessageSquare} title="Language" isLast={true} />
        </View>

        {/* Logout Card */}
        <View className="mt-6 rounded-[28px] bg-red-50 px-5 py-2 shadow-sm dark:bg-red-900/20">
          <MenuItem icon={LogOut} title="Log Out" isLast={true} onPress={() => setShowLogoutModal(true)} />
        </View>
      </View>

      <SuccessModal
        visible={showOtpModal}
        icon="mail"
        title="Check Your Email"
        message={
          <>
            We've sent a 6-digit OTP code to{"\n"}
            <Text className="font-bold text-zinc-800">{userEmail}</Text>{"\n"}
            Please enter it to confirm your identity.
          </>
        }
        buttonText="Continue"
        onConfirm={() => {
          setShowOtpModal(false);
          router.push(`/otp?email=${encodeURIComponent(userEmail)}&action=change_password`);
        }}
      />

      <WarningModal
        visible={showLogoutModal}
        title="Sign Out"
        message="Are you sure you want to sign out from your account?"
        icon="info"
        confirmText="Log Out"
        onConfirm={() => {
          setShowLogoutModal(false);
          signOut();
        }}
        onCancel={() => setShowLogoutModal(false)}
      />
    </ScrollView>
  );
}
