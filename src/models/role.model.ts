import Model from '../core/model';
// import UserModel from './user.model';

export default class RoleModel extends Model {
  relatedMap() {
    return {
      // userList: UserModel,
    };
  }
}
