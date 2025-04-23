import { SessionProvider } from 'next-auth/react';
import MainNavigation from '../../components/layout/main-navigation';
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
    <MainNavigation />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
