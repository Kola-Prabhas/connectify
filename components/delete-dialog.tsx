'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMessages } from "@/lib/store/messages";
import { createClient } from "@/lib/supabase/client";
import { MessageProp } from "@/lib/types/messages-prop"
import { toast } from "sonner";


export function DeleteDialog({ message }: MessageProp) {
	const optimisticDeleteMessage = useMessages(state => state.optimisticDeleteMessage);

	async function handleDeleteMessage() {
		optimisticDeleteMessage(message);

		const client = createClient();
		const { error } = await client.from('messages').delete().eq('id', message.id);

		if (error) {
			toast.error(error.message);
		} else {
			toast.success('Message deleted successfully')
		}
	}
	
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button id='trigger-delete'></button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						Do you really want to delete the message? This action cannot be undone!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className='bg-red-500 text-white hover:bg-red-600'
						onClick={handleDeleteMessage}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
