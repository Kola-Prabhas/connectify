'use client';

import { Input } from "@/components/ui/input"
// import { useMessages } from "@/lib/store/messages";
// import { useUser } from "@/lib/store/user";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

// import { v4 as uuidv4 } from 'uuid';


function ChatInput() {
	// const addMessage = useMessages(state => state.addMessage);
	// const user = useUser(state => state.user);

	// No need to optimistically add message since we add it in real-time changes handler
	async function handleSendMessage(message: string) {
		const client = createClient();

		const isMessageEmpty = !message;

        // Don't allow empty messages 
		if (!isMessageEmpty) {
			// const newMessage = {
			// 	created_at: new Date().toISOString(),
			// 	id: uuidv4(),
			// 	is_edit: false,
			// 	send_by: user?.id,
			// 	text: message,
			// 	users: {
			// 		avatar_url: user?.user_metadata.avatar_url,
			// 		created_at: user?.created_at,
			// 		display_name: user?.user_metadata.user_name,
			// 		id: user?.id ,
			// 	}
			// }

			// addMessage(newMessage);

			const { error } = await client.from('messages').insert({ text: message });

			if (error) {
				toast.error(error.message);
			}
		} else {
			toast.error("Please enter a message!")
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