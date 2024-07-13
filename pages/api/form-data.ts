// pages/api/form-data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connectToDatabase();

    if (req.method === 'GET') {
      const formData = await db.collection('forms').findOne({});
      return res.status(200).json(formData);
    } else if (req.method === 'POST') {
      const { name, email } = req.body;  // Update with the actual fields
      await db.collection('forms').insertOne({ name, email });  // Adjust to actual data structure
      return res.status(201).json({ message: 'Form data saved successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



