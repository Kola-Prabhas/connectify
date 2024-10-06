'use client';

import { useRef } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageProp } from "@/lib/types/messages-prop";
import { createClient } from "@/lib/supabase/client";
import { useMessages } from "@/lib/store/messages";
import { toast } from "sonner";

export function EditDialog({ message }: MessageProp) {
	const messageInput = useRef<HTMLInputElement>(null); 
	const text = message.text;

	const optimisticEditMessage = useMessages(state => state.optimisticEditMessage);

	async function handleEditMessage() {
		const newMessage = messageInput.current?.value || '';

		optimisticEditMessage({
			...message,
			text: newMessage,
			is_edit: true
		});

		const client = createClient();
		const { error } = await client.from('messages')
			.update({ text: newMessage, is_edit: true })
			.eq('id', message.id);

		if (error) {
			toast.error(error.message);
		} else {
			toast.success('Message Edited successfully')
		}
	}

	// TODO: Automatically close the dialog when hitting save changes

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button id='trigger-edit'></button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Message</DialogTitle>
					<DialogDescription>
						Type new message. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Input
							ref={messageInput}
							defaultValue={text}
							className="col-span-4"
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose>
						<Button
							type="submit"
							onClick={handleEditMessage}
						>
							Save changes
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
