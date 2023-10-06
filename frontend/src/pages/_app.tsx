// pages/_app.js
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { store } from '@/shared/store'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import '@/localization'
import '@/app/index.scss'
import { Jost } from '@next/font/google'

const jost = Jost({
  subsets: ['latin'],
})

function App({ Component, pageProps }: AppPropsType) {
  return (
      <main className={jost.className}>
      <Provider store={store}>
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
      </Provider>
    </main>
  )
}

export default App
