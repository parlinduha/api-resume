import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id, name, qty, price, rating } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const dataDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDirectory, 'items.json');

  try {
    const existingData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];

    const updatedData = existingData.map(item => {
      if (item.id === id) {
        return { ...item, name, qty, price, rating };
      }
      return item;
    });

    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    res.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating item' });
  }
}
