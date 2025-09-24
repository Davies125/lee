// api/csv-handler.js
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

export default async function handler(req, res) {
  const csvPath = path.join(process.cwd(), 'j.csv');
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const csvData = fs.readFileSync(csvPath, 'utf8');
      const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true
      });
      
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: 'Error reading CSV file' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { inventoryData } = req.body;
      
      // Convert back to CSV format
      const csvOutput = stringify(inventoryData, {
        header: true,
        columns: ['Item Number', 'Item Name', 'Department', 'Selling Price', 'Quantity']
      });
      
      fs.writeFileSync(csvPath, csvOutput);
      res.status(200).json({ message: 'CSV file updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error writing to CSV file' });
    }
  }
}