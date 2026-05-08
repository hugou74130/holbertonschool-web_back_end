export default function getStudentIdsSum(students) {
    return students.reduce((sum, students) => sum + student.id, 0);
}