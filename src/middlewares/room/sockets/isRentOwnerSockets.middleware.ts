import { Socket } from 'socket.io';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import {  errors } from '../../../errors';
import { IBookUser, ITableEvent } from '../../../interfaces';

export const isRentOwnerSockets = (socket: Socket, events: ITableEvent) => {
    const {user, room} = socket.handshake.query;
    const {rent_id} = events;

    const status = room[0].booked_users.find((bu: IBookUser) => bu._id?.toString() === rent_id &&
        bu.user_id.toString() === user._id.toString()
    );

    if (!status) {
        return {
            status: ResponseStatusCodesEnum.FORBIDDEN,
            message: errors.FORBIDDEN_NOT_YOUR_PLACE.message,
            code: errors.FORBIDDEN_NOT_YOUR_PLACE.code
        };
    }

    return socket;
};
