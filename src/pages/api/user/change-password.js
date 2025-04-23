
import { getSession } from "next-auth/react";

import { hashPassword, verifyPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated!' });
  }

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(422).json({ message: 'Missing fields' });
  }

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return res.status(500).json({ message: "Could not connect to database." });
  }

  const usersCollection = client.db().collection('Users');

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const isValid = await verifyPassword(oldPassword, user.password);

  if (!isValid) {
    return res.status(403).json({ message: 'Old password is incorrect.' });
  }

  const hashedPassword = await hashPassword(newPassword);

  try {
    await usersCollection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );
    res.status(200).json({ message: 'Password updated!' });
  } catch (error) {
    console.error("Failed to update password:", error);
    res.status(500).json({ message: "Could not update the password." });
  } finally {
    client.close();
  }
}

export default handler;
