import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Transition } from 'react-transition-group';

const styles = StyleSheet.create({
  defaultStyle: {
    transitionTimingFunction: `ease-in-out`,
    transitionProperty: 'opacity, transform',
    opacity: 0,
    transform: [{ translateX: '100%' }],
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  entering: {
    opacity: 0,
    transform: [{ translateX: '100%' }],
    position: 'relative',
  },
  entered: {
    opacity: 1,
    transform: [{ translateX: 0 }],
    position: 'relative',
  },
} as any);

interface Props {
  in: boolean;
  duration: number;
  children: any;
}

export const SlideRight = ({ in: inProp, duration, children }: Props) => (
  <Transition mountOnEnter unmountOnExit appear in={inProp} timeout={duration}>
    {state => <View style={[{ transitionDuration: `${duration}ms` }, styles.defaultStyle, styles[state]] as any}>{children}</View>}
  </Transition>
);
