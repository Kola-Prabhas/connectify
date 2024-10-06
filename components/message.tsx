import Image  from 'next/image';
import { MessageProp } from '@/lib/types/messages-prop';



function Message({ message }: MessageProp) {
	return ( 
		<div className="flex gap-1">
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
				</div>
				<p>{message.text}</p>
			</div>
		</div>
	 );
}

export default Message;