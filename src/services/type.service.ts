import Service from '../core/service';
import TypeModel from '../models/type.model';

export default class TypeService extends Service {
  modelUrl = '/type';
  baseUrl = '/api';
  model = TypeModel;
}
