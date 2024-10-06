import { create } from 'zustand';
import { type Message } from '@/lib/types/message';



interface MessagesState {
	messages: Message[];
	setMessages: (messages: Message[]) => void;
	addMessage: (message: Message) => void;

}


export const useMessages = create<MessagesState>((set) => ({
	messages: [],
	setMessages: (messages) => set(() => ({ messages })),
	addMessage: (message) => set((state) => ({ messages: [...state.messages, message] }))
}))
