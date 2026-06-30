import { Toaster } from "sonner";

import { RouterProvider } from "react-router-dom";

import { router } from "./router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />

      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "min-h-16 w-[420px] rounded-xl border shadow-lg px-5 py-4",
            title: "text-base font-semibold",
            description: "text-sm text-muted-foreground",
          },
        }}
      />
    </>
  );
}
