export type ButtonVariant =
  | 'PrimaryCTAButton'
  | 'PrimaryCTAIndigoButton'
  | 'SecondaryCTAButton'
  | 'WithoutBackgroundButton'
  | 'OnlyTextButton'
  | 'ErrorButton'
  | 'ErrorButtonWithBackground'

export const BUTTON_STYLES: Record<string, ButtonVariant> = {
  primaryCta: 'PrimaryCTAButton',
  primaryCtaIndigo: 'PrimaryCTAIndigoButton',
  secondaryCtaIndigo: 'SecondaryCTAButton',
  withoutBackground: 'WithoutBackgroundButton',
  onlyText: 'OnlyTextButton',
  error: 'ErrorButton',
  errorWithBackground: 'ErrorButtonWithBackground',
}

export const NEUTRAL = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
}

export const PRIMARY = {
  dashboard: {
    50: '#eff6ff',
    400: '#818cf8',
    600: '#4f46e5',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  main: {
    300: '#d4d4d8',
    500: '#71717a',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
}

export const SECONDARY = {
  50: '#fffbeb',
  300: '#fcd34d',
  600: '#d97706',
  800: '#92400e',
  900: '#713f12',
}

export const SUCCESS = {
  50: '#f0fdf4',
  300: '#86efac',
  500: '#22c55e',
  700: '#15803d',
  900: '#14532d',
}

export const WARNING = {
  50: '#fff7ed',
  300: '#fdba74',
  500: '#f97316',
  700: '#c2410c',
  900: '#7c2d12',
}

export const ERROR = {
  50: '#fef2f2',
  300: '#fca5a5',
  500: '#ef4444',
  700: '#b91c1c',
  900: '#7f1d1d',
}

export const SHADES = {
  50: '#FFFFFF',
  100: '#000000',
}
