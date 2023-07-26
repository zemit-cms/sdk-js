// Zemit Core
import Rules from '@/core/rules';
import Model from '@/core/model';
import Service from '@/core/service';
import Identity from '@/core/identity';
import Utils from '@/core/utils';
import Logger, { LogLevel } from '@/core/logger';

// External libraries
import store from 'store2';
import moment from 'moment';
// import jose from 'jose';
import uuid from 'uuid';

// Export Zemit
export {
    Rules,
    Model,
    Service,
    Identity,
    Utils,
    Logger,
    LogLevel,
}

// Export external libraries
export {
    store,
    // jose,
    uuid,
    moment,
}

export default class Zemit {
    // Zemit
    rules = Rules;
    model = Model;
    service = Service;
    identity = Identity;
    utils = Utils;
    logger = Logger;

    // External
    moment = moment;
    store = store;
    uuid = uuid;
    // jose = jose;
}
