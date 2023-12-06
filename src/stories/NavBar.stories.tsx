import type { Meta, StoryObj } from '@storybook/react';

import { NavBar } from "../../lib/components/NavBar";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/NavBar',
  component: NavBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: '',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  /* argTypes: {
    backgroundColor: { control: 'color' },
  }, */
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
  },
  render: (args) => {
    return <div style={{minWidth: '300px'}}><NavBar  {...args} /></div>
  }
};