import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";
export const POST=async(req,res)=>{
    const {userId,prompt,tag}=await req.json();
    console.log(userId,prompt,tag);
    try {
        await connectToDB();
       
        const newPrompt=await Prompt.create({
            creator:userId,
            tag,
            prompt,
        })
      
       

        return new Response(JSON.stringify(newPrompt),{status:201 })
        
    } catch (error) {
       
        return new Response("Failed to create a new pompt",{status:500});
        
    }
    
}