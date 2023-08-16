import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const dataDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDirectory, 'items.json');

  try {
    const existingData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];

    res.status(200).json(existingData);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving items' });
  }
}
