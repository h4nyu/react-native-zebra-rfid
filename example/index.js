/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { getStorybookUI, configure } from '@storybook/react-native';
import App from './App';

AppRegistry.registerComponent(appName, () => App);
