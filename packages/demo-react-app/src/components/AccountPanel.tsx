import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from './Button';
import { action, Decorated } from './common';

const AccountMenuItemWithNumber = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text>{props.children}</Text>
      </View>
      <View style={{ paddingLeft: 10 }}>
        <Text>{props.number}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const AccountMenuItem = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text>{props.children}</Text>
    </View>
  </TouchableOpacity>
);

class AccountPanelBase extends Decorated.ReactComponent('relay', 'history', 'store', 'observer') {
  askLogout = () => {
    const ok = confirm('Log out?');
    if (ok) {
      this.props.store.logout();
    }
  };

  withCloseMenu = action((fn: any) => {
    return () => {
      this.props.store.panel = false;
      fn();
    };
  });

  render() {
    const { props, context } = this;

    return (
      <>
        <TouchableWithoutFeedback onPress={() => (this.props.store.panel = false)}>
          <View
            style={
              {
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.8)',
                top: 90,
                right: 0,
                bottom: 0,
                left: 0,
                visibility: this.props.store.panel ? 'visible' : 'hidden',
              } as any
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={
            {
              position: 'absolute',
              top: 90,
              right: 0,
              left: 0,
              visibility: this.props.store.panel ? 'visible' : 'hidden',
            } as any
          }
        >
          <View
            style={{
              position: 'relative',
              top: 0,
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 250,
                backgroundColor: '#fff',
                borderLeftColor: '#ccc',
                borderLeftWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#ccc',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            >
              <AccountMenuItemWithNumber number={0} onPress={this.withCloseMenu(() => this.props.history.push('/projects'))}>
                Projects
              </AccountMenuItemWithNumber>
              <View
                style={{
                  borderBottomColor: '#eee',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
              <AccountMenuItem onPress={this.withCloseMenu(() => this.props.history.push('/account'))}>Account</AccountMenuItem>
              <View
                style={{
                  borderBottomColor: '#eee',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
              <AccountMenuItem onPress={this.withCloseMenu(this.askLogout)}>Log out</AccountMenuItem>
              <View
                style={{
                  borderBottomColor: '#eee',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
              <View style={{ padding: 20 }}>
                <Button onPress={this.withCloseMenu(() => this.props.history.push('/new-project'))}>Create Project</Button>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export const AccountPanel = Decorated.GetComponent(AccountPanelBase);
