import Model from '../core/model';
import GroupModel from './group.model';
import RoleModel from './role.model';
import TypeModel from './type.model';
export default class UserModel extends Model {
    default() {
        return {
            roleList: [],
            groupList: [],
            typeList: [],
        };
    }
    relatedMap() {
        return {
            roleList: RoleModel,
            groupList: GroupModel,
            typeList: TypeModel,
        };
    }
    getLabel() {
        return this.data.firstName + ' ' + this.data.lastName + ' <' + this.data.email + '>';
    }
    getFullName() {
        return this.data.firstName + ' ' + this.data.lastName;
    }
    getInitials() {
        const str = this.data.firstName + ' ' + this.data.lastName;
        return str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');
    }
}
//# sourceMappingURL=user.model.js.map