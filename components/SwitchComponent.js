import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import DashboardComponent from './DashboardComponent';
import FocusComponent from './FocusComponent';
import CreateUpdateComponent from './CreateUpdateComponent'

const RootStack = createSwitchNavigator(
  {
    Focus: FocusComponent,
    Dashboard: DashboardComponent,
    CreateUpdate: CreateUpdateComponent
  },
  {
    initialRouteName: "Dashboard"
  }
)

const SwitchComponent = createAppContainer(RootStack)

export default SwitchComponent;