import type { Meta, StoryObj } from "@storybook/react";
import { SideTab } from "./SideTab";

const meta: Meta<typeof SideTab> = {
  component: SideTab,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SideTab>;

export const Default: Story = {
  args: {
    tabList: ["tab1", "tab2", "tab3"],
    tabContents: [<div>tab1</div>, <div>tab2</div>, <div>tab3</div>],
  },
};
