import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { User, UserSchema, UserType } from '../../database';
import { ITestResultModel, IUser } from '../../interfaces';

class UserService {
  createUser(userValue: IUser): Promise<any> {
    const newUser = new User(userValue);
    return newUser.save();
  }

  getUserByParams(params: Partial<IUser>) {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findOne(params);
  }

  updateUser(user_id: string, patchObject: Partial<IUser>): Promise<any> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel
      .findByIdAndUpdate(user_id, patchObject) as any;
  }

  getPassedTests(id: string) {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findById(id)
      .populate(
        {
          path: 'passed_tests.passed_lesson_id',
          select: {passed_lesson_id: 1, created_at: 1, lesson_label: 1, lesson_description: 1, _id: 0},
          populate: {
            path: 'questions',
            select: {description: 1, level: 1, subject: 1, question: 1, _id: 0}
          }
        })
      .populate({
        path: 'passed_tests.passed_questions_id',
        select: {description: 1, level: 1, subject: 1, question: 1, _id: 0}
      })
      .select({passed_tests: 1, _id: 0});
  }

  getMyGroups(id: string) {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findById(id)
      .select({groups_id: 1})
      .populate({
        path: 'groups_id',
        select: {city: 1, started_at: 1, finished_at: 1, label: 1, _id: 1, attendance: 1}
      });
  }

  addPassedTest(_id: string, passed_tests: Partial<ITestResultModel>): Promise<IUser> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    // @ts-ignore
    return UserModel.findByIdAndUpdate(_id, {$push: {passed_tests}}, {new: true}) as any;
  }
}

export const userService = new UserService();
