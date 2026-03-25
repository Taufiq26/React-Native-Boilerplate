import { IconType, SuccessModal } from '@/src/components/SuccessModal';
import { useAuth } from '@/src/context/AuthContext';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { ReactNode, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const OTP_LENGTH = 6;

export default function OTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { signIn } = useAuth();

  const email = (params.email as string) || 'your email';
  const action = (params.action as string) || 'verify';

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalConfig, setModalConfig] = useState<{
    visible: boolean;
    title: string;
    message: ReactNode;
    icon: IconType;
    onConfirm: () => void;
  }>({
    visible: false,
    title: '',
    message: <></>,
    icon: 'check',
    onConfirm: () => { },
  });

  const inputRef = useRef<TextInput>(null);

  const handleVerify = () => {
    setError('');

    if (code.length < OTP_LENGTH) {
      setError('Please enter the complete OTP code.');
      return;
    }

    // Simulate successful API verification call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setModalConfig({
        visible: true,
        title: "Verification Success",
        icon: "check",
        message: (
          <>
            Your account has been successfully verified.
            You can now proceed.
          </>
        ),
        onConfirm: () => {
          setModalConfig(prev => ({ ...prev, visible: false }));
          if (action === 'forgot_password') {
            router.replace(`/reset-password?email=${encodeURIComponent(email)}`);
          } else if (action === 'register') {
            router.replace('/login');
          } else {
            router.replace('/login');
          }
        }
      });
    }, 1500);
  };

  const handleResend = () => {
    // Simulate API request to resend OTP
    setModalConfig({
      visible: true,
      title: "Code Resent",
      icon: "mail",
      message: (
        <>
          A new 6-digit code has been sent to{"\n"}
          <Text className="font-bold text-zinc-800">{email}</Text>.
        </>
      ),
      onConfirm: () => {
        setModalConfig(prev => ({ ...prev, visible: false }));
      }
    });
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
              <Text className="text-[36px] font-extrabold text-zinc-800 tracking-tight">Verification</Text>
              {/* Primary Color Underline */}
              <View className="h-1.5 w-16 bg-[#0a4c81] mt-2 rounded-full" />
            </View>

            <Text className="text-[15px] text-zinc-500 font-medium mb-10 leading-6">
              We've sent a {OTP_LENGTH}-digit code to{"\n"}
              <Text className="font-bold text-zinc-800">{email}</Text>
            </Text>

            {/* OTP Input UI */}
            <View className="w-full mb-6 items-center flex-row justify-center relative">
              {/* Hidden Actual Input */}
              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={setCode}
                maxLength={OTP_LENGTH}
                keyboardType="number-pad"
                className="absolute w-full h-[70px] opacity-0 z-20"
                autoFocus
                caretHidden
              />

              {/* Visual Boxes container */}
              <View className="flex-row justify-between w-full px-2 z-10" pointerEvents="none">
                {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                  const isActive = code.length === index;
                  const char = code[index] || '';

                  return (
                    <View
                      key={index}
                      className={`w-[48px] h-[58px] rounded-[14px] border-2 flex items-center justify-center bg-zinc-50 ${isActive ? 'border-[#0a4c81] bg-white' : 'border-zinc-200'
                        }`}
                    >
                      <Text className="text-[24px] font-bold text-zinc-800 shadow-sm">{char}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {error ? (
              <Text className="text-red-500 text-[13px] mt-2 mb-4 font-medium text-center">{error}</Text>
            ) : null}

            <View className="flex-row justify-center mt-2 mb-10">
              <Text className="text-[13px] text-zinc-400 font-medium tracking-wide">Didn't receive the code? </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleResend}>
                <Text className="text-[13px] text-[#0a4c81] font-bold tracking-wide">Resend</Text>
              </TouchableOpacity>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              onPress={handleVerify}
              disabled={isLoading || code.length < OTP_LENGTH}
              activeOpacity={0.8}
              className={`w-full py-4 flex-row items-center justify-center rounded-[14px] shadow-sm mb-6 ${(isLoading || code.length < OTP_LENGTH) ? 'bg-[#0a4c81]/60' : 'bg-[#0a4c81]'
                }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" className="h-[24px]" />
              ) : (
                <Text className="text-white text-[16px] font-bold tracking-wide">Verify</Text>
              )}
            </TouchableOpacity>

            {/* Back to Login Link */}
            <View className="flex-row items-center justify-center mt-auto mb-2">
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
                <Text className="text-[14px] text-zinc-500 font-bold tracking-wide">Back</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={modalConfig.visible}
        title={modalConfig.title}
        message={modalConfig.message}
        icon={modalConfig.icon}
        buttonText="Continue"
        onConfirm={modalConfig.onConfirm}
      />
    </View>
  );
}
