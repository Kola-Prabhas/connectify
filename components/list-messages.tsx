'use client';

import { useMessages } from "@/lib/store/messages";
import Message from "./message";


function ListMessages() {
	const messages = useMessages(state => state.messages);

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
		</div>
	);
}


export default ListMessages;