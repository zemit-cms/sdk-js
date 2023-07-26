import Service from '../core/service';
import RoleModel from '../models/role.model';

export default class RoleService extends Service {
  modelUrl = '/role';
  baseUrl = '/api';
  model = RoleModel;
}
