import type { Meta, StoryObj } from "@storybook/react";
import { DeleteUserModal } from "./DeleteUserModal";

const meta: Meta<typeof DeleteUserModal> = {
  component: DeleteUserModal,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DeleteUserModal>;

export const Default: Story = {
  args: {},
};
