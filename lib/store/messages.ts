import { create } from 'zustand';
import { type Message } from '@/lib/types/message';



interface MessagesState {
	messages: Message[] | [] | null,
	setMessages: (messages: Message[] | [] | null) => void
}


export const useMessages = create<MessagesState>((set) => ({
	messages: [],
	setMessages: (messages) => set(() => ({ messages }))
}))
