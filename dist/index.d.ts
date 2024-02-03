import Rules from '@/core/rules';
import Model from '@/core/model';
import Service from '@/core/service';
import Identity from '@/core/identity';
import Utils from '@/core/utils';
import Logger, { LogLevel } from '@/core/logger';
import AuthService from '@/services/auth.service';
import GroupService from '@/services/group.service';
import RoleService from '@/services/role.service';
import TypeService from '@/services/type.service';
import UserService from '@/services/user.service';
import GroupModel from '@/models/group.model';
import RoleModel from '@/models/role.model';
import TypeModel from '@/models/type.model';
import UserModel from '@/models/user.model';
export { Rules, Model, Service, Identity, Utils, Logger, LogLevel, };
export { AuthService, GroupService, RoleService, TypeService, UserService, };
export { GroupModel, RoleModel, TypeModel, UserModel, };
export declare class Zemit {
    rules: typeof Rules;
    model: typeof Model;
    service: typeof Service;
    identity: typeof Identity;
    utils: typeof Utils;
    logger: typeof Logger;
    services: {
        auth: typeof AuthService;
        group: typeof GroupService;
        role: typeof RoleService;
        type: typeof TypeService;
        user: typeof UserService;
    };
    models: {
        group: typeof GroupModel;
        role: typeof RoleModel;
        type: typeof TypeModel;
        user: typeof UserModel;
    };
}
//# sourceMappingURL=index.d.ts.map