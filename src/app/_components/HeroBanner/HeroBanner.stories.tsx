import type { Meta, StoryObj } from "@storybook/react";
import { HeroBanner } from "./HeroBanner";

const meta: Meta<typeof HeroBanner> = {
  component: HeroBanner,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeroBanner>;

export const Default: Story = {
  args: {},
};
