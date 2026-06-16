export function generateClassTeacherComment(
  marks: number,
  studentName: string
): string {
  // Base comment templates based on performance
  let baseComment = "";
  let strengthComment = "";
  let improvementComment = "";
  let encouragementComment = "";

  // Generate base comment based on overall performance
  if (marks >= 90) {
    baseComment = `${studentName} has demonstrated outstanding performance this term.`;
    strengthComment =
      "Exceptional understanding across all subjects with consistently high marks.";
    improvementComment =
      "Can be encouraged to take on more challenging work and leadership opportunities.";
    encouragementComment = "Keep up the excellent work!";
  } else if (marks >= 80) {
    baseComment = `${studentName} has shown very good academic progress this term.`;
    strengthComment = "Strong grasp of concepts and good analytical skills.";
    improvementComment =
      "Could benefit from more in-depth exploration of complex topics.";
    encouragementComment = "Continue the great effort!";
  } else if (marks >= 70) {
    baseComment = `${studentName} has performed well this term with good consistent effort.`;
    strengthComment =
      "Shows solid understanding of core concepts in most subjects.";
    improvementComment =
      "Should focus on improving note-taking and exam preparation strategies.";
    encouragementComment = "Keep working diligently!";
  } else if (marks >= 60) {
    baseComment = `${studentName} has shown satisfactory progress this term.`;
    strengthComment = "Demonstrates adequate understanding of basic concepts.";
    improvementComment =
      "Needs to strengthen fundamentals and participate more actively in class.";
    encouragementComment =
      "With more focused effort, significant improvement is possible.";
  } else if (marks >= 50) {
    baseComment = `${studentName} has achieved passing marks but requires significant improvement.`;
    strengthComment = "Shows some understanding of basic concepts.";
    improvementComment =
      "Urgently needs additional support and dedicated study time.";
    encouragementComment =
      "Please schedule a parent-teacher meeting to discuss improvement strategies.";
  } else {
    baseComment = `${studentName} is performing below expectations and requires immediate intervention.`;
    strengthComment =
      "Shows effort in some areas but struggling with fundamental concepts.";
    improvementComment =
      "Needs comprehensive remedial support and daily supervised study.";
    encouragementComment =
      "A parent-teacher meeting is required to develop an urgent improvement plan.";
  }

  // Combine the comments into a comprehensive teacher comment
  return `${baseComment} ${strengthComment} ${improvementComment} ${encouragementComment}`;
}
