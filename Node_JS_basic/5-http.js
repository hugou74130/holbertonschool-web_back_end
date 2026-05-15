const http = require('http');
const fs = require('fs').promises;

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.writeHead(200);
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
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

      res.writeHead(200);
      res.end(output);
    } catch (err) {
      res.writeHead(200);
      res.end('Cannot load the database');
    }
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

app.listen(1245);

module.exports = app;
