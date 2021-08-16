import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import Reducer from '../store/reducer';

const store = createStore(Reducer);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
