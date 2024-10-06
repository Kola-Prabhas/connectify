'use client';

import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";


function ChatInput() {

	async function handleSendMessage(message: string) {
		const client = createClient();

		const { error } = await client.from('messages').insert({ text: message });

		if (error) {
			toast.error(error.message);
		}
	}


	return (
		<div className="p-5">
			<Input
				placeholder="send message"
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
					if (e.key === 'Enter') {
						handleSendMessage(e.currentTarget.value);
						e.currentTarget.value = '';
					}
				}}
			/>
		</div>
	);
}

export default ChatInput;