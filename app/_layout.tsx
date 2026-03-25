import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useSegments, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css";

import { useColorScheme } from '@/components/useColorScheme';
import { AuthProvider, useAuth } from '@/src/context/AuthContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // If auth is loading, don't do anything
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'register' || segments[0] === 'otp' || segments[0] === 'forgot-password' || segments[0] === 'reset-password';

    const StrictlyUnauthenticatedGroup = segments[0] === 'login' || segments[0] === 'register' || segments[0] === 'forgot-password';

    if (!user && !inAuthGroup) {
      // Redirect to the login page
      router.replace('/login');
    } else if (user && StrictlyUnauthenticatedGroup) {
      // Redirect away from unauthenticated-only pages
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="register" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="otp" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
