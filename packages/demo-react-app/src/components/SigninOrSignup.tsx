import * as React from 'react';
import { CheckBox, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { loginWithToken } from '../mutations/LoginWithTokenMutation';
import { requestCode } from '../mutations/RequestCodeMutation';
import { requestToken } from '../mutations/RequestTokenMutation';
import { SigninOrSignup_viewer } from '../__generated__/SigninOrSignup_viewer.graphql';
import { Button } from './Button';
import { ANONYMOUS_VIEWER_ID, COLORS, Decorated, observable, mobxDecorate } from './common';
import { LinkText } from './LinkText';
import { SlideRight } from './SlideRight';

type PageType = 'signup' | 'signin' | 'code' | 'loggedin';

const styles = StyleSheet.create({
  textInput: { borderWidth: 1, borderColor: COLORS.TEXT_INPUT_BORDER, padding: 14, fontSize: 20 },
});

interface Props {
  viewer: SigninOrSignup_viewer;
}

class SigninOrSignupComponentBase extends Decorated.ReactComponent<Props>('relay', 'history', 'store', 'observer') {
  page: PageType = this.props.viewer.id === ANONYMOUS_VIEWER_ID ? 'signup' : 'loggedin';

  fields = {
    first_name: '',
    last_name: '',
    email: '',
    code: '',
    code_token: '',
    auth_token: '',
    terms: false,
  };

  goSignin = () => {
    this.page = 'signin';
  };

  goSignup = () => {
    this.page = 'signup';
  };

  onRequestCode = async () => {
    this.props.store.addSpinner('onRequestCode');
    const { fields } = this;

    try {
      const { response, errors } = await requestCode(this.props.relay.environment, { email: fields.email });

      console.log('response', response, 'errors', errors);
      if (errors) {
        alert(errors);
      } else if (response && response.requestCode) {
        if (response.requestCode.errors) {
          alert(response.requestCode.errors);
        } else {
          fields.code_token = response.requestCode.code_token || '';
          this.page = 'code';
        }
      } else {
        throw 'FATAL: NO RESPONSE';
      }
    } catch (err) {
      alert(`Something went wrong.  Please check your entries and try again.`);
      console.log('err', err);
    }
    this.props.store.removeSpinner('onRequestCode');
  };

  onRequestToken = async () => {
    this.props.store.addSpinner('onRequestToken');
    const { fields } = this;

    try {
      const { response, errors } = await requestToken(this.props.relay.environment, {
        code_token: fields.code_token,
        code: fields.code,
      });

      console.log('response', response, 'errors', errors);
      if (errors) {
        alert(errors);
      } else if (response && response.requestToken) {
        if (response.requestToken.errors) {
          alert(response.requestToken.errors);
        } else {
          fields.auth_token = response.requestToken.auth_token || '';
          await this.onLoginWithToken();
        }
      } else {
        throw 'FATAL: NO RESPONSE';
      }
    } catch (err) {
      alert(`Something went wrong.  Please check your entries and try again.`);
      console.log('err', err);
    }
    this.props.store.removeSpinner('onRequestToken');
  };

  onLoginWithToken = async () => {
    this.props.store.addSpinner('onLoginWithToken');
    const { fields } = this;

    try {
      const { response, errors } = await loginWithToken(this.props.relay.environment, {
        auth_token: fields.auth_token,
      });

      console.log('response', response, 'errors', errors);
      if (errors) {
        alert(errors);
      } else if (response && response.loginWithToken) {
        if (response.loginWithToken.errors) {
          alert(response.loginWithToken.errors);
        } else {
          if (response.loginWithToken.viewer.id !== ANONYMOUS_VIEWER_ID) {
            window.location.href = '/projects';
          } else {
            this.page = 'signup';
          }
        }
      } else {
        throw 'FATAL: NO RESPONSE';
      }
    } catch (err) {
      alert(`Something went wrong.  Please check your entries and try again.`);
      console.log('err', err);
    }
    this.props.store.removeSpinner('onLoginWithToken');
  };

  onDashboard = async () => {
    this.props.history.push('/projects');
  };

  renderSignup = () => {
    const { fields } = this;
    return (
      <View>
        <Text style={{ fontSize: 30 }}>Sign up</Text>
        <Text>
          {'or '}
          <TouchableOpacity onPress={this.goSignin}>
            <LinkText>sign in to your account</LinkText>
          </TouchableOpacity>
        </Text>
        <View style={{ height: 20 }} />
        <TextInput
          placeholder="First name"
          style={styles.textInput}
          value={fields.first_name}
          onChangeText={x => (fields.first_name = x)}
        />
        <View style={{ height: 20 }} />
        <TextInput placeholder="Last name" style={styles.textInput} value={fields.last_name} onChangeText={x => (fields.last_name = x)} />
        <View style={{ height: 20 }} />
        <TextInput placeholder="Email" style={styles.textInput} value={fields.email} onChangeText={x => (fields.email = x)} />
        <View style={{ height: 20 }} />
        <View style={{ flexDirection: 'row' }}>
          <CheckBox color={COLORS.COLOR3} style={{ height: 30, width: 30 }} value={fields.terms} onValueChange={x => (fields.terms = x)} />
          <View style={{ width: 10 }} />
          <Text style={{ fontSize: 20 }}>
            I agree to the <LinkText>MyApp Terms</LinkText>
          </Text>
        </View>
        <View style={{ height: 20 }} />

        <Button onPress={this.onRequestCode}>Sign up</Button>
      </View>
    );
  };

  renderSignin = () => {
    const { fields } = this;
    return (
      <View>
        <Text style={{ fontSize: 30 }}>Sign in</Text>
        <Text>
          {'or '}
          <TouchableOpacity onPress={this.goSignup}>
            <LinkText>sign up for an account</LinkText>
          </TouchableOpacity>
        </Text>
        <View style={{ height: 20 }} />
        <TextInput placeholder="Email" style={styles.textInput} value={fields.email} onChangeText={x => (fields.email = x)} />
        <View style={{ height: 20 }} />
        <Button onPress={this.onRequestCode}>Sign in</Button>
      </View>
    );
  };

  renderCode = () => {
    const { fields } = this;
    return (
      <View>
        <Text style={{ fontSize: 30 }}>Check your email</Text>
        <Text>for the verification code we just sent you.</Text>
        <View style={{ height: 20 }} />
        <TextInput placeholder="Code from email" style={styles.textInput} value={fields.code} onChangeText={x => (fields.code = x)} />
        <View style={{ height: 20 }} />
        <Button onPress={this.onRequestToken}>Verify</Button>
      </View>
    );
  };

  renderLoggedin = () => {
    return (
      <View>
        <Text style={{ fontSize: 30 }}>Welcome!</Text>
        <Text>{this.props.viewer.id}</Text>
        <View style={{ height: 20 }} />
        <Button onPress={this.onDashboard}>Go to Dashboard</Button>
      </View>
    );
  };

  render() {
    const { page } = this;
    return (
      <View>
        <SlideRight duration={300} in={page === 'signup'}>
          {this.renderSignup()}
        </SlideRight>
        <SlideRight duration={300} in={page === 'signin'}>
          {this.renderSignin()}
        </SlideRight>
        <SlideRight duration={300} in={page === 'code'}>
          {this.renderCode()}
        </SlideRight>
        <SlideRight duration={300} in={page === 'loggedin'}>
          {this.renderLoggedin()}
        </SlideRight>
      </View>
    );
  }
}

mobxDecorate(SigninOrSignupComponentBase, {
  page: observable,
  fields: observable,
});

const SigninOrSignupComponent = Decorated.GetComponent(SigninOrSignupComponentBase);

export const SigninOrSignupContainer = createFragmentContainer(
  SigninOrSignupComponent,
  graphql`
    fragment SigninOrSignup_viewer on Viewer {
      id
    }
  `
);
