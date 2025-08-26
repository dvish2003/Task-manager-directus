import checkExist from "@/lib/checkExist";
import client from "@/lib/graphql";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {    console.log("Data fetch ............................  ",req.body);

   try{ if(req.method !== "POST"){
        return res.status(405).json({message:"Method not allowed"});
    }
    const { email, password, name } = req.body as { email: string; password: string; name: string };
  const isExist = await checkExist(email);

  if (isExist) {
    return res.status(409).json({ message: "User already exists" });
  }

    const mutation = `
      mutation {
        create_customers_item(
        data: {
          email: "${email}",
          password: "${password}",
          name: "${name}"
        }) {
          id
          email
          name
        }
      }
    `;
    const response = await client.request(mutation, {
        variables: {
            email,
            password,
            name
        }
    });
    console.log("Response from Directus success:");
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}