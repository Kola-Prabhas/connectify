import { createClient } from "@/lib/supabase/server";
import ListMessages from "./list-messages";
import InitMessages from "./init-messages";

async function ChatMessages() {
	const client = createClient();
	const { data } = await client.from('messages').select('*, users(*)');

	

	return ( 
		<>
			<InitMessages messages={data} />
			<ListMessages />
		</>
	 );
}

export default ChatMessages;