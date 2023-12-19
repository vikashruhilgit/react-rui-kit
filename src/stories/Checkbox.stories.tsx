import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox, CheckboxItemProps } from "../../lib/components/Checkbox";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const items: CheckboxItemProps[] = [
  { id: 'email', label: 'Email', description: "Email description is here" },
  { id: 'sms', label: 'Phone (SMS)' },
  { id: 'push', label: 'Push notification' },
]

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    items: items,
    heading: "Notifications",
    subHeading: "How do you prefer to receive notifications?"
  },
  render: (args) => {
    return <Checkbox {...args} />
  }
};