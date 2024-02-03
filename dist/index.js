// Zemit Core
import Rules from '@/core/rules';
import Model from '@/core/model';
import Service from '@/core/service';
import Identity from '@/core/identity';
import Utils from '@/core/utils';
import Logger, { LogLevel } from '@/core/logger';
// Services
import AuthService from '@/services/auth.service';
import GroupService from '@/services/group.service';
import RoleService from '@/services/role.service';
import TypeService from '@/services/type.service';
import UserService from '@/services/user.service';
// Models
import GroupModel from '@/models/group.model';
import RoleModel from '@/models/role.model';
import TypeModel from '@/models/type.model';
import UserModel from '@/models/user.model';
// Export Zemit Core
export { Rules, Model, Service, Identity, Utils, Logger, LogLevel, };
// Export Services
export { AuthService, GroupService, RoleService, TypeService, UserService, };
// Export Models
export { GroupModel, RoleModel, TypeModel, UserModel, };
export class Zemit {
    // Zemit
    rules = Rules;
    model = Model;
    service = Service;
    identity = Identity;
    utils = Utils;
    logger = Logger;
    services = {
        auth: AuthService,
        group: GroupService,
        role: RoleService,
        type: TypeService,
        user: UserService,
    };
    models = {
        group: GroupModel,
        role: RoleModel,
        type: TypeModel,
        user: UserModel,
    };
}
//# sourceMappingURL=index.js.map