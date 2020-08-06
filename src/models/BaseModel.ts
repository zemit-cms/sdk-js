export default class BaseModel {

  constructor(props) {
    const keys = Object.keys(props);
    keys.forEach(key => {
      this[key] = props[key];
    });
  }
}
