'use client';

import { useMessages } from "@/lib/store/messages";
import { MessagesProp } from "@/lib/types/messages-prop";


function InitMessages({messages}: MessagesProp) {
	const setMessages = useMessages(state => state.setMessages);
	setMessages(messages || []);


	return <></>;
}

export default InitMessages;