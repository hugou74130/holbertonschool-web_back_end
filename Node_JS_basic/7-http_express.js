const express = require('express');
const fs = require('fs').promises;

const app = express();

app.get('/', (req, res) => {
  res.type('text/plain');
  res.status(200).send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const databaseFile = process.argv[2];

  try {
    const data = await fs.readFile(databaseFile, 'utf8');
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

    const totalStudents = Object.values(fields).reduce(
      (sum, studentsByField) => sum + studentsByField.length,
      0,
    );

    let output = 'This is the list of our students';
    output += `\nNumber of students: ${totalStudents}`;

    Object.keys(fields).forEach((field) => {
      output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
    });

    res.type('text/plain');
    res.status(200).send(output);
  } catch (err) {
    res.type('text/plain');
    res.status(500).send('Cannot load the database');
  }
});

app.listen(1245);

module.exports = app;