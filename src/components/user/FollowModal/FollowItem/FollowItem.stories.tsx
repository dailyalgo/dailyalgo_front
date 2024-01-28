import type { Meta, StoryObj } from '@storybook/react';
import { FollowItem } from './FollowItem';

const meta: Meta<typeof FollowItem> = {
	component: FollowItem,
	argTypes: {
		
}
	};

export default meta;
type Story = StoryObj<typeof FollowItem>;

export const Default: Story = {
	args: {
		
	}
};