import React, { useEffect } from "react"; 
 
function ChatWindowPage() { 
    const [messages, setMessages] = React.useState([]); 
    const [selectedChatIndex, setSelectedChatIndex] = React.useState(0); // initialize selected chat index to 0 
    const [selectedChatName, setSelectedChatName] = React.useState(""); // add a state variable to hold the name of the selected chat 
    
    const handleSend = async (message) => { 
        const sender = "me" 
 
        await fetch('/api/chat/send', { 
            method: 'POST', 
            body: JSON.stringify({ message, sender }), 
            headers: { 
                'Content-Type': 'application/json' 
            } 
        }) 
         
        setMessages([...messages, { sender: "me", message }]); 
    }; 
    

    const sendMessage = (chatID, text) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI2YTY3Y2QyMTRjZGMyZGExMmZkN2YiLCJpYXQiOjE2ODA5MzAyMzgsImV4cCI6MTY4MTE4OTQzOH0.fL-btj20bI7XsYK0jqVmzbpj_mNzuaQEdJbqinXjlFQ";
        const payload = {text,chatID}
        console.log(payload)
        const response = fetch('http://localhost:4000/api/chat/getChat/' + chatID, { 
            method: "POST",
            headers: {"Content-Type": "application/json"
        ,"Authorization": `Bearer ${token}`},
        body: JSON.stringify(payload)
        }).then((res)=> {
            console.log(res)
            return res.json()
        })
        .then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    const getAllChat = ()=>{
        const userID = "6426a67cd214cdc2da12fd7f";
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI2YTY3Y2QyMTRjZGMyZGExMmZkN2YiLCJpYXQiOjE2ODA5MzAyMzgsImV4cCI6MTY4MTE4OTQzOH0.fL-btj20bI7XsYK0jqVmzbpj_mNzuaQEdJbqinXjlFQ";
        const response = fetch('http://localhost:4000/api/chat/getUserChats', { 
            headers: {"Content-Type": "application/json"
        ,"Authorization": `Bearer ${token}`}
        }).then((res)=> {
            return res.json()
        })
        .then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
        
        
        
    }

    const getChatByID = (chatID) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI2YTY3Y2QyMTRjZGMyZGExMmZkN2YiLCJpYXQiOjE2ODA5MzAyMzgsImV4cCI6MTY4MTE4OTQzOH0.fL-btj20bI7XsYK0jqVmzbpj_mNzuaQEdJbqinXjlFQ";
        const payload = {chatID}

        const response = fetch('http://localhost:4000/api/chat/getChat/' + chatID, { 
            headers: {"Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`},
        body: JSON.stringify(payload)
        }).then((res)=> {
            return res.json()
        })
        .then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    }



    useEffect(() => {
        const data = getAllChat()
        let data2 = getChatByID("6426a796d214cdc2da12fd94")
        data2 = sendMessage("6426a796d214cdc2da12fd94", "hello")
    },[])
 
    const ChatWindow = () => { 
        return ( 
            <div className="chat-window"> 
                <div className="messages"> 
                    {messages.map((message, index) => ( 
                        <ChatMessage key={index} message={message.message} sender={message.sender} /> 
                ))} 
                </div> 
                <div className="chat-input-container"> 
                    {selectedChatIndex !== -1 && <ChatInput onSubmit={handleSend} />} 
                </div> 
            </div> 
        ); 
    }; 
 
    const ChatMessage = ({ message, sender }) => ( 
        // <div className={sender === "me" ? "chat-message sent" : "chat-message received"}> 
        <div className={`chat-message ${sender === "me" ? "sent" : "received"}`} style={{ textAlign: sender === "me" ? 'right' : 'left'}}> 
            <div className="message-wrapper"> 
                {message} 
            </div> 
        </div> 
    ); 
 
    const ChatInput = ({ onSubmit }) => { 
        const [message, setMessage] = React.useState(""); 
 
        const handleSubmit = (event) => { 
        event.preventDefault(); 
            onSubmit(message); 
        setMessage(""); 
        }; 
 
        return ( 
            <form onSubmit={handleSubmit}> 
                <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} disabled={selectedChatIndex === -1} className="chatInput"/> 
                <button type="submit" disabled={selectedChatIndex === -1}>Send</button> 
            </form> 
        ); 
    }; 
 
    const chatPreviews = [ 
        { name: "AAA", date: "2023-04-02", avatar: "./images/logo.png" }, 
        { name: "BBB", date: "2023-04-01", avatar: "./images/account_circle.png" }, 
        { name: "CCC", date: "2023-03-31", avatar: "./images/account_circle.png" }, 
        { name: "DDD", date: "2023-01-10", avatar: "./images/account_circle.png" } 
    ]; 
 
    const ChatList = () => { 
        const handleChatClick = (index) => { 
            setSelectedChatIndex(index); 
            setSelectedChatName(chatPreviews[index].name); 
            switch(index) { 
                case 0: 
                    setMessages([{ sender: "me", message: "Hi! I'd like to ask more about the job" }, { sender: "other", message: "Sure! What about the job would you want to know?" }]); 
                    break; 
                case 1: 
                    setMessages([{ sender: "me", message: "Hi! What if I am not free on one of those days? Can I still apply for this job?" }, { sender: "other", message: "Sorry, we require full commitment in the entire short duration." }]); 
                    break; 
                case 2: 
                    setMessages([{ sender: "me", message: "Hello! When will I know whether I will get accepted? " }, { sender: "other", message: "We will notify all applicants by tomorrow afternoon on their application results." },  
                                { sender: "me", message: "Alright! Thank you! " }]); 
                    break; 
                case 3:  
                    setMessages([{ sender: "me", message: "Hi!" }, { sender: "other", message: "Yo" }]) 
                    break; 
                default: 
                    setMessages([]); // set messages to an empty array for the selected chat

                    setSelectedChatIndex(-1); // set selectedChatIndex to -1 for the default chat preview 
                    setSelectedChatName(""); // set selectedChatName to an empty string for the default chat preview 
                    break; 
            }  
        }; 
   
        return ( 
            <div className="chat-list"> 
            {chatPreviews.map((chat, index) => ( 
                <div key={index} className="chat-preview" onClick={() => handleChatClick(index)}> 
                {/* <img src={chat.avatar} className="chat-preview__avatar" alt="Avatar" /> */} 
             
                    <div className="chat-preview__details"> 
                        {/* <img src={require("./images/account_circle.png")}></img> */} 
                        <img src={chat.avatar} alt="Avatar" className="chat-preview__avatar" /> 
                        <div className="chat-preview__name">{chat.name}</div> 
                        <div className="chat-preview__date">{chat.date}</div> 
                    </div> 
                </div> 
            ))} 
            </div> 
        ); 
    }; 
   
 
    return ( 
        <div className="chat-window-page"> 
            <div className="chat-sidebar"> 
                <div className="chat-sidebar__header">Chats</div> 
                <ChatList /> 
            </div> 
            <div className="chat-main"> 
                <h1>{selectedChatName}</h1> {/* display the name of the selected chat */} 
                <ChatWindow /> 
            </div> 
        </div> 
    ); 
} 
 
export default ChatWindowPage;