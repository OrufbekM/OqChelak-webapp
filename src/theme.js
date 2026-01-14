import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      sizes: {
        container: {
          xs: { value: "320px" },
          sm: { value: "640px" },
          md: { value: "768px" },
          lg: { value: "1024px" },
          xl: { value: "1440px" },
        },
      },

      colors: {
        brand: {
          main: { value: "#3188E1" },
          50: { value: "#EFF6FF" },
          100: { value: "#DBEAFE" },
          600: { value: "#2563EB" },
          500: { value: "#FFFAFA" },
          700: { value: "#1A202C" },
          800: { value: "#F7FAFC" },
          900: { value: "#2d3748" },
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

        accent: {
          orange: { value: "#FF4D00" },
          orange50: { value: "#FFF5F0" },
          orange100: { value: "#FFE8D6" },
          orange600: { value: "#E63E00" },

          yellow: { value: "#FFEC73" },
          yellow50: { value: "#FFFBE6" },
          yellow100: { value: "#FFF7CC" },
          yellow600: { value: "#FFD700" },
          yellowBright: { value: "#FFE330" },
          yellowBorder: { value: "#FCE83B" },
          yellowPale: { value: "#FFF5B7" },
          yellowCard: { value: "#FDFBEB" },

          peach: { value: "#FFB39C" },
          grayDark: { value: "#57585D" },
          grayButton: { value: "#4A4A4A" },

          lightBlue: { value: "#62D3FF" },
          blue: { value: "#377EDA" },
          blueBorder: { value: "#1976D2" },
          blueLightAlt: { value: "#90CAF9" },
          blueDarkAlt: { value: "#0D47A1" },
          blueCard: { value: "#2C3E50" },

          green: { value: "#4CAF50" },
          greenSuccess: { value: "#4CAF50" },
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
            "'JetBrains Mono', SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace",
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
      },

      radius: {
        md: { value: "0.5rem" },
        lg: { value: "0.75rem" },
        xl: { value: "1rem" },
        "2xl": { value: "1.5rem" },
        full: { value: "9999px" },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          primary: {
            value: { base: "#FFFAFA", _dark: "#1E1E1E" },
          },
          secondary: {
            value: { base: "#f5f5f5", _dark: "#212121" },
          },
          input: {
            value: { base: "#F4F6F5", _dark: "#3F3F3F" },
          },
        },

        text: {
          primary: {
            value: { base: "{colors.text.dark}", _dark: "{colors.text.light}" },
          },
          timer: {
            value: "{colors.text.timer}",
          },
        },

        button: {
          primary: {
            bg: {
              value: {
                base: "{colors.brand.main}",
                _dark: "{colors.brand.600}",
              },
            },
            text: {
              value: "{colors.text.light}",
            },
          },
        },

        product: {
          bread: {
            bg: {
              value: {
                base: "{colors.product.bread}",
                _dark: "{colors.product.breadDark}",
              },
            },
          },
          milk: {
            bg: {
              value: {
                base: "{colors.product.milk}",
                _dark: "{colors.product.milkDark}",
              },
            },
          },
          yogurt: {
            bg: {
              value: {
                base: "{colors.product.yogurt}",
                _dark: "{colors.product.yogurtDark}",
              },
            },
          },
          cream: {
            bg: {
              value: {
                base: "{colors.product.cream}",
                _dark: "{colors.product.creamDark}",
              },
            },
          },
        },
      },
    },
  },

  globalCss: {
    "*": {
      boxSizing: "border-box",
      // Hide scrollbar globally for all scrollable elements
      scrollbarWidth: "none", // Firefox
      "&::-webkit-scrollbar": {
        display: "none", // Chrome, Safari, Edge
      },
    },
    "html, body": {
      fontFamily: "{fonts.body}",
      bg: "bg.primary",
      color: "text.primary",
      overflowX: "hidden",
      maxWidth: "100vw",
      margin: 0,
      padding: 0,
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    body: {
      position: "relative",
      width: "100%",
    },
    "#root": {
      width: "100%",
      maxWidth: "100vw",
      overflowX: "hidden",
      position: "relative",
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
