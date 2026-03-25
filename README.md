# 📱 React Native Premium Boilerplate

A production-ready React Native mobile application boilerplate built with the latest Expo ecosystem. Designed with a focus on premium UI/UX, high performance, and advanced protected routing.

---

## 🛠 Tech Stack

- **[React Native] & [Expo]** – Core cross-platform framework (iOS & Android).
- **[Expo Router v3]** – File-based routing with deep-link support.
- **[NativeWind v4] (Tailwind)** – Universal utility-first styling.
- **[Shopify FlashList]** – High-performance list engine.
- **[React Native SVG]** – Crisp vector curve capabilities.
- **[Expo Image]** – High-performance image rendering with caching support.
- **[Lucide React Native]** – Premium vector iconography.

---

## ✨ Key Features

### 1. Complete Authentication Flow
- **Protected Routes**: Strict separation between public nodes and private UI via `Context API` layout tracking.
- **Auth Interfaces**: Beautiful "Sign In" & "Sign Up" screens emphasizing vector curves with robust, auto-focused forms and anti-collision keyboard handling.
- **Universal OTP Verification**: A reusable, highly-reliable 6-digit hidden-input architecture contextualizing flows (handling Register, Forgot Password, and Change Password parameters).
- **Password Recovery Pipeline**: Seamless navigation from Forgot Password to OTP Verification down to Reset Password using dynamic Context flags.
- **Custom Modals**: Elegant, centralized `SuccessModal.tsx` components overriding generic system alerts.

### 2. Dashboard & Listing
- **Property Management**: Advanced horizontal UI filters (Occupied, Vacant, Renting) directly linked to list states.
- **High-Performance Cards**: Clean `PropertyCard.tsx` implementations leveraging FlashList for buttery smooth infinite scrolling.

### 3. Profile Setup
- Premium profile overview paired with organized actionable list cards.
- Deep routing linked securely to protected app functions including Change Password flows.

---

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Metro Bundler**
   ```bash
   npx expo start
   ```

3. **Open the Application**
   - **Physical Device:** Scan the CLI QR code via the `Expo Go` application.
   - **Emulator:** Press `i` for iOS Simulator or `a` for Android Studio Emulator.
