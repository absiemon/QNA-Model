import { Button, } from '@chakra-ui/react'
import remove from '../assets/remove.svg'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Allchats({ selectedChat, setSelectedChat }) {
    const [allChats, setAllChats] = useState([]);
    useEffect(() => {
        axios.get('./all-chats').then((res) => {
            setAllChats(res.data);
        }).catch((err) => {
            throw err;
        })
    }, [])

    const createChat = async () => {
        await axios.post('/create-chat').then((res) => {
            console.log(res.data);
            setAllChats((prev) => {
                return [...prev, res.data];
            })
        }).catch((err) => {
            throw err;
        })
    }

    const handleDelete = async(id)=>{
        await axios.post('/delete-chat', {id: id}).then((res)=>{
            setAllChats((prev)=>{
                return prev.filter((chat)=>{
                    return chat?._id !== id
                })
            })
            setSelectedChat();
        }).catch(err=>{
            throw err;
        })
    }
    return (
        <div className="p-2">
            <header className="w-full">
                <Button colorScheme='teal' variant='outline' sx={{ width: 'inherit' }} onClick={createChat}>
                    <span className='mx-2 text-2xl'>+</span>New chat
                </Button>
            </header>

            <div className='flex flex-col gap-3 mt-8'>
                {allChats.length > 0 && allChats.map((chat) => {
                    return (
                        <button key={chat._id} className={`hover:bg-teal-100 py-3 px-2 rounded-lg flex justify-between cursor-pointer ${selectedChat?._id===chat._id && 'bg-teal-300'}`} onClick={()=>setSelectedChat(chat)}>
                            <p className='text-lg font-semibold'>{chat.chatName}</p>
                            <button onClick={()=>handleDelete(chat._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}