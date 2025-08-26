import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import client from "@/lib/graphql";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("data....................... fetch", req.body);

    console.log('....................................................1')
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    console.log('....................................................2')


    const token = authHeader.split(" ")[1];
    try {
        console.log('....................................................3')

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        console.log('....................................................5')

        if (!decoded) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        console.log('....................................................4')

        const { name, description, customer_email, customer_id } = await req.body as { name: string, description: string, customer_email: string, customer_id: string };
        console.log('....................................................6')

  const mutation = `
  mutation({
    create_task(
      data: {
        name: '${name}',
        description: '${description}',
        customer_email: '${customer_email}',
        customer_id: '${customer_id}'
      }
    ) {
      id
      name
      description
      customer_email
      customer_id
    }
  }
`;

        console.log('....................................................8')
const response = await client.request(mutation, {
  name,
  description,
  customer_email,
  customer_id
});

        console.log('....................................................9')

        if (response === null) {
            return res.status(500).json({ message: "Failed to create task" });
        }

        console.log("data....................... fetch", response);

        return res.status(200).json(
            {

                message: 'Task save successfully'

            });


    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }



}