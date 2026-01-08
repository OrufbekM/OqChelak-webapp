import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          main: { value: "#3188E1" },
          50: { value: "#EFF6FF" },
          100: { value: "#DBEAFE" },
          600: { value: "#2563EB" },
        },
        text: {
          dark: { value: "#1F1F1F" },
          light: { value: "#F1F1F1" },
          timer: { value: "#8C8C8C" },
        },
        product: {
          bread: { value: "#FFF9E6" },
          milk: { value: "#F0F9FF" },
          yogurt: { value: "#F5F0FF" },
          cream: { value: "#FFF5F0" },
          breadDark: { value: "#2C261F" },
          milkDark: { value: "#1A2835" },
          yogurtDark: { value: "#2A2233" },
          creamDark: { value: "#352724" },
        },
        semantic: {
          success: { value: "#10B981" },
          error: { value: "#EF4444" },
          warning: { value: "#F59E0B" },
        },
      },

      fonts: {
        heading: {
          value:
            "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        body: {
          value:
            "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        mono: {
          value:
            "'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
        },
      },

      fontSizes: {
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
      },

      fontWeights: {
        normal: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
        bold: { value: "700" },
        extrabold: { value: "800" },
        black: { value: "900" },
      },

      radii: {
        md: { value: "0.5rem" },
        lg: { value: "0.75rem" },
        xl: { value: "1rem" },
        "2xl": { value: "1.5rem" },
        full: { value: "9999px" },
      },
    },

    semanticTokens: {
      colors: {
        "bg.primary": {
          default: { value: "#FFFFFF" },
          _dark: { value: "#1A202C" },
        },
        "bg.secondary": {
          default: { value: "#F7FAFC" },
          _dark: { value: "#2D3748" },
        },
        "text.primary": {
          default: { value: "{colors.text.dark}" },
          _dark: { value: "{colors.text.light}" },
        },
        "text.timer": {
          value: "{colors.text.timer}",
        },
        "button.primary.bg": {
          default: { value: "{colors.brand.main}" },
          _dark: { value: "{colors.brand.600}" },
        },
        "button.primary.text": {
          value: "#FFFFFF",
        },
        "product.bread.bg": {
          default: { value: "{colors.product.bread}" },
          _dark: { value: "{colors.product.breadDark}" },
        },
        "product.milk.bg": {
          default: { value: "{colors.product.milk}" },
          _dark: { value: "{colors.product.milkDark}" },
        },
        "product.yogurt.bg": {
          default: { value: "{colors.product.yogurt}" },
          _dark: { value: "{colors.product.yogurtDark}" },
        },
        "product.cream.bg": {
          default: { value: "{colors.product.cream}" },
          _dark: { value: "{colors.product.creamDark}" },
        },
      },

      fontSizes: {
        "hero.title": { value: "{fontSizes.4xl}" },
        "section.title": { value: "{fontSizes.2xl}" },
        "button.text": { value: "{fontSizes.md}" },
      },

      fontWeights: {
        "hero.title": { value: "{fontWeights.extrabold}" },
        "section.title": { value: "{fontWeights.bold}" },
        "button.text": { value: "{fontWeights.medium}" },
      },
    },
  },

  globalCss: {
    "html, body": {
      fontFamily: "{fonts.body}",
      backgroundColor: "{colors.bg.primary}",
      color: "{colors.text.primary}",
    },
    h1: {
      fontFamily: "{fonts.heading}",
      fontWeight: "{fontWeights.extrabold}",
    },
    h2: {
      fontFamily: "{fonts.heading}",
      fontWeight: "{fontWeights.bold}",
    },
    button: {
      fontFamily: "{fonts.body}",
      fontWeight: "{fontWeights.medium}",
    },
  },
});

export const system = createSystem(defaultConfig, config);
