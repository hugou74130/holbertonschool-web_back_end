export default function getListStudentsByLocation(students,city) {
    return students.filter((students)=> students.location === city);
}