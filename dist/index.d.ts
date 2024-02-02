import Rules from '@/core/rules';
import Model from '@/core/model';
import Identity from '@/core/identity';
import Utils from '@/core/utils';
import Logger, { LogLevel } from '@/core/logger';
import store from 'store2';
import moment from 'moment';
import uuid from 'uuid';
export { Rules, Model, Identity, Utils, Logger, LogLevel, };
export { store, uuid, moment, };
export default class Zemit {
    rules: typeof Rules;
    model: typeof Model;
    identity: typeof Identity;
    utils: typeof Utils;
    logger: typeof Logger;
    moment: typeof moment;
    store: import("store2").StoreType;
    uuid: typeof uuid;
}
//# sourceMappingURL=index.d.ts.map