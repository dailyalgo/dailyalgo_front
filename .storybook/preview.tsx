import { Suspense, useEffect } from "react";
import { MediaQueryProvider } from "../src/hooks/useMediaQuery";

// import Backend from "i18next-http-backend";
// import i18n from "i18next";
// import i18nConfig from "../next-i18next.config";

import "../src/styles/base/_reset.scss";
import "../src/styles/base/_font.scss";
import React from "react";
import { Preview } from "@storybook/react";
import ReduxProvider from "src/redux/provider";

const customViewports = {
  DesktopXXLarge: {
    name: "DesktopXXLarge",
    styles: {
      width: "2560px",
      height: "100%",
    },
  },
  DesktopXLarge: {
    name: "DesktopXLarge",
    styles: {
      width: "1920px",
      height: "100%",
    },
  },
  DesktopLarge: {
    name: "DesktopLarge",
    styles: {
      width: "1440px",
      height: "100%",
    },
  },
  Desktop: {
    name: "Desktop",
    styles: {
      width: "1280px",
      height: "100%",
    },
  },
  Tablet: {
    name: "Tablet",
    styles: {
      width: "674px",
      height: "100%",
    },
  },
  Mobile: {
    name: "Mobile",
    styles: {
      width: "360px",
      height: "100%",
    },
  },
  MobileSm: {
    name: "MobileSmall",
    styles: {
      width: "280px",
      height: "100%",
    },
  },
};

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        { value: "ko", title: "Korean" },
        { value: "en", title: "English" },
      ],
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
  viewport: { viewports: customViewports, defaultViewport: "Desktop" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <ReduxProvider>
        <div style={{ margin: "3em" }}>
          <Story />
        </div>
      </ReduxProvider>
    ),
  ],
};

export default preview;
