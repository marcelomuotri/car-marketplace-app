import { Text, type TextProps, StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'categoryIcon'
    | 'small'
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Text
      style={[
        { color },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'categoryIcon' && styles.categoryIcon,
        type === 'small' && styles.small,
        style,
      ]}
      allowFontScaling={false}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  small: {
    fontSize: 10,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  default: {
    fontSize: 12,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  categoryIcon: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
    color: '#939393',
    textAlign: 'center',
  },
  defaultSemiBold: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  title: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: 'Inter_400Regular',
  },
})
