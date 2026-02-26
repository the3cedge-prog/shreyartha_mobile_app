import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function LandingScreen() {
  const router = useRouter();

  const features = [
    { icon: '🎓', title: 'Academic Excellence', description: 'Personalized learning paths tailored to your curriculum and goals' },
    { icon: '🧠', title: 'Psychometric Assessment', description: 'Discover your strengths, interests, and ideal career paths' },
    { icon: '💼', title: 'Career Guidance', description: 'Expert counseling to help you make informed decisions' },
    { icon: '🌍', title: 'Global Opportunities', description: 'University placements in India and abroad' },
    { icon: '💻', title: 'Skill Development', description: 'Coding, language skills, and future-ready competencies' },
    { icon: '📊', title: 'Progress Tracking', description: 'Real-time analytics and performance insights' },
  ];

  const stats = [
    { value: '10,000+', label: 'Students Guided' },
    { value: '500+', label: 'Partner Schools' },
    { value: '95%', label: 'Success Rate' },
    { value: '50+', label: 'Countries Reached' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'Class 12, Delhi', text: 'The 3C Edge helped me understand my strengths and choose the right career path. I\'m now studying at my dream university!', avatar: 'PS' },
    { name: 'Rahul Mehta', role: 'Class 11, Mumbai', text: 'The personalized resources and practice tests significantly improved my board exam scores. Highly recommended!', avatar: 'RM' },
    { name: 'Ananya Reddy', role: 'Class 10, Bangalore', text: 'The counselors are amazing! They guided me through the entire process of choosing subjects and planning for competitive exams.', avatar: 'AR' },
  ];

  const webpages = [
    { title: 'Learning & Assessment', slug: 'learning-assessment', icon: '📚' },
    { title: 'Skills Learning', slug: 'skills-learning', icon: '🛠️' },
    { title: 'Students Profile', slug: 'students-profile', icon: '👤' },
    { title: 'Counselling', slug: 'counselling', icon: '🤝' },
    { title: 'Psychometric Assessment', slug: 'psychometric-assessment', icon: '🧠' },
    { title: 'Subject & Career', slug: 'subject-career', icon: '📋' },
    { title: 'Competitive Exam', slug: 'competitive-examination', icon: '🏆' },
    { title: 'Coding / AI / Robotics', slug: 'coding-ai-robotics', icon: '🤖' },
    { title: 'Language Learning', slug: 'language-learning', icon: '🌐' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://the3cedge.com/assets/img/logo.png' }} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/auth/login-select')}>
          <Text style={styles.loginBtnText}>Login ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTagline}>Your Success, Our Mission</Text>
        <Text style={styles.heroTitle}>Empowering Students{'\n'}to Achieve More</Text>
        <Text style={styles.heroSubtitle}>
          The comprehensive platform for academic excellence, career guidance, and personal growth.
        </Text>
        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/auth/login-select')}>
          <Text style={styles.ctaButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        {stats.map((stat, idx) => (
          <View key={idx} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose The 3C Edge?</Text>
        <Text style={styles.sectionSubtitle}>Comprehensive tools and guidance to help you succeed.</Text>
        {features.map((feature, idx) => (
          <View key={idx} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Explore Pages Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore</Text>
        <Text style={styles.sectionSubtitle}>Browse our resources and programs</Text>
        <View style={styles.webpagesGrid}>
          {webpages.map((page, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.webpageCard}
              onPress={() => router.push(`/webpages/${page.slug}`)}
            >
              <Text style={styles.webpageIcon}>{page.icon}</Text>
              <Text style={styles.webpageTitle}>{page.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Testimonials */}
      <View style={[styles.section, { backgroundColor: COLORS.surface }]}>
        <Text style={styles.sectionTitle}>What Our Students Say</Text>
        {testimonials.map((t, idx) => (
          <View key={idx} style={styles.testimonialCard}>
            <View style={styles.testimonialHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{t.avatar}</Text>
              </View>
              <View>
                <Text style={styles.testimonialName}>{t.name}</Text>
                <Text style={styles.testimonialRole}>{t.role}</Text>
              </View>
            </View>
            <Text style={styles.testimonialText}>"{t.text}"</Text>
          </View>
        ))}
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About The 3C Edge</Text>
        <Text style={styles.aboutText}>
          The 3C Edge is a comprehensive educational platform designed to bridge the gap between classroom learning and career success. We combine cutting-edge technology with expert guidance to provide students with personalized learning experiences.
        </Text>
        <Text style={styles.aboutText}>
          Our mission is to empower every student to discover their unique potential and achieve their academic and career goals.
        </Text>
        <View style={styles.highlightsList}>
          {['Personalized Learning Paths', 'Expert Career Counseling', 'AI-Powered Insights', 'Global University Network'].map((item, idx) => (
            <View key={idx} style={styles.highlightItem}>
              <Text style={styles.highlightCheck}>✓</Text>
              <Text style={styles.highlightText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Image source={{ uri: 'https://the3cedge.com/assets/img/logo.png' }} style={styles.footerLogo} resizeMode="contain" />
        <Text style={styles.footerDesc}>Empowering students to achieve their full potential through personalized education and career guidance.</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/share/1FKwumKTsB/')}>
            <Text style={styles.footerLink}>📘 Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://shreyartha.com')}>
            <Text style={styles.footerLink}>🌐 Website</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerCopy}>© 2025 The 3C Edge. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingTop: 50, paddingBottom: SPACING.md,
    backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  logo: { width: 120, height: 40 },
  loginBtn: {
    backgroundColor: COLORS.primary, paddingVertical: 10, paddingHorizontal: 24,
    borderRadius: 32,
  },
  loginBtnText: { color: COLORS.white, fontWeight: '600', fontSize: 14 },

  // Hero
  hero: {
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.xxl,
    backgroundColor: COLORS.secondary, alignItems: 'center',
  },
  heroTagline: { color: COLORS.primaryLight, fontSize: 14, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 },
  heroTitle: { color: COLORS.white, fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, lineHeight: 38 },
  heroSubtitle: { color: '#aaa', fontSize: 15, textAlign: 'center', marginBottom: 28, lineHeight: 22 },
  ctaButton: { backgroundColor: COLORS.primary, paddingVertical: 14, paddingHorizontal: 48, borderRadius: 32 },
  ctaButtonText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },

  // Stats
  statsSection: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around',
    paddingVertical: SPACING.xl, paddingHorizontal: SPACING.md, backgroundColor: COLORS.surface,
  },
  statItem: { alignItems: 'center', marginBottom: SPACING.md, width: '45%' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
  statLabel: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },

  // Section
  section: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.xl },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.secondary, textAlign: 'center', marginBottom: 8 },
  sectionSubtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: SPACING.lg },

  // Features
  featureCard: {
    flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 12,
    padding: SPACING.md, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2,
    borderWidth: 1, borderColor: COLORS.border,
  },
  featureIcon: { fontSize: 32, marginRight: SPACING.md },
  featureContent: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '700', color: COLORS.secondary, marginBottom: 4 },
  featureDesc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },

  // Webpages Grid
  webpagesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  webpageCard: {
    width: '48%', backgroundColor: COLORS.white, borderRadius: 12,
    padding: SPACING.md, marginBottom: 12, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000',
    shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2,
  },
  webpageIcon: { fontSize: 28, marginBottom: 8 },
  webpageTitle: { fontSize: 13, fontWeight: '600', color: COLORS.secondary, textAlign: 'center' },

  // Testimonials
  testimonialCard: {
    backgroundColor: COLORS.white, borderRadius: 12, padding: SPACING.lg,
    marginBottom: 12, borderWidth: 1, borderColor: COLORS.border,
  },
  testimonialHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  avatarText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  testimonialName: { fontWeight: '700', fontSize: 15, color: COLORS.secondary },
  testimonialRole: { fontSize: 12, color: COLORS.textSecondary },
  testimonialText: { fontSize: 14, color: COLORS.textSecondary, fontStyle: 'italic', lineHeight: 22 },

  // About
  aboutText: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 24, marginBottom: 16 },
  highlightsList: { marginTop: 8 },
  highlightItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  highlightCheck: { color: COLORS.primary, fontWeight: 'bold', fontSize: 18, marginRight: 10 },
  highlightText: { fontSize: 14, color: COLORS.text },

  // Footer
  footer: {
    backgroundColor: COLORS.secondary, padding: SPACING.xl, alignItems: 'center',
  },
  footerLogo: { width: 100, height: 35, marginBottom: 12 },
  footerDesc: { color: '#aaa', fontSize: 13, textAlign: 'center', marginBottom: 16, lineHeight: 20 },
  footerLinks: { flexDirection: 'row', gap: 24, marginBottom: 16 },
  footerLink: { color: '#ccc', fontSize: 14 },
  footerCopy: { color: '#666', fontSize: 11 },
});