'use client';

import { useMessages } from "@/lib/store/messages";
import Message from "./message";
import { DeleteDialog } from "./delete-dialog";
import { EditDialog } from "./edit-dialog";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";


function ListMessages() {
	const messages = useMessages(state => state.messages);
	const addMessage = useMessages(state => state.addMessage);
	const actionMessage = useMessages(state => state.actionMessage);

	// TODO: Realtime handlers when a message is deleted and edited

	useEffect(() => {
		const client = createClient();
		const subscription = client
			.channel('room1')
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async payload => {
				const message = payload.new;
				const userData = await client.from('users')
					.select('id, avatar_url, created_at, display_name')
					.eq('id', message.send_by);
				
				const users = userData.data?.[0];

				if (users) {
					addMessage({
						id: message.id,
						created_at: message.created_at,
						is_edit: message.is_edit,
						send_by: message.send_by,
						text: message.text,
						users
					})
				}
			}).subscribe();
		
		
		return () => {
			subscription.unsubscribe();
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// TODO: Undo the optimistic updates when the request fails
	// TODO: After a message is edited it's position shouldn't change and it shouldn't be the recent message

	return (
		<div className="flex-1 flex flex-col p-5 overflow-y-auto">
			<div className="flex-1"></div>
			<div className="space-y-7">
				{messages?.map(message => {
					return (
						<Message
							key={message.id}
							message={message}
						/>
					)
				})}
			</div>
			<DeleteDialog message={actionMessage} />
			<EditDialog message={actionMessage}/>
		</div>
	);
}


export default ListMessages;