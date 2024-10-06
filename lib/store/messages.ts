import { create } from 'zustand';
import { type Message } from '@/lib/types/message';



interface MessagesState {
	messages: Message[];
	setMessages: (messages: Message[]) => void;
	addMessage: (message: Message) => void;
	actionMessage: Message;
	setActionMessage: (message: Message) => void;
	optimisticDeleteMessage: (Message: Message) => void;
	optimisticEditMessage: (Message: Message) => void;
}


export const useMessages = create<MessagesState>((set) => ({
	messages: [],
	actionMessage: {} as Message,
	setMessages: (messages) => set(() => ({ messages })),
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
