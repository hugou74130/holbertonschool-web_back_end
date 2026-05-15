const express = require('express');
const fs = require('fs');

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1);
      const fields = {};

      students.forEach((student) => {
        const [firstName, , , field] = student.split(',');

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstName);
      });

      const output = [`Number of students: ${students.length}`];

      Object.keys(fields).forEach((field) => {
        const names = fields[field];
        output.push(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      });

      resolve(output.join('\n'));
    });
  });
}

const app = express();

app.get('/', (request, response) => {
  response.status(200).type('text').send('Hello Holberton School!');
});

app.get('/students', (request, response) => {
  readDatabase(process.argv[2])
    .then((report) => {
      response.status(200).type('text').send(`This is the list of our students\n${report}`);
    })
    .catch((error) => {
      response.status(200).type('text').send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(1245);

module.exports = app;
