import { SafeAreaView, StyleSheet, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '../../constants/theme';

const PAGE_TITLES = {
  'learning-assessment': 'Learning & Assessment',
  'skills-learning': 'Skills Learning',
  'students-profile': 'Students Profile',
  'counselling': 'Counselling',
  'psychometric-assessment': 'Psychometric Assessment',
  'subject-career': 'Subject & Career',
  'competitive-examination': 'Competitive Exam',
  'coding-ai-robotics': 'Coding / AI / Robotics',
  'language-learning': 'Language Learning',
};

export default function WebPageScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const title = PAGE_TITLES[slug] || 'Page';
  const url = `https://shreyartha.com/${slug}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={{ width: 50 }} />
      </View>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading {title}...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
    borderBottomColor: COLORS.border, backgroundColor: COLORS.white,
  },
  backText: { color: COLORS.primary, fontWeight: '600', fontSize: 15 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.secondary, flex: 1, textAlign: 'center' },
  loader: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white },
  loadingText: { marginTop: 12, color: COLORS.textSecondary, fontSize: 14 },
});