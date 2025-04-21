import NextAuth from 'next/auth'
import Provider from 'next-auth/providers';
import { connectToDatabase } from '../../../../lib/db';
import { verifyPassword } from '../../../../lib/auth';




export default NextAuth({

    session:{
        jwt:true,
    },
    providers:[
        providers.Credentials({
           async  authorize(credentials){
               const client = await connectToDatabase();

               const userCollection = client.db().collection('users');
               const user = await userCollection.findOne({email: credentials.email})

               if(!user){
                throw new error("No user found!")
                
               }
              const isValid= verifyPassword(credentials.password,user.password)

              if(!isValid){
                client.close();
                throw new Error('could not login')
              }
              client.close();
              return{email:user.email,}
                
           }
        })
    ]
});