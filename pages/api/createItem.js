import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name } = req.body;

  // Proses untuk membuat item baru dan menyimpannya ke dalam file JSON
  const newItem = { id: Date.now(), name };

  const dataDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDirectory, 'items.json');

  try {
    const existingData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];

    const updatedData = [...existingData, newItem];
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    res.status(201).json({ message: 'Item created successfully', newItem });
  } catch (error) {
    res.status(500).json({ error: 'Error creating item' });
  }
}
