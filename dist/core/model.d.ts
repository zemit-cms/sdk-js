import { Options } from 'deepmerge';
export interface ModelConfig {
    castOnHydrate: boolean;
    lateStateBinding: boolean;
    forceCasting: boolean;
    cache: boolean;
    events: boolean;
}
export type Data = {
    [key: string]: any;
};
export interface IModel<T = Data> {
    autoIncrementId: number;
    loading: boolean;
    position: number;
    data: T;
}
export default class Model implements IModel {
    static staticAutoIncrementId: number;
    autoIncrementId: number;
    position: number;
    loading: boolean;
    data: Data;
    originalData: Data;
    originalDataJSON: string | null;
    states: {
        [key: string]: boolean;
    };
    constructor(data?: Data | Model);
    get Loading(): boolean;
    set Loading(loading: boolean);
    get Position(): number;
    set Position(position: number);
    get AutoIncrementId(): number;
    set AutoIncrementId(autoIncrementId: number);
    private _autoIncrement;
    getData(data?: Model | Data | any): {
        [key: string]: any;
    };
    default(): {
        [key: string]: any;
    };
    relatedMap(): {
        [key: string]: Model | IModel | any;
    };
    uploadMap(): {
        [key: string]: {
            key: string;
            category: string;
        };
    };
    columnMap(): {
        [key: string]: string;
    };
    columnCast(): {
        [key: string]: string;
    };
    /**
     * Set Default Data
     */
    setDefault(defaultData?: {
        [key: string]: any;
    }, data?: Data | Model): void;
    /**
     * Map Columns
     */
    map(map: {
        [key: string]: any;
    }, data?: Model | {
        [key: string]: any;
    }): void;
    /**
     * Map Related Records
     */
    mapRelated(map: {
        [key: string]: any;
    }, data?: Model | {
        [key: string]: any;
    }): void;
    mapUploads(): void;
    /**
     * Cast columns
     */
    castColumns(cast?: {
        [key: string]: string;
    }): void;
    /**
     * Assign or append this model to target based on properties
     */
    assignToArrayByProperty(target: Array<Model>, props: any, toLowerCase?: boolean): void;
    /**
     * Sort property by key
     */
    sortByProperty(property: string | undefined, key: string, id?: string): any;
    /**
     * Convert data Models into nested Objects
     */
    toObject(data?: Data | Model, keepRelationship?: boolean): {
        [key: string]: any;
    };
    /**
     * JSON of data
     */
    toJson(data?: Data | Model): string;
    /**
     * Sync to data
     */
    sync(data?: Data | Model): void;
    /**
     * Assign to data
     */
    assign(data?: Data | Model, specificKeys?: Array<string>): Data & {
        [key: string]: any;
    };
    /**
     * Deep Merge to data
     */
    deepmerge(data?: Data | Model, options?: Options): void;
    /**
     * Clone Entire Model
     */
    clone<T>(): T;
    setOriginalData(data?: any): any;
    isDifferentFromOriginal(data?: any): boolean;
    revertData(): void;
}
//# sourceMappingURL=model.d.ts.map