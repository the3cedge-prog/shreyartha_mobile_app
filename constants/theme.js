// Matches the Shreyartha website brand colors
export const COLORS = {
  primary: '#b0003a',        // Brand red/maroon (from LoginDropdown gradient)
  primaryDark: '#8a002e',
  primaryLight: '#d4004a',
  secondary: '#1a1a2e',      // Dark navy (from LandingPage.css)
  accent: '#4F46E5',         // Indigo accent
  background: '#ffffff',
  surface: '#f8f9fa',
  text: '#1a1a2e',
  textSecondary: '#666666',
  textLight: '#999999',
  border: '#eeeeee',
  error: '#dc3545',
  success: '#28a745',
  white: '#ffffff',
};

export const FONTS = {
  regular: { fontSize: 16, color: COLORS.text },
  bold: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.secondary },
  subtitle: { fontSize: 18, color: COLORS.textSecondary },
  small: { fontSize: 13, color: COLORS.textLight },
};

export const SPACING = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
};