import { NextFunction, Response } from 'express';
import { IPassedTestData, IRequestExtended } from '../../interfaces';
import { questionService } from '../../services/question';

export const checkPassedTestData = async (req: IRequestExtended, res: Response, next: NextFunction) => {

  const {lesson_id} = req.params;
  const {question_list} = req.body as IPassedTestData;
  const questions_id = [];

  let testResult = 0;

  for (const {question_id, chosen_answers} of question_list) {

    const {answers} = await questionService.getAnswersByQuestionId(question_id);
    const correctAnswer = answers.filter(value => value.correct);

    let chosenCorrectQuestionCount = 0;

    questions_id.push(question_id);

    chosen_answers.forEach(chosen_answer => {
      answers.forEach(answer => {
        if (chosen_answer.toString() === answer._id.toString() && answer.correct) {
          chosenCorrectQuestionCount += 1;
        }
      });
    });

    const incorrectAnswer = chosen_answers.length - chosenCorrectQuestionCount;

    const percentageRatio = chosenCorrectQuestionCount / (correctAnswer.length + incorrectAnswer);

    testResult += +percentageRatio.toFixed(1) * 10;
  }

  req.passed_test = {
    lesson_id,
    result: testResult,
    questions_id
  };

  next();
};