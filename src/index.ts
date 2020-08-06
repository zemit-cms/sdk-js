import UserModel from './models/UserModel'

export {
  UserModel
}

export default class SDK {
  static sayHi(msg: string) {
    alert(msg);
  }
}