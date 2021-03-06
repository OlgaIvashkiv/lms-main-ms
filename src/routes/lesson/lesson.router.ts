import { Router } from 'express';

import { lessonController, userController } from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkIsTeacher, checkPassedTestData,
  checkQuestionsListLenght, isCommentOwnerMiddleware, isCommentPresent, isLessonFilterValid,
  isLessonOwnerMiddleware, isLessonPassedTestDataValid,
  isLessonPresentMiddleware, isLessonQuestionValid, isLessonUpdatingDataValid, isLessonValid,
  isQuestionExistInLessonMiddleware
} from '../../middlewares';
import { passedTestManager } from '../../middlewares/lesson/passedTestManager.middleware';
import { isLessonCommentariesDataValid } from '../../middlewares/lesson/validators/isLessonCommentariesDataValid.middleware';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', isLessonFilterValid, lessonController.getLessons);

router.post('/', checkIsTeacher, isLessonValid, lessonController.createLesson);
router.get('/my', checkIsTeacher, lessonController.getMyLesson);

router.use('/comment', isCommentPresent, isCommentOwnerMiddleware);
router.delete('/comment', lessonController.deleteComment);
router.put('/comment', isLessonCommentariesDataValid, lessonController.editComment);

router.use('/:lesson_id', isLessonPresentMiddleware);
router.get('/:lesson_id', lessonController.getLessonById);
router.get('/:lesson_id/test', lessonController.generateTestByLessonId);
router.post('/:lesson_id/test', isLessonPassedTestDataValid, checkPassedTestData, passedTestManager, userController.addTestResult);

router.post('/:lesson_id/comment', isLessonCommentariesDataValid, lessonController.saveComment);
router.get('/:lesson_id/comment', lessonController.getCommentaries);

router.use('/:lesson_id', isLessonOwnerMiddleware, checkIsTeacher);
router.patch('/:lesson_id', isLessonUpdatingDataValid, lessonController.updateMyLesson);
router.patch('/:lesson_id/question', isLessonQuestionValid, checkQuestionsListLenght, isQuestionExistInLessonMiddleware,
  lessonController.addQuestionToLesson);
router.patch('/:lesson_id/video', lessonController.changeVideo);
router.delete('/:lesson_id', lessonController.deleteMyLesson);

export const lessonRouter = router;
