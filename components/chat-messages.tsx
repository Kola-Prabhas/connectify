
import { createClient } from "@/lib/supabase/server";
import ListMessages from "./list-messages";
import InitMessages from "./init-messages";
import { LIMIT } from "@/lib/constants";

async function ChatMessages() {
	const client = createClient();
	const { data } = await client
		.from('messages')
		.select('*, users(*)')
		.range(0, LIMIT)
		.order('created_at', { ascending: false});

	
	return ( 
		<>
			<InitMessages messages={data?.reverse() ?? []} />
			<ListMessages />
		</>
	 );
}

export default ChatMessages;