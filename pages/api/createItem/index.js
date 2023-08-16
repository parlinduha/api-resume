import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, qty, price, rating } = req.body; // Menambahkan fields qty, price, rating
  const newItem = {
    id: Date.now(),
    name,
    qty,
    price,
    rating
  };

  const dataDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDirectory, 'items.json');

  try {
    const existingData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];

    existingData.push(newItem);

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.status(201).json({ message: 'Item created successfully', newItem });
  } catch (error) {
    res.status(500).json({ error: 'Error creating item' });
  }
}
