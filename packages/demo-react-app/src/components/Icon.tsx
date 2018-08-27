import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { View, ViewProps } from 'react-native';

export const SVGS = {
  chevron_right: ({ size, color, ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} {...rest} viewBox="0 0 24 24">
      <path
        style={{ fill: color }}
        d="M15.706 11.294l-6-6c-0.387-0.387-1.025-0.387-1.413 0s-0.387 1.025 0 1.413l5.294 5.294-5.294 5.294c-0.387 0.387-0.387 1.025 0 1.413 0.194 0.194 0.45 0.294 0.706 0.294s0.513-0.1 0.706-0.294l6-6c0.394-0.387 0.394-1.025 0-1.413z"
      />
    </svg>
  ),
};

export type IconName = keyof typeof SVGS;

export interface Props {
  size: number;
  color: string;
  name: IconName;
  style?: React.CSSProperties;
}

export class Icon extends React.Component<ViewProps & Props, {}> {
  static SVGS = SVGS;

  static renderToImage(props: Props): HTMLImageElement {
    const SVGIcon = Icon.SVGS[props.name];
    const { style, ...rest } = props;
    const component = <SVGIcon {...rest} />;
    const div = document.createElement('div');
    ReactDOM.render(component, div);
    const svg = div.childNodes[0] as HTMLElement;
    svg.removeAttribute('xmlns'); // necessary for IE
    const xml = new XMLSerializer().serializeToString(svg);
    const data = 'data:image/svg+xml;base64,' + btoa(xml);
    const img = document.createElement('img');
    const size_string = `${props.size}`;
    img.setAttribute('width', size_string); // necessary for IE
    img.setAttribute('height', size_string); // necessary for IE
    img.setAttribute('src', data);
    return img;
  }

  render() {
    const { props } = this;
    const SVGIcon = Icon.SVGS[props.name];
    const { style, ...rest } = props;
    return (
      <View style={[{ width: props.size, height: props.size }, style]}>
        <SVGIcon {...rest} />
      </View>
    );
  }
}
