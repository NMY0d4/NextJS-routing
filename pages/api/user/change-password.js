import { getSession } from 'next-auth/client';
import { connectDatabase } from '../../../lib/db';
import { hashPassword, verifyPassword } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectDatabase();

  const userCollection = client.db().collection('users');

  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordOk = await verifyPassword(oldPassword, currentPassword);

  if (!passwordOk) {
    res.status(403).json({ message: 'Invalid password' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  console.log(result);

  client.close();
  res.status(200).json({ message: 'Password Updated!' });
}
