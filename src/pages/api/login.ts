import checkExist from "@/lib/checkExist";
import client from "@/lib/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    console.log("Data fetch ............................  ",req.body);

    if(req.method !== "POST"){
        return res.status(405).json({message:"Method not allowed"});
    }

    const {email,password} = req.body as {email:string,password:string};

    const isExist = await checkExist(email);

    if(!isExist) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

     const query = `
    query CheckCustomer($email: String!) {
      customers(filter: { email: { _eq: $email } }) {
        id
        email
        password
      }
    }
  `;

  const response = await client.request(query, { email }) as { customers: { id: string; email: string; password: string }[] }; // return array list first ellement

  console.log("Response from Directus:", response);

  if (!response || response.customers.length === 0) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const user = response.customers[0];

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY as string, { expiresIn: '9h' });
  return res.status(200).json({ message: "Login successful", user, token });
}