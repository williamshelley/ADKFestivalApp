import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ImageBackground } from 'react-native';

import { styles } from '../styles';
const drawerSource = require("../images/swan.jpg");

export default DrawerContent = (props) => (
    <ImageBackground style={styles.container} source={drawerSource}>
      <DrawerContentScrollView
        contentContainerStyle={styles.drawerScrollView}
        {...props}>
        <DrawerItemList
          itemStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          {...props} />
      </DrawerContentScrollView>
    </ImageBackground>
  );