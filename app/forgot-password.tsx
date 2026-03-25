import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SuccessModal } from '@/src/components/SuccessModal';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleReset = () => {
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    // Simulate API call to send OTP for password reset
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleModalConfirm = () => {
    setShowSuccessModal(false);
    // Push exactly to the reusable OTP handling context "action=forgot_password"
    router.push(`/otp?email=${encodeURIComponent(email)}&action=forgot_password`);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Curvy Background Section with Image */}
          <View style={{ height: height * 0.4 }} className="w-full relative overflow-hidden bg-[#0a4c81]">
            <Image
              source={require('@/assets/images/entrance.jpg')}
              style={{ width: '100%', height: '100%', position: 'absolute' }}
              contentFit="cover"
            />
            {/* Dark overlay */}
            <View className="absolute w-full h-full bg-[#0a4c81]/40" />

            {/* S-Curve Illusion using react-native-svg */}
            <Svg
              height="150"
              width="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: 'absolute', bottom: -2 }}
            >
              <Path
                fill="#ffffff"
                d="M0,100 L0,20 C30,-20 60,110 100,40 L100,100 Z"
              />
            </Svg>
          </View>

          {/* Main Content Area */}
          <View className="flex-1 px-8 -mt-20 z-10 pb-10">
            {/* Title */}
            <View className="mb-6">
              <Text className="text-[36px] font-extrabold text-zinc-800 tracking-tight">Recover{"\n"}Password</Text>
              {/* Primary Color Underline */}
              <View className="h-1.5 w-16 bg-[#0a4c81] mt-3 rounded-full" />
            </View>

            <Text className="text-[15px] text-zinc-500 font-medium mb-10 leading-6">
              Don't worry! It occurs. Please enter the email address linked with your account.
            </Text>

            {/* Email Field */}
            <View className="w-full mb-2">
              <Text className="text-[13px] text-zinc-500 font-bold mb-2 ml-1">Email</Text>
              <View className="flex-row items-center border-b border-zinc-200 pb-2">
                <Mail size={18} color="#9CA3AF" strokeWidth={2.5} />
                <TextInput
                  className="flex-1 ml-3 text-zinc-900 text-[15px] font-medium"
                  placeholder="demo@email.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleReset}
                />
              </View>
              {error ? (
                <Text className="text-red-500 text-[13px] mt-3 ml-1 font-medium">{error}</Text>
              ) : null}
            </View>

            {/* General spacing */}
            <View className="mb-10" />

            {/* Send Link Button */}
            <TouchableOpacity
              onPress={handleReset}
              disabled={isLoading}
              activeOpacity={0.8}
              className={`w-full py-4 flex-row items-center justify-center rounded-[14px] shadow-sm mb-6 ${isLoading ? 'bg-[#0a4c81]/60' : 'bg-[#0a4c81]'
                }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" className="h-[24px]" />
              ) : (
                <Text className="text-white text-[16px] font-bold tracking-wide">Send Code</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row items-center justify-center mt-auto mb-2">
              <Text className="text-[13px] text-zinc-400 font-medium tracking-wide">Remember password? </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
                <Text className="text-[13px] text-[#0a4c81] font-bold tracking-wide">Sign in</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={showSuccessModal}
        icon="mail"
        title="Check Your Email"
        message={
          <>
            We've sent a 6-digit OTP code to{"\n"}
            <Text className="font-bold text-zinc-800">{email || 'your email'}</Text>{"\n"}
            Please enter it to verify your account.
          </>
        }
        buttonText="Continue"
        onConfirm={handleModalConfirm}
      />
    </View>
  );
}
