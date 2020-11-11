import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import clasificationTypes from '../../data/clasifications.json';

import { AddMovieWindow, IAddMovieWindowProps } from './AddMovieWindow';

export default {
  title: 'Movies/Add Movie Window',
  component: AddMovieWindow,
} as Meta;

const Template: Story<IAddMovieWindowProps> = (args) => (
  <AddMovieWindow {...args} />
);

export const HideWindow = Template.bind({});
HideWindow.args = {
  showModal: false,
  clasificationMovies: clasificationTypes,
};

export const ShowWindow = Template.bind({});
ShowWindow.args = {
  showModal: true,
  clasificationMovies: clasificationTypes,
};
