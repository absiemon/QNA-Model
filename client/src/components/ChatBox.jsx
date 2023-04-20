import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import send from '../assets/send.png';
import ScrollableChat from "./ScrollableChat";
import axios from "axios";
let count=0;
export default function ChatBox({selectedChat}){

    const[loading, setLoading] = useState(false);
    const [newMsg, setNewMsg] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        if(!selectedChat) return;
        else{
            setLoading(true)
            axios.get(`/all-msg/${selectedChat._id}`).then((res)=>{
                setMessages(res.data);
                setLoading(false)
            }).catch(err=>{
                setLoading(false)
                throw err;
            })
        }
    }, [selectedChat])

    const sendMsg  = async(e)=>{
        e.preventDefault();
        count++;
        if(newMsg.length===0) return;
        const obj = {
            _id: count,
            content:{
                question: newMsg,
                answer: "Generating answer..."
            }
        } 
        setMessages((prev)=>{
            return [...prev, obj]
        })
        setNewMsg("")
        await axios.post('/save-msg', {
            id: selectedChat._id,
            question: newMsg
        }).then((res)=>{
            setMessages(prev => {
                return prev.map(msg => {
                    if (msg._id === count) {
                        const ans = res.data;
                        const words = ans.split(' ');
                        return {
                          ...msg,
                          content: {
                            ...msg.content,
                            answer: (
                              <>
                                {words.map((word, index) => (
                                    <span key={index} style={{ display: 'inline-block', marginLeft:'4px'}}>
                                      {word}
                                    </span>
                                  ))}
                                </>
                            )
                          }
                        };
                      } 
                    else {
                        return msg;
                    }
                });
            });
        })       
    }

    return(
        <>
            <div className="flex-grow">
                {!selectedChat && (
                    <div className="flex h-full flex-grow items-center justify-center flex-col">
                        <div className="text-2xl">QNA Model</div>
                        <div className="primary text-gray-400">&larr; Select a chat from left sidebar</div>
                    </div>
                )}
            </div>
            {selectedChat &&
                <>
                    <Box h="12" p="2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: 'inherit' }}>
                        <div className="text-2xl text-gray-400">QNA Model</div>
                    </Box>
                    <div className={`overflow-scroll flex flex-col ${loading && 'items-center justify-center'}`} style={{ height: '83%', width: '100%', }} >
                        {loading ?
                            <div className="text-lg font-medium"> Loading...</div>
                            :
                            <div className="flex flex-col overflow-y-scroll p-3">
                                <ScrollableChat messages={messages}/>
                            </div>
                        }

                    </div>
                    <form className="flex gap-2 p-2" onSubmit={sendMsg}>
                        <input type="text" placeholder="Type your message here" className="bg-white flex-grow border p-2" value={newMsg} onChange={(e)=> setNewMsg(e.target.value)} />
                        <button className="bg-blue-300 text-white rounded-sm" type="submit">
                            <img src={send} alt="i" className="h-10 w-10 "/>
                        </button>
                    </form>
                </>
            }
        </>
    )
}