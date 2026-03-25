import { useAuth } from '@/src/context/AuthContext';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const { signIn, isLoading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  const handleLogin = () => {
    setError('');

    if (!username || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Simulate a hardcoded dummy credentials check
    if (username.toLowerCase() === 'admin' && password === 'admin') {
      signIn(username);
    } else {
      setError('Invalid email or password. (Hint: use admin / admin)');
    }
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
        <View className="flex-1 bg-white">

          {/* Top Curvy Background Section with Image */}
          <View style={{ height: height * 0.5 }} className="w-full relative overflow-hidden bg-[#0a4c81]">
            <Image
              source={require('@/assets/images/entrance.jpg')}
              style={{ width: '100%', height: '100%', position: 'absolute' }}
              contentFit="cover"
            />
            {/* Optional dark overlay to make it look premium against the curve */}
            <View className="absolute w-full h-full bg-[#0a4c81]/40" />

            {/* S-Curve Illusion using react-native-svg */}
            <Svg
              height="135"
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
          <View className="flex-1 px-8 -mt-24 z-10">
            {/* Title */}
            <View className="mb-10">
              <Text className="text-[42px] font-extrabold text-zinc-800 tracking-tight">Sign in</Text>
              {/* Primary Color Underline */}
              <View className="h-1.5 w-16 bg-[#0a4c81] mt-2 rounded-full" />
            </View>

            {/* Email Field */}
            <View className="w-full mb-6">
              <Text className="text-[13px] text-zinc-500 font-bold mb-2 ml-1">Email / Username</Text>
              <View className="flex-row items-center border-b border-zinc-200 pb-3">
                <Mail size={18} color="#9CA3AF" strokeWidth={2.5} />
                <TextInput
                  className="flex-1 ml-3 text-zinc-900 text-[15px] font-medium"
                  placeholder="demo@email.com"
                  placeholderTextColor="#9CA3AF"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Password Field */}
            <View className="w-full mb-6">
              <Text className="text-[13px] text-zinc-500 font-bold mb-2 ml-1">Password</Text>
              <View className="flex-row items-center border-b border-zinc-200 pb-3">
                <Lock size={18} color="#9CA3AF" strokeWidth={2.5} />
                <TextInput
                  ref={passwordRef}
                  className="flex-1 ml-3 text-zinc-900 text-[15px] font-medium"
                  placeholder="enter your password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-1"
                >
                  {showPassword ? (
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

            {/* Forgot Password */}
            <View className="flex-row items-center justify-end mb-10 w-full mt-2">
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/forgot-password')}>
                <Text className="text-[13px] font-bold text-[#0a4c81]">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
              className={`w-full py-4 flex-row items-center justify-center rounded-[14px] shadow-sm mb-6 ${isLoading ? 'bg-[#0a4c81]/60' : 'bg-[#0a4c81]'
                }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" className="h-[24px]" />
              ) : (
                <Text className="text-white text-[16px] font-bold tracking-wide">Login</Text>
              )}
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row items-center justify-center mt-auto mb-8">
              <Text className="text-[13px] text-zinc-400 font-medium tracking-wide">Don't have an Account ? </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/register')}>
                <Text className="text-[13px] text-[#0a4c81] font-bold tracking-wide">Sign up</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
