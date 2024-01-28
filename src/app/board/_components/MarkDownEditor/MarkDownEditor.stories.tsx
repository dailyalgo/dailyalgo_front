import type { Meta, StoryObj } from "@storybook/react";
import { MarkDownEditor } from "./MarkDownEditor";

const meta: Meta<typeof MarkDownEditor> = {
  component: MarkDownEditor,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MarkDownEditor>;

export const Default: Story = {
  args: {},
};
