import { useEffect, useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import Allchats from "../components/Allchats";
import ChatBox from "../components/ChatBox";
import axios from "axios";
export default function Chat(){
    const [selectedChat, setSelectedChat] = useState();
    const shouldHideBox = useBreakpointValue({ base: true, md: false });



    return (
        <>
            <div className="flex h-screen">
                {shouldHideBox && (
                    <>
                        {!selectedChat && (
                            <div className={`bg-gray-300 w-full `} >
                                <div className=" mt-2 px-2">
                                    <Allchats selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>
                                </div>
                            </div>
                        )}
                        {selectedChat && (
                            <div className="flex flex-col bg-blue-100 w-full">
                                <ChatBox selectedChat={selectedChat} />
                            </div>
                        )}
                    </>
                )}
                {!shouldHideBox && (
                    <>
                        <div className={`bg-gray-300 w-1/4 `} >
                            <div className=" mt-2 px-2">
                                <Allchats selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>
                            </div>
                        </div>
                        <div className="flex flex-col bg-blue-100 w-3/4">
                            <ChatBox selectedChat={selectedChat}/>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}