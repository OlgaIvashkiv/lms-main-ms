import { config } from '../configs';
import { StatusesEnum } from '../constants';

export const errors = {
    // 400
    BAD_REQUEST_USER_ALREADY_EXIST: { // Error when user want register. But this user is already exists
        message: StatusesEnum.USER_ALREADY_EXIST,
        code: 4001
    },

    BAD_REQUEST_MAX_PHOTO_SIZE: {
        code: 4002,
        message: `Max photo size is ${config.MAX_PHOTO_SIZE / (1024 * 1024)}mb`
    },

    BAD_REQUEST_INVALID_FILE_MIMETYPE: {
        code: 4003
    },

    BAD_REQUEST_MAX_PHOTO_AMOUNT: {
        code: 4004,
        message: StatusesEnum.CANT_UPLOAD_MORE_THAN_ONE_USER_PHOTO
    },

    BAD_REQUEST_WRONG_SORTING_PARAMS: {
        code: 4005,
        message: StatusesEnum.CANT_SORT_BY_THIS_PARAM
    },

    BAD_REQUEST_QUESTION_ALREADY_EXIST_IN_LESSON: {
        code: 4006,
        message: StatusesEnum.QUESTION_ALREADY_EXIST
    },

    BAD_REQUEST_LIMIT_QUESTION: {
        code: 4007,
        message: `Lesson can contain only ${config.MAX_QUESTION_LIMIT} questions`
    },

    // 401
    UNAUTHORIZED_WRONG_CREDENTIALS: {
        code: 4011,
        message: StatusesEnum.WRONG_EMAIL_OR_PASSWORD
    },
    // 403
    FORBIDDEN_USER_BLOCKED: { // When user try to do something with blocked account
        message: StatusesEnum.USER_IS_BLOCKED,
        code: 4031
    },

    FORBIDDEN_NO_PERMISSIONS: {
        message: StatusesEnum.NO_PERMISSIONS_TO_ACTION,
        code: 4032
    },

    FORBIDDEN_NOT_YOUR_QUESTION: {
        message: StatusesEnum.NOT_YOUR_QUESTION,
        code: 4033
    },

    FORBIDDEN_NOT_YOUR_LESSON: {
        message: StatusesEnum.NOT_YOUR_LESSON,
        code: 4034
    },

    // 404
    NOT_FOUND_USER_NOT_PRESENT: { // When user wants login, but email not found in DB
        message: StatusesEnum.USER_NOT_FOUND,
        code: 4041
    },

    NOT_FOUND_QUESTION_NOT_PRESENT: {
        message: StatusesEnum.QUESTION_NOT_FOUND,
        code: 4042
    },

    NOT_FOUND_LESSON_NOT_PRESENT: {
        message: StatusesEnum.LESSON_NOT_FOUND,
        code: 4043
    },

    NOT_FOUND_COURSE_NOT_PRESENT: {
        message: StatusesEnum.COURSE_NOT_FOUND,
        code: 4044
    },

    NOT_FOUND_MODULE_PRESENT: { // When user wants get module witch not found in DB
        message: StatusesEnum.MODULE_NOT_FOUND,
        code: 4045
    },

    NOT_FOUND_GROUP_NOT_PRESENT: {
        message: StatusesEnum.GROUP_NOT_FOUND,
        code: 4046
    }
};