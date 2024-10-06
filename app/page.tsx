import { createClient } from "@/lib/supabase/server";

import ChatHeader from "@/components/chat-header";
import InitUser from "@/components/init-user";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";

export default async function Page() {
	const supabase = createClient();
	const { data } = await supabase.auth.getSession();

	return (
		<>
			<InitUser user={data?.session?.user} />
			<div className="max-w-3xl mx-auto md:py-10 h-screen">
				<div className="rounded-lg border h-full flex flex-col">
					<ChatHeader user={data?.session?.user} />
					<ChatMessages />
					<ChatInput />
				</div>
			</div>
		</>
	);
}
