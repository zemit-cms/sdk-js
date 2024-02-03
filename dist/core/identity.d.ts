import { AxiosResponse } from 'axios';
import ZemitData from '@/types/zemit-data.type';
import GetView from '@/types/auth/get-view.type';
import RefreshView from '@/types/auth/refresh-view.type';
export type NestedArrayOr<T> = T | Array<NestedArrayOr<T>>;
export default class Identity {
    static identity?: GetView;
    static refreshResponse: null | Promise<AxiosResponse<ZemitData<RefreshView>>>;
    static setIdentity(identity: GetView): GetView;
    static getIdentity(): GetView | undefined;
    static removeIdentity(): void;
    static newIdentity(): Promise<void>;
    static refreshIdentity(): Promise<void>;
    /**
     * Check if identity is currently logged in
     */
    static isLoggedIn(): boolean | undefined;
    /**
     *
     * @param roleList
     * @param or
     * @param inherit
     */
    static hasRole(roleList?: NestedArrayOr<string>, or?: boolean, inherit?: boolean): boolean;
    /**
     * Check if the needles meet the haystack using nested arrays
     * Reversing ANDs and ORs within each nested subarray
     *
     * @param needles
     * @param haystack
     * @param or
     */
    static has(needles?: NestedArrayOr<string>, haystack?: Array<string>, or?: boolean): boolean;
    static hasPermission(): void;
}
//# sourceMappingURL=identity.d.ts.map