import { questionService } from '../services/question';

export const checkPassedTestDataHelper = async (lesson_id: string, question_list: any, max_mark: number) => {
  const questions_id = [];
  let testResult = 0;

  for (const {question_id, chosen_answers} of question_list) {
    const {answers} = await questionService.getAnswersByQuestionId(question_id);

    let chosenCorrectQuestionCount = 0;
    questions_id.push(question_id);

    for (const chosen_answer of chosen_answers) {
      answers.forEach(answer => {
        if (chosen_answer.toString() === answer._id.toString() && answer.correct) {
          chosenCorrectQuestionCount += 1;
        }
      });
    }

    const unCorrectAnswer = chosen_answers.length - chosenCorrectQuestionCount;

    const myMark = chosenCorrectQuestionCount * 10;
    const unCorrectAnswerMark = unCorrectAnswer * 5;

    const result = myMark - unCorrectAnswerMark;
    testResult += result;
  }

  let passed_data;

  lesson_id ? (passed_data = {
    lesson_id,
    result: testResult,
    questions_id,
    max_mark
  }) : (passed_data = {
    result: testResult,
    max_mark,
    questions_id
  });

  return passed_data;
};
