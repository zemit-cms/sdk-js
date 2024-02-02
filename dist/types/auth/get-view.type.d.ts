import ZemitMessage from '@/types/validation-message.type';
export default interface AuthGetView {
    jwt: string;
    refreshToken: string;
    loggedIn: boolean;
    loggedInAs: boolean;
    refreshed: boolean;
    validated: boolean;
    saved: boolean;
    hasSession: boolean;
    messages: Array<ZemitMessage>;
    user: any;
    userAs: any;
    permissionList: Array<any>;
    groupList: Array<any>;
    roleList: Array<any> | any;
    typeList: Array<any>;
}
//# sourceMappingURL=get-view.type.d.ts.map