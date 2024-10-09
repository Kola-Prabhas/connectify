import { useUser } from "@/lib/store/user";
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react";


function OnlineUsersCount() {
	const user = useUser(state => state.user);
	const [onlineUsersCount, setOnlineUsersCount] = useState(0);
	console.log('user ', user);


	useEffect(() => {
		if (user) {
			const client = createClient();
			const channel = client.channel('room1')
			channel
				.on('presence', { event: 'sync' }, () => {
					const presenceState = channel.presenceState();
					console.log('presence ', presenceState);
					const onlineUserIds: string[] = [];
	
					for (const presenceInfo in presenceState) {
						// @ts-expect-error: External library has wrong types
						const userId = presenceState[presenceInfo][0].userId;
	
						if (!onlineUserIds.includes(userId)) {
							onlineUserIds.push(userId);
						}
					}
	
					setOnlineUsersCount(onlineUserIds.length);
				})
				.subscribe(async (status) => {
					if (status === 'SUBSCRIBED') {
						await channel.track({ online_at: new Date().toISOString(), userId: user?.id })
					}
				})
		}
	}, [user])


	return ( 
		<div className="flex items-center gap-1">
			<div className="size-2 bg-green-500 rounded-full animate-pulse" />
			<h1 className="text-sm text-gray-400">{user ? `${onlineUsersCount} online` : 'N/A'}</h1>
		</div>
	 );
}

export default OnlineUsersCount;