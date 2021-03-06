import { Socket } from 'socket.io';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { errors } from '../../../errors';
import { checkDateExist, checkUserTablePlaceExist } from '../../../helpers/room';
import { IBookUser, ITableEvent } from '../../../interfaces';

export const isTableOccupiedMiddlewareSockets = async (socket: Socket, events: ITableEvent) => {
    const { room } = socket.handshake.query;

    const {user_id, rent_end, rent_start, table_number} = events.bookUserTable as IBookUser;
    const statusExist = checkDateExist(room, rent_start, rent_end, table_number);

    if (statusExist) {
        return {
            status: ResponseStatusCodesEnum.BAD_REQUEST,
            message: errors.BAD_REQUEST_TABLE_ALREADY_EXIST.message,
            code: errors.BAD_REQUEST_TABLE_ALREADY_EXIST.code
        };
    } else {
        const statusUserTableExist = checkUserTablePlaceExist(room[0].booked_users, user_id as string, rent_start, rent_end);

        if (statusUserTableExist) {
            return {
                status: ResponseStatusCodesEnum.BAD_REQUEST,
                message: errors.BAD_REQUEST_USER_ALREADY_HAS_PLACE.message,
                code: errors.BAD_REQUEST_USER_ALREADY_HAS_PLACE.code
            };
        }
    }

    return socket;
};
