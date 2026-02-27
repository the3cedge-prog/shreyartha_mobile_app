import { useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { COLORS } from '../../constants/theme';

const PAGE_CONFIG = {
  'learning-assessment': { title: 'Learning & Assessment' },
  'skills-learning': { title: 'Skills Learning' },
  'students-profile': { title: 'Students Profile' },
  'counselling': { title: 'Counselling' },
  'psychometric-assessment': { title: 'Psychometric Assessment' },
  'subject-career': { title: 'Subject & Career' },
  'competitive-examination': { title: 'Competitive Exam' },
  'coding-ai-robotics': { title: 'Coding / AI / Robotics' },
  'language-learning': { title: 'Language Learning' },
};

export default function WebPageScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const webViewRef = useRef(null);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const config = PAGE_CONFIG[slug];
  const title = config?.title || 'Page';

  // Since shreyartha.com is a React SPA, we load the root URL
  // and then use JavaScript to navigate client-side via React Router
  const baseUrl = 'https://shreyartha.com';

  // This JS runs after the page loads:
  // 1. Navigates to the correct route client-side
  // 2. Hides the website header/footer/search bar
  const injectedJS = `
    (function() {
      // Wait for React to mount, then navigate
      function tryNavigate() {
        // Use window.history.pushState + dispatchEvent to trigger React Router
        var targetPath = '/${slug}';
        if (window.location.pathname !== targetPath) {
          window.history.pushState({}, '', targetPath);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }

        // Hide headers, footers, and search bars after a short delay
        setTimeout(function() {
          var selectors = [
            '.landing-header', '.la-header', '.sl-header', '.sp-header',
            '.co-header', '.ps-header', '.sc-header', '.ce-header',
            '.car-header', '.ll-header',
            '.global-search-section',
            '.landing-footer', '.la-footer', '.sl-footer', '.sp-footer',
            '.co-footer', '.ps-footer', '.sc-footer', '.ce-footer',
            '.car-footer', '.ll-footer',
            '.landing-tagline-section'
          ];
          selectors.forEach(function(sel) {
            var els = document.querySelectorAll(sel);
            els.forEach(function(el) { el.style.display = 'none'; });
          });
          document.body.style.paddingTop = '0px';
        }, 1500);
      }

      // Try immediately and also after a delay for slower connections
      tryNavigate();
      setTimeout(tryNavigate, 2000);
      setTimeout(tryNavigate, 4000);
    })();
    true;
  `;

  if (loadError) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
          <View style={{ width: 50 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Unable to load page</Text>
          <Text style={styles.errorMsg}>
            Please check your internet connection and try again.
          </Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => {
              setLoadError(false);
              setIsLoading(true);
            }}
          >
            <Text style={styles.retryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Hide expo-router's default header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* WebView — loads base URL then navigates client-side */}
      <WebView
        ref={webViewRef}
        source={{ uri: baseUrl }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        injectedJavaScript={injectedJS}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => setLoadError(true)}
      />

      {/* Loading overlay */}
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading {title}...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
    borderBottomColor: '#eee', backgroundColor: COLORS.white,
  },
  backText: { color: COLORS.primary, fontWeight: '600', fontSize: 15 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a2e', flex: 1, textAlign: 'center' },
  loader: {
    position: 'absolute', top: 60, left: 0, right: 0, bottom: 0,
    justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white,
  },
  loadingText: { marginTop: 12, color: '#666', fontSize: 14 },
  errorContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32,
  },
  errorIcon: { fontSize: 48, marginBottom: 16 },
  errorTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 8 },
  errorMsg: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  retryBtn: {
    backgroundColor: '#b0003a', paddingVertical: 12, paddingHorizontal: 36, borderRadius: 24,
  },
  retryBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});