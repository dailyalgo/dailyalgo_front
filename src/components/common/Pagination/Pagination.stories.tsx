import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Example/Pagination",
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  args: {
    totalCnt: 30,
    page: 1,
    setPage: () => {},
  },
};
