import { create } from 'zustand';
import { type Message } from '@/lib/types/message';



interface MessagesState {
	hasMore: boolean;
	page: number;
	messages: Message[];
	setHasMore: (hasMore: boolean) => void;
	setPage: (page: number) => void;
	setMessages: (messages: Message[]) => void;
	prependMessages: (messages: Message[]) => void;
	addMessage: (message: Message) => void;
	actionMessage: Message;
	setActionMessage: (message: Message) => void;
	optimisticDeleteMessage: (Message: Message) => void;
	optimisticEditMessage: (Message: Message) => void;
}


export const useMessages = create<MessagesState>((set) => ({
	hasMore: true,
	page: 1,
	messages: [],
	actionMessage: {} as Message,
	setHasMore: (hasMore) => set(() => ({hasMore})),
	setPage: (page) => set(() => ({page})),
	setMessages: (messages) => set(() => ({ messages })),
	prependMessages: (messages) => set((state) => ({ messages: [...messages, ...state.messages]})),
	addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
	setActionMessage: (message) => set(() => ({ actionMessage: message })),
	optimisticDeleteMessage: (message) => set((state) => ({ messages: state.messages.filter(m => m.id !== message.id) })),
	optimisticEditMessage: (message) => set((state) => ({
		messages: state.messages.map(m => {
			if (m.id === message.id) {
				return message;		
			}
		
			return m;
	})})),
}))
