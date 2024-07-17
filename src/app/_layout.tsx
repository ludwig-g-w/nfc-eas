import { PortalHost } from "@/components/primitives/portal";
import { Button } from "@/components/ui/button";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Large, P } from "@/components/ui/typography";
import Providers from "@/providers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

console.log(
  "process.env.EXPO_PUBLIC_SERVER_URL",
  process.env.EXPO_PUBLIC_SERVER_URL
);

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ErrorBoundary
      onError={(err) => console.log(err)}
      fallbackRender={(props) => {
        return (
          <View className="flex-1 px-2">
            <Button variant="destructive">
              <Large>Reset</Large>
            </Button>
            <P>{JSON.stringify(props.error)}</P>
          </View>
        );
      }}
    >
      <Providers>
        <GluestackUIProvider mode={isDarkColorScheme ? "light" : "dark"}>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <View className="flex-1 bg-background">
              <Slot />
            </View>
            <PortalHost />
          </ThemeProvider>
        </GluestackUIProvider>
      </Providers>
    </ErrorBoundary>
  );
}
