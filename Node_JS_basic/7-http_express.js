const express = require('express');
const fs = require('fs').promises;

const app = express();
const database = process.argv[2];

function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((data) => {
      const lines = data
        .trim()
        .split('\n')
        .filter((line) => line.trim().length > 0);

      if (lines.length <= 1) {
        return ['Number of students: 0'];
      }

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

      const output = [];
      const totalStudents = Object.values(fields).reduce(
        (sum, names) => sum + names.length,
        0,
      );
      output.push(`Number of students: ${totalStudents}`);

      Object.keys(fields).forEach((field) => {
        output.push(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
      });

      return output;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.set('Content-Type', 'text/plain');

  if (!database) {
    res.send('This is the list of our students\nCannot load the database');
    return;
  }

  try {
    const output = await countStudents(database);
    res.send(`This is the list of our students\n${output.join('\n')}`);
  } catch (err) {
    res.send('This is the list of our students\nCannot load the database');
  }
});

app.listen(1245);

module.exports = app;
