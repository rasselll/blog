import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import RouterComponent from './Router';
import reducers from './store/reducers';
import {Client} from 'bugsnag-react-native';

class App extends Component {
    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Setting a timer'];
    }

    componentWillMount() {
        const bugsnag = new Client();
        const config = {
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: ""
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

        return (
            <View style={{flex: 1, backgroundColor: '#e6ffff'}}>
                <StatusBar
                    backgroundColor={'#000'}
                    barStyle='light-content'
                    hidden={false}
                />
                <Provider store={store}>
                    <View style={{flex: 1}}>
                        <RouterComponent/>
                    </View>
                </Provider>
            </View>
        );
    }
}

export default App;
