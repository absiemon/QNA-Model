import ReactMarkdown from 'react-markdown';
import  ScrollableFeed  from 'react-scrollable-feed'
import user from '../assets/user.svg'
import bot from '../assets/bot.svg'

export default function ScrollableChat({ messages }) {
    return (
        <ScrollableFeed>
            {messages.length > 0 && messages.map((msg) => {
                return(
                    <div className="flex flex-col gap-1">
                        <div className="bg-white rounded-md p-4 flex gap-3">
                            <img src={user} alt='user icon' className='w-10 h-10'/>
                            <div className='text-gray-600'>{msg.content.question}</div>
                        </div>
                        <div className="p-4 flex gap-3">
                            <img src={bot} alt='bot icon' className='w-10 h-10'/>
                            <div className='font-semibold'>{msg.content.answer}</div>
                        </div>
                    </div>
                ) 
           })
        }
        </ScrollableFeed>
    )
}