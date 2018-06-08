import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, ActivityIndicator, Text, View} from 'react-native';
import {CustomButton, Input, Spinner} from "../../common";
import {Content} from 'native-base'
import {connect} from 'react-redux';
import KeyboardSpacer from './../../common/Keyboard'
import validate from '../../../Utility/validation';

import {signUpUser} from '../../../store/actions';

const {width, height} = Dimensions.get('window')

class SignUp extends Component {

    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            fullname: {
                value: '',
                valid: false,
                validationRules: {
                    lastName: false
                },
                touched: false
            }
        }
    }

    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateMode);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateMode);
    }

    updateMode = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'potrait' : 'landscape'
        })
    }

    updateInputState = (key, val) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: val,
                        valid: validate(val, prevState.controls[key].validationRules),
                        touched: true
                    }
                }
            }
        });
    }

    signUpHandler = () => {
        const fullname = this.state.controls.fullname.value;
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;

        console.log(fullname, email, password)
        this.props.signUp_user_in({fullname, email, password});
    }
    renderButton = () => {
        if (this.props.loading) {
            return <ActivityIndicator size='large'/>;
        }
        return (
            <CustomButton
                onPress={this.signUpHandler}
                disable={
                    !this.state.controls.email.valid ||
                    !this.state.controls.password.valid ||
                    !this.state.controls.fullname.valid
                }
            >
                Get Started
            </CustomButton>
        );
    }

    renderErrorMessage() {
        if (this.props.error) {
            return (
                <View style={{marginBottom: 10}}>
                    <Text style={styles.errorMsgStyle}>{this.props.error}</Text>
                </View>
            );
        }
    }

    render() {

        return (
            <Content style={{backgroundColor: 'white'}}>
                <Image
                    style={styles.iconStyle}
                    source={require('../../../assets/signUpIcon.png')}
                />
                <View style={styles.inputContainer}>
                    <Input
                        secureTextEntry={false}
                        iconName={'md-person'}
                        placeholder={'Full Name'}
                        style={styles.inputStyle}
                        returnKeyType={'next'}
                        autoCorrect={false}
                        labelStyl={styles.labelStyle}
                        value={this.state.controls.fullname.value}
                        onChangeText={val => this.updateInputState('fullname', val)}
                        valid={this.state.controls.fullname.valid}
                        touched={this.state.controls.fullname.touched}
                    />
                    <Input
                        secureTextEntry={false}
                        iconName={'md-mail'}
                        placeholder={'E-mail'}
                        style={styles.inputStyle}
                        returnKeyType={'next'}
                        keyboardType='email-address'
                        autoCorrect={false}
                        labelStyl={styles.labelStyle}
                        value={this.state.controls.email.value}
                        onChangeText={val => this.updateInputState('email', val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                    />
                    <Input
                        secureTextEntry={true}
                        iconName={'md-lock'}
                        placeholder={'Password'}
                        returnKeyType={'done'}
                        labelStyl={styles.labelStyle}
                        style={styles.inputStyle}
                        value={this.state.controls.password.value}
                        onChangeText={val => this.updateInputState('password', val)}
                        valid={this.state.controls.password.valid}
                        touched={this.state.controls.password.touched}
                    />
                </View>
                {this.renderErrorMessage()}
                <View style={styles.buttonContainer}>
                {this.renderButton()}
                </View>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    iconStyle: {
        width: width,
        height: height / 2.8
    },
    inputContainer: {
        flex: 1,
        flexDirection : 'column',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        width: width,
    },
    inputStyle: {
        color: '#000',
        width: '80%'
    },
    labelStyle: {
        paddingLeft: 20,
        width: '20%'
    },
});

const mapStateToProps = ({auth}) => {
    const {email, password, error, loading} = auth;
    return {
        email,
        password,
        error,
        loading
    };

};

const mapDispatchToProps = dispatch => {
    return {
        signUp_user_in: ({fullname, email, password}) => dispatch(signUpUser({fullname, email, password}))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);