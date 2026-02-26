import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ActivityIndicator, ScrollView, Image, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING } from '../../constants/theme';

export default function StudentLoginScreen() {
  const router = useRouter();
  const { setUser, setUserType } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    fullName: '', email: '', mobile: '', schoolCode: '', password: '', terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      // Clear old tokens (matches website behavior)
      await AsyncStorage.multiRemove(['studentToken', 'userToken', 'adminToken', 'schoolUserToken', 'parentUserToken']);

      const res = await api.post('/api/auth/login', loginData);
      const token = res?.data?.token ?? res?.token;

      if (token) {
        await AsyncStorage.setItem('studentToken', token);
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('studentLoggedIn', 'true');
        await AsyncStorage.setItem('userType', 'student');
        setUserType('student');
      }
      Alert.alert('Success', 'Logged in successfully!');
      router.replace('/');
    } catch (err) {
      setError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError('');
    if (!signupData.fullName || !signupData.email || !signupData.mobile || !signupData.password) {
      setError('Please fill in all required fields');
      return;
    }
    if (!signupData.terms) {
      setError('Please accept the terms and conditions');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/signup', {
        fullName: signupData.fullName,
        email: signupData.email,
        mobile: signupData.mobile,
        schoolCode: signupData.schoolCode,
        password: signupData.password,
      });
      Alert.alert('Success', 'Account created! Please login.');
      setActiveTab('login');
      setLoginData({ email: signupData.email, password: '' });
    } catch (err) {
      setError(err?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container} contentContainerStyle={{ padding: SPACING.lg, paddingTop: 60 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Image source={{ uri: 'https://the3cedge.com/assets/img/logo.png' }} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>{activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}</Text>
        <Text style={styles.subtitle}>{activeTab === 'login' ? 'Sign in to access your dashboard' : 'Join The 3C Edge platform'}</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, activeTab === 'login' && styles.tabActive]} onPress={() => { setActiveTab('login'); setError(''); }}>
            <Text style={[styles.tabText, activeTab === 'login' && styles.tabTextActive]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'signup' && styles.tabActive]} onPress={() => { setActiveTab('signup'); setError(''); }}>
            <Text style={[styles.tabText, activeTab === 'signup' && styles.tabTextActive]}>Signup</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {activeTab === 'login' ? (
          <>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input} placeholder="Enter your email" placeholderTextColor="#aaa"
              value={loginData.email} onChangeText={(v) => { setError(''); setLoginData({ ...loginData, email: v }); }}
              keyboardType="email-address" autoCapitalize="none"
            />
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]} placeholder="Enter your password" placeholderTextColor="#aaa"
                value={loginData.password} onChangeText={(v) => { setError(''); setLoginData({ ...loginData, password: v }); }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(v => !v)}>
                <Text style={{ fontSize: 20 }}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>Login</Text>}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput style={styles.input} placeholder="Enter full name" placeholderTextColor="#aaa" value={signupData.fullName} onChangeText={(v) => setSignupData({ ...signupData, fullName: v })} />

            <Text style={styles.label}>Email *</Text>
            <TextInput style={styles.input} placeholder="Enter email" placeholderTextColor="#aaa" value={signupData.email} onChangeText={(v) => setSignupData({ ...signupData, email: v })} keyboardType="email-address" autoCapitalize="none" />

            <Text style={styles.label}>Mobile *</Text>
            <TextInput style={styles.input} placeholder="Enter mobile number" placeholderTextColor="#aaa" value={signupData.mobile} onChangeText={(v) => setSignupData({ ...signupData, mobile: v })} keyboardType="phone-pad" />

            <Text style={styles.label}>School Code (optional)</Text>
            <TextInput style={styles.input} placeholder="Enter school code" placeholderTextColor="#aaa" value={signupData.schoolCode} onChangeText={(v) => setSignupData({ ...signupData, schoolCode: v.toUpperCase() })} autoCapitalize="characters" />

            <Text style={styles.label}>Password *</Text>
            <TextInput style={styles.input} placeholder="Create a password" placeholderTextColor="#aaa" value={signupData.password} onChangeText={(v) => setSignupData({ ...signupData, password: v })} secureTextEntry />

            <TouchableOpacity style={styles.checkboxRow} onPress={() => setSignupData({ ...signupData, terms: !signupData.terms })}>
              <Text style={{ fontSize: 20 }}>{signupData.terms ? '☑️' : '⬜'}</Text>
              <Text style={styles.checkboxText}>I accept the Terms & Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignup} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>Create Account</Text>}
            </TouchableOpacity>
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  backText: { fontSize: 16, color: COLORS.primary, fontWeight: '600', marginBottom: SPACING.lg },
  logo: { width: 140, height: 50, alignSelf: 'center', marginBottom: SPACING.md },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: SPACING.lg },
  tabs: { flexDirection: 'row', marginBottom: SPACING.lg, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', backgroundColor: COLORS.surface },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.white },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.secondary, marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15,
    backgroundColor: COLORS.surface, marginBottom: 12, color: COLORS.text,
  },
  passwordRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  eyeBtn: { marginLeft: 8, padding: 8 },
  primaryBtn: {
    backgroundColor: COLORS.primary, paddingVertical: 15, borderRadius: 12,
    alignItems: 'center', marginTop: SPACING.md,
  },
  primaryBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  error: { backgroundColor: '#ffe6e6', color: COLORS.error, padding: 12, borderRadius: 8, marginBottom: 12, textAlign: 'center' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 8 },
  checkboxText: { marginLeft: 8, fontSize: 13, color: COLORS.textSecondary },
});