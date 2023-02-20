import type { AppProps } from 'next/app';
import { ThemeProvider, useTheme } from 'next-themes';
import Head from 'next/head';

import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Sudoku" />
        <meta name="keywords" content="Sudoku" />
        <title>Sudoku</title>

        <meta name="theme-color" content={resolvedTheme === 'dark' ? '#000000' : '#f5f5f5'} />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

const MyAppWrapper = (props: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <MyApp {...props} />
    </ThemeProvider>
  );
};

export default MyAppWrapper;
