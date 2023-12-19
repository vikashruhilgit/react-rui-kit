import type { Meta, StoryObj } from '@storybook/react';

import { SliderOver } from "../../lib/components/SliderOver";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/SliderOver',
  component: SliderOver,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  /* argTypes: {
    backgroundColor: { control: 'color' },
  }, */
} satisfies Meta<typeof SliderOver>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    open: false,
    onClose: () => {
      console.log('close')
    },
  },
  render: (args) => {
    return <SliderOver {...args} />
  }
};