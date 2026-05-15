const express = require('express');
const fs = require('fs');

const app = express();

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .trim()
        .split('\n')
        .filter((line) => line.trim().length > 0);

      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
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

      const totalStudents = Object.values(fields).reduce(
        (sum, studentsByField) => sum + studentsByField.length,
        0,
      );

      let output = `Number of students: ${totalStudents}`;

      Object.keys(fields).forEach((field) => {
        output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
      });

      resolve(output);
    });
  });
}

const database = process.argv[2];

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(database)
    .then((output) => {
      res.set('Content-Type', 'text/plain');
      res.send(`This is the list of our students\n${output}`);
    })
    .catch(() => {
      res.set('Content-Type', 'text/plain');
      res.status(200).send('Cannot load the database');
    });
});

app.listen(1245);

module.exports = app;
