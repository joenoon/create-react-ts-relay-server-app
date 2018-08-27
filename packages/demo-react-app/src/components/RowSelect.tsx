import React from 'react';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { Icon } from './Icon';

interface Props extends ViewProps {
  title: string;
  subtitle?: string | null;
  noBorderBottom?: boolean;
  onPress: any;
}

export class RowSelect extends React.Component<Props> {
  render() {
    const { props } = this;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={{
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: props.noBorderBottom ? undefined : 1,
            borderBottomColor: props.noBorderBottom ? undefined : '#ccc',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16 }}>{props.title}</Text>
            {props.subtitle && <Text style={{ fontSize: 12 }}>{props.subtitle}</Text>}
          </View>
          <View>
            <Icon name="chevron_right" size={30} color="#999" style={{ marginTop: 2, marginRight: 2 }} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
