import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import { Eye, EyeOff, Lock, Mail, User, MailCheck } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SuccessModal } from '@/src/components/SuccessModal';
import { ErrorModal } from '@/src/components/ErrorModal';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleRegister = () => {
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Simulate successful API registration call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleModalConfirm = () => {
    setShowSuccessModal(false);
    router.push(`/otp?email=${encodeURIComponent(email)}&action=register`);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        behavior={'position'}
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
            <View className="mb-8">
              <Text className="text-[36px] font-extrabold text-zinc-800 tracking-tight">Create Account</Text>
              {/* Primary Color Underline */}
              <View className="h-1.5 w-16 bg-[#0a4c81] mt-2 rounded-full" />
            </View>

            {/* Full Name Field */}
            <View className="w-full mb-5">
              <Text className="text-[13px] text-zinc-500 font-bold mb-2 ml-1">Full Name</Text>
              <View className="flex-row items-center border-b border-zinc-200 pb-2">
                <User size={18} color="#9CA3AF" strokeWidth={2.5} />
                <TextInput
                  className="flex-1 ml-3 text-zinc-900 text-[15px] font-medium"
                  placeholder="John Doe"
                  placeholderTextColor="#9CA3AF"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Email Field */}
            <View className="w-full mb-5">
              <Text className="text-[13px] text-zinc-500 font-bold mb-2 ml-1">Email</Text>
              <View className="flex-row items-center border-b border-zinc-200 pb-2">
                <Mail size={18} color="#9CA3AF" strokeWidth={2.5} />
                <TextInput
                  ref={emailRef}
                  className="flex-1 ml-3 text-zinc-900 text-[15px] font-medium"
                  placeholder="demo@email.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Password Field */}
            <View className="w-full mb-5">
              <Text className="text-[13px] text-zinc-500 font-bold mb-2 ml-1">Password</Text>
              <View className="flex-row items-center border-b border-zinc-200 pb-2">
                <Lock size={18} color="#9CA3AF" strokeWidth={2.5} />
                <TextInput
                  ref={passwordRef}
                  className="flex-1 ml-3 text-zinc-900 text-[15px] font-medium"
                  placeholder="create a password"
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
              <Text className="text-[13px] text-zinc-500 font-bold mb-2 ml-1">Confirm Password</Text>
              <View className="flex-row items-center border-b border-zinc-200 pb-2">
                <Lock size={18} color="#9CA3AF" strokeWidth={2.5} />
                <TextInput
                  ref={confirmPasswordRef}
                  className="flex-1 ml-3 text-zinc-900 text-[15px] font-medium"
                  placeholder="re-enter password"
                  placeholderTextColor="#9CA3AF"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleRegister}
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
            </View>

            {/* Error spacing block */}
            <View className="mb-8" />

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
              className={`w-full py-4 flex-row items-center justify-center rounded-[14px] shadow-sm mb-6 ${isLoading ? 'bg-[#0a4c81]/60' : 'bg-[#0a4c81]'
                }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" className="h-[24px]" />
              ) : (
                <Text className="text-white text-[16px] font-bold tracking-wide">Register</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row items-center justify-center mt-auto mb-2">
              <Text className="text-[13px] text-zinc-400 font-medium tracking-wide">Already have an account? </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.replace('/login')}>
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

      <ErrorModal
        visible={!!error}
        title="Registration Error"
        message={error}
        onConfirm={() => setError('')}
      />
    </View>
  );
}
