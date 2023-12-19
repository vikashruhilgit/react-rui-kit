import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from "../../lib/components/Radio";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Radio',
  component: Radio,
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
} satisfies Meta<typeof Radio>;

const items = [
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'Phone (SMS)' },
  { id: 'push', label: 'Push notification' },
]

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    items: items,
    heading: "Notifications",
    subHeading: "How do you prefer to receive notifications?"
  },
  render: (args) => {
    return <Radio {...args} />
  }
};