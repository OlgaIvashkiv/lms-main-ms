import { Router } from 'express';

import { questionController } from '../../controllers';
import {
  checkAccessTokenMiddleware, checkIsTeacher, isQuestionFilterValid,
  isQuestionPresentMiddleware, isQuestionValid,
  isUserAdminMiddleware, isUserQuestionOwnerMiddleware
} from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', isQuestionFilterValid, questionController.getQuestions);

router.use(checkIsTeacher);
router.get('/my', questionController.getMyQuestions);
router.post('/', isQuestionValid, isUserAdminMiddleware, questionController.createQuestion);

router.use('/:question_id', isQuestionPresentMiddleware, isUserQuestionOwnerMiddleware);
router.delete('/:question_id', questionController.deleteQuestion);

export const questionRouter = router;
