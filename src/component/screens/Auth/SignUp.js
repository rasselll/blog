import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { CustomButton, Input, Spinner } from "../../common";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import validate from '../../../Utility/validation';

import { signUpUser } from '../../../store/actions';



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
    console.log(this.state.controls);
  }


  renderImageContainer = () => {
    const imageContainer = (
      <Image
        style={{ height: Dimensions.get("window").height * 0.3 }}
        resizeMode="contain"
        source={require('../../../assets/signUpIcon.png')}
      />
    );

    if (this.state.viewMode === 'potrait') {
      return imageContainer;
    } else {
      return null;
    }
  }

  signUpHandler = () => {
    const fullname = this.state.controls.fullname.value;
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;

    this.props.signUp_user_in({ fullname, email, password });
  }
  renderButton = () => {
    if (this.props.loading) {
      return (
        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <Spinner size='large' />
        </View>
      )
    } else {
      return (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
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
        </View>
      );
    }
  }

  renderErrorMessage() {
    if (this.props.error) {
      return (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.errorMsgStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <View>
            <View style={{ alignItems: "center", paddingHorizontal: 12 }}>
              {this.renderImageContainer()}
            </View>
            <Input
              secureTextEntry={false}
              iconName={'md-person'}
              placeholder={'Full Name'}
              returnKeyType={'next'}
              autoCorrect={false}
              value={this.state.controls.fullname.value}
              onChangeText={val => this.updateInputState('fullname', val)}
              valid={this.state.controls.fullname.valid}
              touched={this.state.controls.fullname.touched}
            />
            <Input
              secureTextEntry={false}
              iconName={'md-mail'}
              placeholder={'E-mail'}
              returnKeyType={'next'}
              keyboardType='email-address'
              autoCorrect={false}
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
              value={this.state.controls.password.value}
              onChangeText={val => this.updateInputState('password', val)}
              valid={this.state.controls.password.valid}
              touched={this.state.controls.password.touched}
            />
            {this.renderErrorMessage()}
            {this.renderButton()}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  labelStyle: {
    paddingLeft: 20,
    width: '20%'
  },
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return {
    email,
    password,
    error,
    loading
  };

};

const mapDispatchToProps = dispatch => {
  return {
    signUp_user_in: ({ fullname, email, password }) => dispatch(signUpUser({ fullname, email, password }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);