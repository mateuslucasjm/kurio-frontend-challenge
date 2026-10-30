import { useSession } from "@/features/auth/hooks/use-session";
import { CartProvider } from "@/features/market/context/cart-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router";
import "./styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppProviders() {
  const { data: session } = useSession();

  const userId = session?.user.id ?? null;

  return (
    <CartProvider key={userId ?? "guest"} userId={userId}>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKS === "true") {
    const { worker } = await import("./mocks/browser");

    await worker.start();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppProviders />
      </QueryClientProvider>
    </StrictMode>,
  );
});
