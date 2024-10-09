'use client';

import { useMessages } from "@/lib/store/messages";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { LIMIT } from "@/lib/constants";
import { toast } from "sonner";
import { getFromAndTo } from "@/lib/utils";


function LoadMoreMessages() {
	const page = useMessages(state => state.page);
	const setPage = useMessages(state => state.setPage);
	const prependMessages = useMessages(state => state.prependMessages);
	const setHasMore = useMessages(state => state.setHasMore);



	async function fetchMore() {
		const client = createClient();

		const {from, to} = getFromAndTo(page, LIMIT)
		const { data, error } = await client
			.from('messages')
			.select('*, users(*)')
			.range(from, to)
			.order('created_at', { ascending: false });
		
		if (error) {
			toast.error('Failed to load messages')
		} else {
			prependMessages(data.reverse());
			setPage(page + 1);
			setHasMore(data.length >= LIMIT);
		}		
	}

	return ( 
		<Button
			variant='outline'
			onClick={fetchMore}
			className="w-24 mx-auto hover:bg-blue-600 hover:text-white"
		>
			Load More
		</Button>
	 );
}

export default LoadMoreMessages;