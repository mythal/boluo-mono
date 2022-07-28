import { usePreventScroll } from '@react-aria/overlays';
import { Providers } from '../components/global/Providers';
import type { AppPropsWithLayout } from '../helper/layout';
import 'ui/src/tailwind.css';

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(new URL('workers/dist/serviceWorker.js', import.meta.url))
      .then(function (reg) {
        // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope);
      })
      .catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + String(error));
      });
  }
}

if (typeof window !== 'undefined') {
  registerServiceWorker();
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const title = Component.title;
  usePreventScroll();
  return getLayout(
    <Providers>
      <Component {...pageProps} />
    </Providers>,
    title
  );
}
export default App;
