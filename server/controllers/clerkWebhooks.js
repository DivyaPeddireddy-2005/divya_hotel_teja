import User from "../models/User.js";
import { Webhook } from "svix";


const clerkWebhooks = async(req,res)=>{
    try {
        //create a svix instance with clerk webhook secret
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //getting header
        const headers={
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        };
        //verify headers
        await whook.verify(JSON.stringify(req.body),headers)

        //getting data from req body
        const {data,type}=req.body

        const userData={
            _id:data.id,
            email:data.email_address[0].email_address,
            username:data.first_name + " "+data.last_name,
            image:data.image_url,

        }

        //switch cases for diff events

        switch(type){
            case "user.created":{
                await User.create(userData);
                break;

            }
            case "user.updated":{
                await User.findByIdAndUpdate(data.id,userData);
                break;
            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }
        res.join({success:true,message:"Webhook Received"})



    } catch (error) {
        console.log(error.message);
        res.join({success:false,message:error.message});
        
    }
}


export default clerkWebhooks;