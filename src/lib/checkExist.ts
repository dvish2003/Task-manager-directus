import client from "@/lib/graphql";

export default async function checkExist(email: string) {
  const query = `
    query CheckCustomer($email: String!) {
      customers(filter: { email: { _eq: $email } }) {
        id
        email
        password
      }
    }
  `;
    const response = await client.request(query, { email });

 if(response === null){
    return false;
 }
 else{
    return true;
 }

};
