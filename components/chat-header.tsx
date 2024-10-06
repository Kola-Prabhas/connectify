'use client'

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import { UserProp } from "@/lib/types/user-prop";


function ChatHeader({ user }: UserProp) {
	const router = useRouter();


	async function handleLoginWithGithub() {
		const supabase = createClient();

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: location.origin + '/auth/callback',
			},
		})
		if (error) {
			console.error('Error during GitHub authentication:', error);
			// Handle error (e.g., show an alert or redirect to an error page)
		} else {
			console.log('Github auth data', data);
			// Handle successful login (e.g., redirect to another page)
		}
	}

	async function handleLogout() {
		const supabase = createClient();

		const { error } = await supabase.auth.signOut();

		if (error) {
			console.log('Error logging out the user ', error);
		}

		router.refresh();
	}


	return (
		<div className="h-20">
			<div className="p-5 flex items-center justify-between h-full">
				<div>
					<h1 className="text-xl font-bold">Daily Chat</h1>
					<div className="flex items-center gap-1">
						<div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
						<h1 className="text-sm text-gray-400">2 online</h1>
					</div>
				</div>
				{user ? (
					<Button onClick={handleLogout}>
						Logout
					</Button>
				) : (
					<Button onClick={handleLoginWithGithub}>
						Login
					</Button>
				)}
			</div>
		</div>
	);
}

export default ChatHeader;