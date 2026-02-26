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

export default function SchoolLoginScreen() {
  const router = useRouter();
  const { setUserType } = useAuth();
  const [loginData, setLoginData] = useState({ emailOrMobile: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!loginData.emailOrMobile || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/api/school/auth/login', loginData);
      const responseData = res?.data?.data ?? res?.data;
      const token = responseData?.token;

      if (token) {
        await AsyncStorage.setItem('schoolUserToken', token);
        await AsyncStorage.setItem('schoolLoggedIn', 'true');
        await AsyncStorage.setItem('userType', 'school');
        await AsyncStorage.setItem('schoolUserType', responseData?.userType || '');
        setUserType('school');
      }
      Alert.alert('Success', 'Logged in successfully!');
      router.replace('/');
    } catch (err) {
      setError(err?.message || 'Invalid credentials. Please try again.');
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
        <Text style={styles.title}>🏫 School Staff Login</Text>
        <Text style={styles.subtitle}>Sign in to access your school dashboard</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Email / Mobile</Text>
        <TextInput
          style={styles.input} placeholder="Enter email or mobile" placeholderTextColor="#aaa"
          value={loginData.emailOrMobile}
          onChangeText={(v) => { setError(''); setLoginData({ ...loginData, emailOrMobile: v }); }}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]} placeholder="Enter password" placeholderTextColor="#aaa"
            value={loginData.password}
            onChangeText={(v) => { setError(''); setLoginData({ ...loginData, password: v }); }}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(v => !v)}>
            <Text style={{ fontSize: 20 }}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>Login</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  backText: { fontSize: 16, color: COLORS.primary, fontWeight: '600', marginBottom: SPACING.lg },
  logo: { width: 140, height: 50, alignSelf: 'center', marginBottom: SPACING.md },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: SPACING.xl },
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
    alignItems: 'center', marginTop: SPACING.lg,
  },
  primaryBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  error: { backgroundColor: '#ffe6e6', color: COLORS.error, padding: 12, borderRadius: 8, marginBottom: 12, textAlign: 'center' },
});