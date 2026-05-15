import { promises as fs } from 'fs';

export async function readDatabase(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  const lines = data
    .trim()
    .split('\n')
    .filter((line) => line.trim().length > 0);

  const students = lines.slice(1);
  const fields = {};

  students.forEach((line) => {
    const parts = line.split(',');
    if (parts.length < 4) return;
    const firstName = parts[0].trim();
    const field = parts[3].trim();

    if (!fields[field]) {
      fields[field] = [];
    }
    fields[field].push(firstName);
  });

  return fields;
}
