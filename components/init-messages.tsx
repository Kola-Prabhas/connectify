'use client';

import { LIMIT } from "@/lib/constants";
import { useMessages } from "@/lib/store/messages";
import { MessagesProp } from "@/lib/types/messages-prop";


function InitMessages({messages}: MessagesProp) {
	const setMessages = useMessages(state => state.setMessages);
	const setHasMore = useMessages(state => state.setHasMore);
	setMessages(messages || []);
	setHasMore((messages?.length ?? 0) >= LIMIT);


	return <></>;
}

export default InitMessages;