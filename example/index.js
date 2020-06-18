/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { getStorybookUI, configure } from '@storybook/react-native';
// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

AppRegistry.registerComponent(appName, () => StorybookUIRoot);
