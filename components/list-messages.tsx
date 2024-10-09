'use client';

import { useMessages } from "@/lib/store/messages";
import SingleMessage from "./message";
import { DeleteDialog } from "./delete-dialog";
import { EditDialog } from "./edit-dialog";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Message } from "@/lib/types/message";
import { ArrowDown } from "lucide-react";
import LoadMoreMessages from "./load-more-messages";


function ListMessages() {
	const page = useMessages(state => state.page);
	const hasMore = useMessages(state => state.hasMore);
	const setPage = useMessages(state => state.setPage);
	const messages = useMessages(state => state.messages);
	const addMessage = useMessages(state => state.addMessage);
	const actionMessage = useMessages(state => state.actionMessage);
	const optimisticEditMessage = useMessages(state => state.optimisticEditMessage);
	const optimisticDeleteMessage = useMessages(state => state.optimisticDeleteMessage);

	const scrollRef = useRef<HTMLDivElement | null>(null);
	const [userScrolled, setUserScrolled] = useState(false);
	const [notification, setNotification] = useState(0);


	// TODO: Realtime handlers when a message is deleted and edited - done

	useEffect(() => {
		const client = createClient();
		const subscription = client
			.channel('room1')
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async payload => {
				const message = payload.new;
				const userData = await client.from('users')
					.select('id, avatar_url, created_at, display_name')
					.eq('id', message.send_by);

				const users = userData.data?.[0];

				if (users) {
					addMessage({
						id: message.id,
						created_at: message.created_at,
						is_edit: message.is_edit,
						send_by: message.send_by,
						text: message.text,
						users
					})
				}

				const scrollContainer = scrollRef.current;
				if (scrollContainer &&
					scrollContainer.scrollTop <
					scrollContainer.scrollHeight -
					scrollContainer.clientHeight -
					10
				) {
					setNotification((current) => current + 1);
				}
			})
			.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, async payload => {
				const message = payload.new;
				const userData = await client.from('users')
					.select('id, avatar_url, created_at, display_name')
					.eq('id', message.send_by);

				const users = userData.data?.[0];

				if (users) {
					optimisticEditMessage({
						id: message.id,
						created_at: message.created_at,
						is_edit: message.is_edit,
						send_by: message.send_by,
						text: message.text,
						users
					})
				}
			})
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, async payload => {
				const message = payload.old;

				optimisticDeleteMessage({ id: message.id } as Message)
			}).subscribe();

		return () => {
			subscription.unsubscribe();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer && !userScrolled) {
			scrollContainer.scrollTop = scrollContainer.scrollHeight;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages]);


	function handleOnScroll() {
		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			const isScroll =
				scrollContainer.scrollTop <
				scrollContainer.scrollHeight -
				scrollContainer.clientHeight -
				10;
			setUserScrolled(isScroll);
			if (
				scrollContainer.scrollTop ===
				scrollContainer.scrollHeight - scrollContainer.clientHeight
			) {
				setNotification(0);
			}
		}
	};

	function scrollDown() {
		setNotification(0);
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	};

	function handleLoadMore() {
		setPage(page + 1);
	}

	// TODO: Undo the optimistic updates when the request fails
	// TODO: Style scrollbar
	// TODO: After a message is edited it's position shouldn't change and it shouldn't be the recent message

	return (
		<>
			<div
				ref={scrollRef}
				onScroll={handleOnScroll}
				className="beautify-scrollbar flex-1 flex flex-col p-5 overflow-y-auto"
			>
				<div className="flex-1"></div>
				{hasMore && <LoadMoreMessages />}
				<div className="space-y-7">
					{messages?.map(message => {
						return (
							<SingleMessage
								key={message.id}
								message={message}
							/>
						)
					})}
				</div>
				<DeleteDialog message={actionMessage} />
				<EditDialog message={actionMessage} />
			</div>
			{userScrolled && (
				<div className='absolute right-1/2 bottom-[120px]'>
					{notification ? (
						<div
							className="w-36 mx-auto bg-indigo-500 px-2 py-1 rounded-xl cursor-pointer"
							onClick={scrollDown}
						>
							<h1>New {notification} messages</h1>
						</div>
					) : (
						<div
							className="w-10 h-10 bg-blue-500 rounded-full justify-center items-center flex mx-auto border cursor-pointer hover:scale-110 transition-all"
							onClick={scrollDown}
						>
							<ArrowDown />
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default ListMessages;