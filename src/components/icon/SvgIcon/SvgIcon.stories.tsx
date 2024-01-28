import type { Meta, StoryObj } from "@storybook/react";
import { SvgIcon } from "./SvgIcon";
import { ICONS } from "./constants";

export default {
  component: SvgIcon,
  argTypes: {
    iconName: {
      description: "아이콘 이름(public/assets/svg/svg-icon)",
      options: Object.values(ICONS),
      control: { type: "select" },
    },
    size: {
      description:
        "커스텀이 필요한 경우 width, height 크기 지정 (width, height 크기가 동일할 경우 size로 지정)",
      table: {
        category: "Style",
      },
    },
    width: {
      description: "커스텀이 필요한 경우 width 크기 지정",
      table: {
        category: "Style",
      },
    },
    height: {
      description: "커스텀이 필요한 경우 height 크기 지정",
      table: {
        category: "Style",
      },
    },
    className: {
      description: "SvgIcon className",
      table: {
        category: "Style",
      },
    },
    title: {
      description: "ImgIcon 설명",
    },
    fill: {
      description: "width 기준 100% 일때, (상위 요소의 크기 반영)",
      table: {
        category: "Style",
      },
    },
  },
} as Meta<typeof SvgIcon>;

type Story = StoryObj<typeof SvgIcon>;

const IconBook = (args: any) => <SvgIcon {...args} />;

export const Default: Story = {
  args: {
    iconName: "profile",
    width: 280,
    height: 112,
  },
};

export const All: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: "#e5e5e5",
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        padding: "20px",
        gap: "24px 12px",
      }}
    >
      {Object.values(ICONS).map((v: string) => (
        <span
          style={{ display: "inline-block", textAlign: "center", marginRight: "10px" }}
          key={`ico-book-${v}`}
        >
          <IconBook iconName={v} size={44} />
          <div style={{ textAlign: "center", fontSize: "14px", marginTop: "8px" }}>{v}</div>
        </span>
      ))}
    </div>
  ),
};
