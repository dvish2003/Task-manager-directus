import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {    console.log("Data fetch ............................  ",req.body);

    if(req.method !== "POST"){
        return res.status(405).json({message:"Method not allowed"});
    }
}