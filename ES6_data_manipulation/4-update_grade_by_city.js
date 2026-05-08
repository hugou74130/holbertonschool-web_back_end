import getStudentIdsSum from "./3-get_ids_sum";

export default function updateStudentGradeByCity(student, city, newGrades){
    return students 
    .filter ((student) => student,location === city)
    .map ((student) => {
        const gradeObj = newGrades.find((grade) => grade.studentId === student.id);
        return {
            ...student,
            grade: gradeObj ? gradeObj.grade : 'N/A',
        };
    });
}