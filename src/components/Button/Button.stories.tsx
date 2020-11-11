// Buttom.stories.tsx
import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from './Button';

// This default export determines where your story goes in the story list
export default {
  title: 'Movies/Button',
  component: Button,
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const ButtonSearch = Template.bind({});
ButtonSearch.args = {
  buttonType: 'btn-search',
  label: 'Search',
};

export const ButtonAddMovieh = Template.bind({});
ButtonAddMovieh.args = {
  buttonType: 'btn-add-movie',
  label: 'Add Movie',
};
