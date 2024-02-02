import Model from '../core/model';
import GroupModel from './group.model';
import RoleModel from './role.model';
import TypeModel from './type.model';
export default class UserModel extends Model {
    default(): {
        roleList: never[];
        groupList: never[];
        typeList: never[];
    };
    relatedMap(): {
        roleList: typeof RoleModel;
        groupList: typeof GroupModel;
        typeList: typeof TypeModel;
    };
    getLabel(): string;
    getFullName(): string;
    getInitials(): string;
}
//# sourceMappingURL=user.model.d.ts.map