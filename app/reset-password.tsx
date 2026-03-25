import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Eye, EyeOff, Lock } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SuccessModal } from '@/src/components/SuccessModal';

const { width, height } = Dimensions.get('window');

export default function ResetPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) || '';
  const action = (params.action as string) || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const confirmPasswordRef = useRef<TextInput>(null);

  const handleReset = () => {
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Simulate successful API password reset call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleModalConfirm = () => {
    setShowSuccessModal(false);
    if (action === 'change_password') {
      router.replace('/(tabs)/settings');
    } else {
      router.replace('/login');
    }
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
          <View style={{ height: height * 0.35 }} className="w-full relative overflow-hidden bg-[#0a4c81]">
            <Image
              source={require('@/assets/images/entrance.jpg')}
              style={{ width: '100%', height: '100%', position: 'absolute' }}
              contentFit="cover"
            />
            {/* Dark overlay */}
            <View className="absolute w-full h-full bg-[#0a4c81]/40" />

            {/* S-Curve Illusion using react-native-svg */}
            <Svg
              height="100"
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
          <View className="flex-1 px-8 -mt-12 z-10 pb-10">
            {/* Title */}
            <View className="mb-6">
              <Text className="text-[36px] font-extrabold text-zinc-800 tracking-tight">New Password</Text>
              {/* Primary Color Underline */}
              <View className="h-1.5 w-16 bg-[#0a4c81] mt-3 rounded-full" />
            </View>

            <Text className="text-[15px] text-zinc-500 font-medium mb-10 leading-6">
              Create a new password that is secure and easy to remember.
            </Text>

            {/* Password Field */}
            <View className="w-full mb-5">
              <Text className="text-[13px] text-zinc-500 font-bold mb-2 ml-1">New Password</Text>
              <View className="flex-row items-center border-b border-zinc-200 pb-2">
                <Lock size={18} color="#9CA3AF" strokeWidth={2.5} />
                <TextInput
                  className="flex-1 ml-3 text-zinc-900 text-[15px] font-medium"
                  placeholder="Create new password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-2 -mr-2"
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#9CA3AF" strokeWidth={2.5} />
                  ) : (
                    <Eye size={18} color="#9CA3AF" strokeWidth={2.5} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Field */}
            <View className="w-full mb-2">
              <Text className="text-[13px] text-zinc-500 font-bold mb-2 ml-1">Confirm New Password</Text>
              <View className="flex-row items-center border-b border-zinc-200 pb-2">
                <Lock size={18} color="#9CA3AF" strokeWidth={2.5} />
                <TextInput
                  ref={confirmPasswordRef}
                  className="flex-1 ml-3 text-zinc-900 text-[15px] font-medium"
                  placeholder="Re-enter password"
                  placeholderTextColor="#9CA3AF"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleReset}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-2 -mr-2"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} color="#9CA3AF" strokeWidth={2.5} />
                  ) : (
                    <Eye size={18} color="#9CA3AF" strokeWidth={2.5} />
                  )}
                </TouchableOpacity>
              </View>
              {error ? (
                <Text className="text-red-500 text-[13px] mt-2 ml-1 font-medium">{error}</Text>
              ) : null}
            </View>

            {/* Spacer */}
            <View className="mb-10" />

            {/* Reset Button */}
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
                <Text className="text-white text-[16px] font-bold tracking-wide">Save Password</Text>
              )}
            </TouchableOpacity>

            {/* Cancel Edit Link */}
            <View className="flex-row items-center justify-center mt-auto mb-2">
              <TouchableOpacity activeOpacity={0.7} onPress={() => {
                if (action === 'change_password') {
                  router.replace('/(tabs)/settings');
                } else {
                  router.replace('/login');
                }
              }}>
                <Text className="text-[14px] text-zinc-500 font-bold tracking-wide">
                  {action === 'change_password' ? 'Cancel & return to settings' : 'Cancel & return to login'}
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={showSuccessModal}
        icon="check"
        title="Password Saved"
        message={action === 'change_password' ? "Your password has been changed successfully." : "Your password has been reset successfully. You can now use your new credentials to sign in."}
        buttonText={action === 'change_password' ? "Back to Settings" : "Back to Login"}
        onConfirm={handleModalConfirm}
      />
    </View>
  );
}
