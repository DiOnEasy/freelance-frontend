import { useState } from "react"
import s from "./Chat.module.css"
import { useSelector } from 'react-redux';
import axios from "../../axios"
import React from "react"
import { Link } from "react-router-dom"
import { List, ListItem, ListItemAvatar, Avatar } from '@mui/material'
import { useRef, useEffect } from "react";

export const Chat = () => {


  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState('');
  const [chatMessages, setChatMessages] = useState(null)

  const { userData } = useSelector(state => state.auth.data)


  const getChats = async () => {
    const chatsObj = await axios.get('/chat')
    setChats(chatsObj.data)

  }
  const subscribeGetMessages = async (id) => {
    
    try {
      console.log(id)
      setChatId(id)
      const messages = await axios.get(`/message/${id}`);
      setChatMessages(messages.data)
      subscribeGetMessages(id)
    }
    catch (err) {
      setTimeout(() => {
        subscribeGetMessages(id)
      }, 500)
    }
  }

  React.useEffect(() => {
    getChats();

  }, [])


  const sendMessage = async () => {
    await axios.post('/message', { message, chatId })
    setMessage(' ')
  }

  const getMessages = async (id) => {
    const messages = await axios.get(`/messages/${id}`);
    setChatMessages(messages.data)
  }
console.log(chatId)

const scrollRef = useRef(null);

  useEffect(() => {
    // Прокрутка вниз після завантаження компонента або оновлення вмісту
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatMessages]);


  return (
    <div className={s.chat__wrapper}>
      <List className={s.sidebar} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          chats.map(chat => {
            let writer;
            if (userData._id == chat.customer._id) {
              writer = 'performer'
            } else {
              writer = 'customer'
            }
            return (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={chat[writer].fullName} src={`http://localhost:4000${chat[writer].avatar}`} />
                </ListItemAvatar>
                <Link onClick={async () => {
                  setChatId(chat._id)
                  getMessages(chat._id)
                  subscribeGetMessages(chat._id)
                }} to={`/chat/${chat._id}`} className={s.sidebar__chat}>
                  {chat[writer].fullName}
                </Link>


              </ListItem>

            )
          }

          )

        }
      </List>
      <div className={s.content__wrapper}>
        <div ref={scrollRef} className={s.chat}>
        {
          !chatMessages
            ?
            <p>Select chat</p>
            :
            chatMessages.map(message => {
              let owner = false;
              if(message.sender?._id === userData._id){
                 owner = true;
              }
              return (
              // <div >
                <div className={owner ? s.owner__message : s.message}>

                <div className={s.message__wrapper}>
                <p className={s.owner}>{message.sender?.fullName}:</p>
                <p className={s.message__text}>{message.message}</p>
                </div>
                </div>
              // </div>
              )})
        }
        </div>
        <input placeholder="Enter message" className={s.input} value={message} onChange={e => setMessage(e.target.value)} type="text" />
        <button className={s.button} onClick={() => sendMessage()}>Send message</button>
      </div>
    </div>
  )
}

