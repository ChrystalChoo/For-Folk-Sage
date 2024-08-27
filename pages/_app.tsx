import React from 'react'
import type { AppProps } from 'next/app'
import { CartProvider } from '../store/context/CartContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp