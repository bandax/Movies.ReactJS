// YourComponent.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Button } from './Button';

// This default export determines where your story goes in the story list
export default {
  title: 'Button Example',
  component: Button,
};

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};
