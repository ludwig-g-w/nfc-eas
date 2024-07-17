import { trpc } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { DevToolsBubble } from "react-native-react-query-devtools";

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    // @ts-ignore works well
    trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.EXPO_PUBLIC_SERVER_URL,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === "development" ? <DevToolsBubble /> : null}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default Providers;
