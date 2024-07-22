import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
<<<<<<< HEAD
=======
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from './components/theme-provider'

>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routes} />
    </QueryClientProvider>
=======
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routes} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
  </React.StrictMode>,
)
