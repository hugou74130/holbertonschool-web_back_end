const fs =require('fs');
function countStudents(path) {
    let data;
    try {
        data = fs.readFileSync(path, 'utf8');
    } catch (error) {
        throw new Error('Cannot load database');
    }
    const lines = data 
        .trim()
        .split('\n')
        .filter((line) => line.length > 0);

    if (lines.length <= 1) {
        console.log('Number of students: 0');
        return;
    }

    const students = lines.slice(1);
    const fields = {};

    students.forEach((line) => {
        const parts = line.split(',');
        if (parts.length < 4) return;
        const firstName = part [0].trim();
        const field = parts[3].trim();
        if (!fields[field]) {
            fields[field] = [];
        }
        fields[field].push(firstName);
    });
    const totalStudents = Object.values(fields).reduce((sum, students) => sum + students.length, 0);
    console.log(`Number of students: ${totalStudents}`);
    Object.keys(fields).forEach((field) => {
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
    });
}
module.exports = countStudents;