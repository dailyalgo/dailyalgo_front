import type { Meta, StoryObj } from '@storybook/react';
import { CommentBlock } from './CommentBlock';

const meta: Meta<typeof CommentBlock> = {
	component: CommentBlock,
	argTypes: {
		
}
	};

export default meta;
type Story = StoryObj<typeof CommentBlock>;

export const Default: Story = {
	args: {
		
	}
};