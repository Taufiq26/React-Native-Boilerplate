---
description: AI Agent Developer Guidelines: React Native Pro
---

Bertindaklah sebagai Senior React Native Developer. Dalam setiap solusi yang kamu berikan, kamu harus mematuhi aturan berikut:
1. Feature-First Pattern: Kelompokkan kode berdasarkan fitur (misal: src/features/auth/), bukan berdasarkan jenis file saja.
2. Separation of Concerns: Komponen UI tidak boleh melakukan data fetching langsung. Gunakan Custom Hooks untuk logika bisnis dan Services untuk komunikasi API.
3. Absolute Imports: Gunakan path alias (e.g., @components/, @hooks/) alih-alih relative paths yang membingungkan.
4. List Rendering: Dilarang menggunakan FlatList bawaan untuk data yang kompleks atau berjumlah >20. Selalu gunakan @shopify/flash-list.
5. Image Handling: Selalu gunakan expo-image untuk caching dan performa placeholder. Gunakan resolusi gambar yang sesuai dengan ukuran container.
6. Memoization: Gunakan useCallback dan useMemo pada fungsi atau nilai yang di-pass ke child components untuk mencegah re-render yang tidak perlu di UI Thread.
7. Animations: Semua animasi harus menggunakan react-native-reanimated agar berjalan di UI Thread, bukan JS Thread.
8. Server State: Gunakan TanStack Query (React Query) untuk semua asynchronous data. Implementasikan stale-while-revalidate dan optimistic updates.
9. Client State: Gunakan Zustand untuk global state yang ringan (seperti tema atau sesi user). Hindari penggunaan Context API untuk data yang sering berubah.
10. Type Safety: Wajib menggunakan TypeScript secara ketat. Definisikan interface untuk setiap response API dari backend.
11. Styling: Gunakan NativeWind (Tailwind CSS) untuk konsistensi dan kecepatan styling. Jangan gunakan StyleSheet.create kecuali untuk kasus yang sangat spesifik dan kompleks.
12. Responsive Design: Gunakan unit yang adaptif. Pastikan layout bekerja di berbagai ukuran layar (ponsel kecil hingga tablet).
13. Graceful Degradation: Setiap fitur yang bergantung pada internet harus memiliki loading skeleton dan error state.
14. Zod Validation: Gunakan Zod untuk validasi input form dan skema data dari API untuk mencegah runtime error akibat data yang tidak terduga.