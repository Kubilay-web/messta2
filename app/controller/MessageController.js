// import { connect } from "http2";

import { Prisma } from "@prisma/client";
import { read } from "fs";
import { data } from "isotope-layout";
import { orderBy } from "lodash";

// export const addMessage= () =>{
//     const{messge,from,to}=req.body;
//     const getUser=onlineUsers.get(to);

//     if(message && from && to ){
//         const newMessage= await Prisma.messages.create({
//             data:{
//                 message,
//                 sender:{connect:{id:parseInt(from)}},
//                 receiver:{connect:{id:parseInt(to)}},
//                 messageStatus:getUser? "delivered" :"sent"
//             },
//             include:{sender:true,receiver:true}
//         })
//     }


// }



export const getMessages = async (req,res,next){
    try {
        const {from,to}=req.params;

        const messages=await Prisma.messsages.findMany({
            where:{
                OR:[
                    {
                        senderId:parseInt(from),
                        receiverId:parseInt(to),
                    },
                      {
                        senderId:parseInt(to),
                        receiverId:parseInt(from),
                    },
                    
                ]
            },orderBy:{
                id:"asc"
            }
        })

        const unReadMessages=[];
        messages.forEach=((message,index)=>{
            if(message.messageStatus !== "read" && 
                message.senderId === parseInt(to)
            ){ 
                message[index].messageStatus="read";
                unReadMessages.push(message.id)
            }
        })


        await Prisma.message.updateMany({
            where:{
                id:{in:unReadMessages}
            },data:[
                messageStatus:"read"
            ]
        })
    } catch (error) {
        
    }
}



export const getInitialContactsWithMessage= async (req,res,next) =>{
    try {
        const userId=parseInt(req.params.from)
        const prisma=getPrismaInstance()
        const user= await prisma.user.findUnique({
            where:{id:userId}
            include:{
                sentMessages:{
                    include:{
                        receiver:true,
                        sender:true
                    }
                    orderBy:{
                        createdAt:"desc",

                    }
                },
                receivedMessages:{
                         include:{
                        receiver:true,
                        sender:true
                    }
                    orderBy:{
                        createdAt:"desc",

                    }
                }
            }
        })

        const messages=[...user.sentMessages,...user.receivedMessages]
        messages.sort((a,b)=>b.createdAt.getTime()-a.createdAt.getTime())
        const users = new Map()
        const messageStatusChange=[]

        messages.forEach((msg)=>{
            const isSender= msg.senderId === userId;
            const calculatedId=isSender ? msg.receiverId : msg.senderId

            if(msg.messageStatus === "sent"){
                messageStatusChange.push(msg.id)
            }

            if(!users.get(calculatedId))
                {
                    const {id,type,message,messageStatus,createdAt,senderId,receiverId} = msg;

                    let user={
                        messageId:id,type,message,messageStatus,createdAt,senderId,receiverId
                    }

                    if(isSender){
                        user ={
                            ...user,...msg.receiver,totalUnreadMessages:0
                        }
                    }else{
                        user={
                            ...user,
                            ...msg.sender,
                            totalUnreadMessages:messageStatus !== "read" ? 1 : 0,


                        }
                    }
                    users.set(calculatedId,{...user})
                }
            else if(messageStatus !== "read" && !isSender){
                const user=users.get(calculatedId)
                users.set(calculatedId,{
                    ...user,
                    totalUnreadMessages:user.totalUnreadMessages+1
                })
            }
        })


        if(messageStatusChange.length){
                 await Prisma.message.updateMany({
            where:{
                id:{in:messageStatusChange}
            },data:[
                messageStatus:"delivered"
            ]
        })
        }

        return res.status(200).json({
            users: Array.form(users.values()),
            onlineUsers:Array.from(onlineUsers.keys())
        })

    } catch (error) {
        
    }
}


export const genereateToken = (req,res,next) =>{
    try {
        const appId=parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID)
        const serverId=process.env.NEXT_PUBLIC_ZEGO_SERVER_ID
        const userId=req.params.userId;
        const effectiveTime=3600
        const payload=""
        if(appId && serverSecret && userId){
            const token=genereateToken(appId,userId,serverSecret,effectiveTime,payload);
            res.status(200).json({token})
        }
        return res.status(400).send("User id,app id and server secret is required")
    } catch (error) {
        next(error)
    }
}