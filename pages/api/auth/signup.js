import { connectDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  const data = req.body;

  const { email, password } = data;

  if (!email || !email.includes('@') || password || password.trim().lengh < 7) {
    res.status(422).json({message: 'Invalid input - password should also be at least 7 characters long.'})
    return;
  }

  const client = await connectDatabase();

  const db = client.db();

  db.collection('users').insertOne({
    email, password
  });
}
