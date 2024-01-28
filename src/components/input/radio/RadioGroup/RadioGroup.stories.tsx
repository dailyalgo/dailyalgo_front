import type { Meta, StoryObj } from "@storybook/react";
// 임시 처리
// eslint-disable-next-line import/no-extraneous-dependencies
import { useArgs } from "@storybook/client-api";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  argTypes: {},
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ defaultValue }, updateArgs] = useArgs();

    console.log(defaultValue);

    return (
      <RadioGroup
        {...args}
        defaultValue={defaultValue}
        onChange={(target) => updateArgs({ defaultValue: target.value })}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    optionArray: [
      {
        name: "test",
        value: "a",
        labelText: "a",
        id: "a",
        title: "title",
      },
      {
        name: "test",
        value: "b",
        labelText: "b",
        id: "b",
        title: "title",
      },
    ],
    defaultValue: "a",
  },
};
