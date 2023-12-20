import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs, BreadcrumbsItem } from "../../lib/components/Breadcrumbs";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
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
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

const items: BreadcrumbsItem[] = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
]

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    items
  },
  render: (args) => {
    return <Breadcrumbs {...args} />
  }
};