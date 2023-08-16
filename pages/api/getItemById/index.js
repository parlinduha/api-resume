import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const dataDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDirectory, 'items.json');

  try {
    const existingData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];

    const selectedItem = existingData.find(item => item.id === id);

    if (!selectedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(selectedItem);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving item' });
  }
}
