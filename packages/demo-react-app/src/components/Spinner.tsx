import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Decorated, observable, mobxDecorate } from './common';
import { FullContainer } from './FullContainer';

const styles = StyleSheet.create({
  cover: {
    transitionTimingFunction: `ease-in-out`,
    transitionProperty: 'opacity',
    transitionDuration: '2000ms',
    transitionDelay: '300ms',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
} as any);

class SpinnerBase extends Decorated.ReactComponent('store', 'observer') {
  opacity = 0;
  alive = false;

  handler = x => {
    this.alive = !!x;
    requestAnimationFrame(() => {
      if (!this.alive) return;
      this.opacity = x ? 1 : 0;
    });
  };

  render() {
    return (
      <FullContainer>
        <View ref={this.handler} style={[styles.cover, { opacity: this.opacity }]}>
          <ActivityIndicator size={100} />
        </View>
      </FullContainer>
    );
  }
}

mobxDecorate(SpinnerBase, {
  opacity: observable,
});

export const Spinner = Decorated.GetComponent(SpinnerBase);
