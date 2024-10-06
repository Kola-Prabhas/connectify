import { create } from 'zustand';
import { type User } from '@supabase/supabase-js';

interface UserState {
	user: User | undefined,
	setUser: (user: User) => void
}

export const useUser = create<UserState>((set) => ({
	user: undefined,
	setUser: (user: User) => set(() => ({ user }))
}))
