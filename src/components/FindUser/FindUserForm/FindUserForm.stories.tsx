import type { Meta, StoryObj } from '@storybook/react';
import { FindUserForm } from './FindUserForm';

const meta: Meta<typeof FindUserForm> = {
	component: FindUserForm,
	argTypes: {
		
}
	};

export default meta;
type Story = StoryObj<typeof FindUserForm>;

export const Default: Story = {
	args: {
		
	}
};