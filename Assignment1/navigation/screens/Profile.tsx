import React, { useState, useEffect } from 'react';
import { VirtualizedList, View, Text } from 'react-native';

type ProfileProps = {
  navigation: any;
};

export default function Profile({ navigation }: ProfileProps) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Profile Screen</Text>
        </View>
  );
};

