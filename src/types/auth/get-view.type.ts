import ZemitMessage from '@/types/validation-message.type';

export default interface AuthGetView {
    jwt: string,
    refreshToken: string,
    loggedIn: boolean,
    loggedInAs: boolean,
    refreshed: boolean,
    validated: boolean,
    saved: boolean,
    hasSession: boolean,
    messages: Array<ZemitMessage>,
    user: any, // @todo
    userAs: any, // @todo,
    permissionList: Array<any>, // @todo
    groupList: Array<any>, // @todo
    roleList: Array<any>|any, // @todo
    typeList: Array<any>, // @todo
}
