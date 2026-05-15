const express = require('express');
const fs = require('fs');

const app = express();
const database = process.argv[2];

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');

  if (!database) {
    res.send('This is the list of our students\nCannot load the database');
    return;
  }

  fs.readFile(database, 'utf-8', (error, data) => {
    if (error) {
      res.send('This is the list of our students\nCannot load the database');
      return;
    }

    const lines = data
      .trim()
      .split('\n')
      .filter((line) => line.trim().length > 0);

    let output = 'This is the list of our students';

    if (lines.length <= 1) {
      output += '\nNumber of students: 0';
      res.send(output);
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

    output += `\nNumber of students: ${totalStudents}`;

    Object.keys(fields).forEach((field) => {
      output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
    });

    res.send(output);
  });
});

app.listen(1245);

module.exports = app;
