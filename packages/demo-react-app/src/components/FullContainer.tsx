import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const styles = StyleSheet.create({
  /**
   * Ensure that the application covers the whole screen.
   */
  container: {
    flex: 1,
  },
});

export const FullContainer = class FullContainer extends React.Component<ViewProps> {
  render() {
    return (
      <View pointerEvents="box-none" style={[styles.container, StyleSheet.absoluteFill, this.props.style]}>
        <View children={this.props.children} pointerEvents="box-none" style={styles.container} />
      </View>
    );
  }
};
