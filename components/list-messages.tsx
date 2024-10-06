'use client';

import { useMessages } from "@/lib/store/messages";
import Message from "./message";
import { DeleteDialog } from "./delete-dialog";
import { EditDialog } from "./edit-dialog";


function ListMessages() {
	const messages = useMessages(state => state.messages);
	const actionMessage = useMessages(state => state.actionMessage);

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