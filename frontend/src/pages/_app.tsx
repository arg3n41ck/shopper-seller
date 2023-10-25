// pages/_app.js
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import 'src/shared/localization'
import '@/app/index.scss'
import { Jost } from '@next/font/google'
import { WithProviders } from '@/app/providers'

const jost = Jost({
  subsets: ['latin'],
})

function App({ Component, pageProps }: AppPropsType) {
  return (
    <main className={jost.className}>
      <WithProviders pageProps={pageProps}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Component {...pageProps} />
      </WithProviders>
    </main>
  )
}

export default App
