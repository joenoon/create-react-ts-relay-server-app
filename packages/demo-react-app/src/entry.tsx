import { AppRegistry } from 'react-native-web';
import 'regenerator-runtime/runtime';
import { AppComponent } from './components/App';
import * as serviceWorker from './serviceWorker';

// register the app
AppRegistry.registerComponent('App', () => AppComponent);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
