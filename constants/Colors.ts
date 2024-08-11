/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#3D9970'
const tintColorDark = '#fff'

export const Colors = {
  light: {
    text: '#393F42',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    borderRadius: 8,
    borderFilterButton: '#F0F2F1',
    selectedFilterButton: '#E9FFF8',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    borderRadius: 8,
    borderFilterButton: '#F0F2F1',
    selectedFilterButton: '#E9FFF8',
  },
}
