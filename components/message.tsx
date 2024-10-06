import Image  from 'next/image';
import { MessageProp } from '@/lib/types/messages-prop';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react';
import { useUser } from '@/lib/store/user';
import { useMessages } from '@/lib/store/messages';


function SingleMessage({ message }: MessageProp) {
	const user = useUser(state => state.user);
	const setActionMessage = useMessages(state => state.setActionMessage);

	return ( 
		<div className="flex gap-1 group">
			<div>
				<Image
					src={message.users? message.users.avatar_url: 'https://github.com/identicons/default.png'}
					alt={message.send_by}
					width={40}
					height={40}
					className='rounded-full'
				/>
			</div>
			<div>
				<div className="flex items-center gap-1">
					<h3 className="font-bold">{message.users?.display_name}</h3>
					<p className="text-gray-400 text-xs">{new Date(message.created_at).toDateString()}</p>
					{message.is_edit && <p className='text-blue-400 text-xs'>edited</p>}
				</div>
				<p>{message.text}</p>
			</div>
			{message.send_by === user?.id && <div className='ml-auto invisible group-hover:visible'>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Ellipsis />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() => {
								setActionMessage(message);

								const triggerEdit = document.querySelector('#trigger-edit') as HTMLButtonElement;
								triggerEdit.click();
							}}
						>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								setActionMessage(message);

								const triggerDelete = document.querySelector('#trigger-delete') as HTMLButtonElement;
								triggerDelete.click();
							}}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>}
		</div>
	 );
}

export default SingleMessage;