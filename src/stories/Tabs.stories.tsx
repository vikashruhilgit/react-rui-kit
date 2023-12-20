import type { Meta, StoryObj } from '@storybook/react';

import { Tabs, TabItem } from "../../lib/components/Tabs";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
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
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs: TabItem[] = [
  { name: 'My Account', href: '#', current: false, icon: "UserIcon" },
  { name: 'Company', href: '#', current: false, icon: "BuildingOfficeIcon" },
  { name: 'Team Members', href: '#', current: true, icon: "CreditCardIcon" },
  { name: 'Billing', href: '#', current: false, icon: "ArchiveBoxXMarkIcon" },
]


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    tabs
  },
  render: (args) => {
    return <div><Tabs {...args}>Hello</Tabs></div>
  }
};