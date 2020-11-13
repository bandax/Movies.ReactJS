import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { DeleteMovieWindow, IDeleteMovieWindowProps } from './DeleteMovie';

export default {
  title: 'Movies/Delete Movie',
  component: DeleteMovieWindow,
} as Meta;

const Template: Story<IDeleteMovieWindowProps> = (args) => (
  <DeleteMovieWindow {...args} />
);

export const HideWindow = Template.bind({});
HideWindow.args = {
  showDeleteMovieModal: false,
};

export const ShowWindow = Template.bind({});
ShowWindow.args = {
  showDeleteMovieModal: true,
};
