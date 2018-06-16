import React from 'react';
import { View, Text, StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import RouterComponent from './Router';
import reducers from './store/reducers';
import color from './assets/color';
import SplashScreen from 'react-native-splash-screen';
import { Client } from 'bugsnag-react-native';

class App extends React.Component {
    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Setting a timer'];
    }
    componentWillMount() {
        const bugsnag = new Client();
        const config = {
            apiKey: "AIzaSyA-UwUODQ-tNcF8IYUEulxAjYR4NPH0O20",
            authDomain: "http://ptmosque.firebaseapp.com/",
            databaseURL: "https://ptmosque.firebaseio.com/",
            projectId: "ptmosque",
            storageBucket: "gs://ptmosque.appspot.com",
            messagingSenderId: "760047121068"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        SplashScreen.hide();
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

        return (
            <View style={{ flex: 1, backgroundColor: '#fff'}}>
                <StatusBar
                    backgroundColor={'#000'}
                    barStyle='light-content'
                    hidden={false}
                />
                <Provider store={store}>
                    <View style={{flex:1}}>
                        <RouterComponent  />
                    </View>
                </Provider>
            </View>
        );
    }
}

export default App;
