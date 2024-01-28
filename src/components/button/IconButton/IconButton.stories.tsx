import React from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { IconButton } from "./IconButton";
import { SvgIcon } from "../../icon/SvgIcon";

export default {
  component: IconButton,
  argTypes: {
    type: {
      description: "button type",
      table: {
        category: "Style",
      },
    },
    size: {
      description: "button size",
      control: "number",
      table: {
        category: "Style",
      },
    },
    borderColor: {
      description: "button border color (_variables.scss export된 변수값 사용)",
      table: {
        category: "Style",
      },
    },
    children: {
      description: "button 설명 (a11y 히든처리됨)",
      table: {
        category: "Style",
      },
    },
    icon: {
      description: "button icon",
      table: {
        category: "Style",
      },
    },
    disabled: {
      description: "button disabled",
    },
    link: {
      description: "button이 아닌 링크 형태일 때 true",
    },
    linkTarget: {
      description: "button이 link일 때 target",
    },
    onClick: {
      description: "button click 함수 (link 아닐 때 사용)",
      table: {
        category: "Events",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "IconButton 컴포넌트는 아이콘만 있는 경우(text X) 사용합니다. hover 시 아이콘 색상이 변경되어야 하는 부분은 svg 내에 hover-color 클래스로 지정이 필요합니다.",
      },
    },
  },
} as Meta<typeof IconButton>;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    title: "링크",
    icon: <SvgIcon iconName="alert" size={30} />,
    type: "basic",
    size: 30,
  },
};
export const CustomColor: Story = {
  args: {
    title: "링크",
    icon: <SvgIcon iconName="alert" size={30} />,
    type: "basic",
    size: 30,
    customColor: {
      color: "grayA8",
      hover: "white",
    },
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

// export const BorderColor: Story = {
//   args: {
//     type: 'circle',
//     link: '/',
//     linkTarget: '_blank',
//     icon: <SvgIcon iconName="editor_plus" size={16} />
//   }
// };
