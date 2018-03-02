import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import LoginAlerts from './index';
import configureStore from '../../configureStore';

const store = configureStore();

addDecorator(story => <Provider store={store}>{story()}</Provider>);
storiesOf('LoginAlerts', module).add('Todo[VR]', () => <LoginAlerts />);
