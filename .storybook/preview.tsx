import React from "react";
import type { Preview, Decorator } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme, darkTheme } from "../src/theme";

/**
 * Every story renders inside the library's own ThemeProvider, so what you see
 * in Storybook is what consumers of `@zesty-io/material` get. The toolbar
 * switch below flips between the exported `theme` and `darkTheme`.
 */
const withZestyTheme: Decorator = (Story, context) => {
  const activeTheme = context.globals.theme === "dark" ? darkTheme : theme;

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <Box
        sx={{
          p: 3,
          minHeight: "100%",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Story />
      </Box>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withZestyTheme],

  globalTypes: {
    theme: {
      description: "Zesty theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: "light",
  },

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // The theme decorator owns the canvas background; the backgrounds addon
    // would only fight with it.
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Theme",
          "Icons",
          "Components",
          "Field Types",
          "MUI",
          "*",
        ],
      },
    },
  },

  tags: ["autodocs"],
};

export default preview;
