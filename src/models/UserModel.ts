import BaseModel from "./BaseModel";

export default class UserModel extends BaseModel {

  avatar: string = 'https://randomuser.me/api/portraits/women/81.jpg'
  firstName: string
  lastName: string
  username: string
  role: string

  get completeName() {
    return (this.firstName + ' ' + this.lastName).trim() || this.username || 'Unknown';
  }
}
