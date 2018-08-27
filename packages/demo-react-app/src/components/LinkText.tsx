import React from 'react';
import { StyleSheet, Text, ViewProps } from 'react-native';
import { COLORS } from './common';

const styles = StyleSheet.create({
  link: {
    color: COLORS.COLOR3,
  },
});

export class LinkText extends React.Component<ViewProps> {
  render() {
    const { style, ...props } = this.props;
    return <Text style={[styles.link, style]} {...props} />;
  }
}
