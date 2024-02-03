import Service from '../core/service';
import UserModel from '../models/user.model';
export default class UserService extends Service {
    modelUrl = '/user';
    baseUrl = '/api';
    model = UserModel;
}
//# sourceMappingURL=user.service.js.map