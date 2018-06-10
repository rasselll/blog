import React from 'react';
import { Dimensions, Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { CustomButton, Input, Spinner } from "../../common";
import validate from '../../../Utility/validation';
import { connect } from 'react-redux';
import { loginUser } from '../../../store/actions'

class Login extends React.Component {

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateMode);

    this.state = {
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
            minLength: 1
          },
          touched: false
        }
      },
      loading: false
    }
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

  renderImageContainer = () => {
    const imageContainer = (
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Image
          style={{ height: Dimensions.get("window").height * 0.3 }}
          resizeMode="contain"
          source={require('../../../assets/loginIcon.png')}
        />
      </View>
    );

    if (this.state.viewMode === 'potrait') {
      return imageContainer;
    }
  }

  loginHandler = () => {
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.setState({
      loading: true
    })
    this.clearError()
    this.props.log_user_in({ email, password });
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

  clearError() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 3000);
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always"
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <View>
            {this.renderImageContainer()}
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
              value={this.state.controls.password.value}
              onChangeText={val => this.updateInputState('password', val)}
              valid={this.state.controls.password.valid}
              touched={this.state.controls.password.touched}
            />

            {this.renderErrorMessage()}

            <View style={{ alignItems: "center", marginVertical: 20 }}>
              {this.state.loading ? <Spinner size='large' /> : <CustomButton
                onPress={this.loginHandler}
                disable={
                  !this.state.controls.email.valid ||
                  !this.state.controls.password.valid
                }
              > Login</CustomButton>}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMsgStyle: {
    fontSize: 10,
    alignSelf: 'center',
    color: 'red'
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
    log_user_in: ({ email, password }) => dispatch(loginUser({ email, password }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);