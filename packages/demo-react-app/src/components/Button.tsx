import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { COLORS } from './common';

const styles = StyleSheet.create({
  button: {
    padding: 14,
    backgroundColor: COLORS.COLOR3,
  },
  text: {
    fontSize: 20,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});

export class Button extends React.Component<ViewProps & { onPress: any; style?: any }, {}> {
  render() {
    const { children } = this.props;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.button, this.props.style]}>
          {typeof children === 'string' ? <Text style={styles.text}>{children}</Text> : { children }}
        </View>
      </TouchableOpacity>
    );
  }
}
