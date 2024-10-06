import { Message } from '@/lib/types/message';


export interface MessagesProp {
	messages: Message[] | [] | null
}

export interface MessageProp {
	message: Message
}