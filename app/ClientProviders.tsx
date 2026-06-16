// app/ClientProviders.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/shared/redux/store";
import { Initialload } from "@/shared/layouts-components/contextapi";


export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [pageloading, setpageloading] = useState(false);


  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Initialload.Provider value={{ pageloading, setpageloading }}>
          {children}
        </Initialload.Provider>
      </Provider>
    </QueryClientProvider>
  );
}
