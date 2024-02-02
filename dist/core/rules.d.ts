export type EmailOptions = {
    allowLocalDomains?: boolean;
    allowIPv4?: boolean;
    allowIPv6?: boolean;
};
export type MinLengthOptions = {
    allowEmpty?: boolean;
    min?: number;
};
export type MaxLengthOptions = {
    allowEmpty?: boolean;
    max?: number;
};
export type LengthOptions = {
    min?: number;
    max?: number;
    allowEmpty?: boolean;
};
export default class Rules {
    static empty(value: string | number | null | undefined): boolean;
    static required(value?: Array<any> | string | null): boolean;
    static ipv4(ipv4: string): boolean;
    static ipv6(ipv6: string): boolean;
    static email(email: string, options?: EmailOptions): boolean;
    static isLength(value?: string, length?: number, allowEmpty?: boolean): boolean;
    static minLength(value?: string, min?: number, allowEmpty?: boolean): boolean;
    static maxLength(value?: string, max?: number): boolean;
    static betweenLength(value?: string, min?: number, max?: number, allowEmpty?: boolean): boolean;
    static isBetween(value?: number, min?: number | null, max?: number | null): boolean;
    static isBetweenDates(value?: Date, min?: Date | null, max?: Date | null): boolean;
    static identical(compare?: string, value?: string): boolean;
    static digit(value?: string | number): boolean;
    static date(value: string, format?: string): boolean;
    static boolean(value?: boolean | string | number): boolean;
    static includes(value: string | number, domain: Array<string | number>): boolean;
    static excludes(value: string | number, domain: Array<string | number>): boolean;
    static strongPassword(value: string): boolean;
    static mediumPassword(value: string): boolean;
    static password(value: string): boolean;
    static hasLowerCase(value: any): boolean;
    static hasUpperCase(value: any): boolean;
    static hasDigit(value: any): boolean;
    static isPositive(value: number): boolean;
    static isNegative(value: number): boolean;
    static isFuture(value: Date): boolean;
    /**
     * Checks whether a string contains any special characters.
     *
     * This method defines "special characters" as the following:
     * ! @ # $ % ^ & * ( ) - _ = + [ ] { } ; : , . < > / ? \ | `
     *
     * The string is tested against a regular expression that matches these characters.
     * If the string is empty, this method returns the value of the `allowEmpty` parameter.
     *
     * @param {string} value - The string to be checked for special characters.
     * @param {boolean} [allowEmpty=false] - Optional. Specifies whether an empty string should be considered as containing a special character.
     * @returns {boolean} Returns `true` if the string contains a special character or is empty and `allowEmpty` is `true`. Otherwise, it returns `false`.
     *
     * @example
     * ```ts
     * const containsSpecial = MyClass.containsSpecialChar("Hello!");
     * console.log(containsSpecial); // Outputs: true
     * ```
     */
    static containsSpecialChar(value: string, allowEmpty?: boolean): boolean;
    static alphanumeric(value: string, allowEmpty?: boolean): boolean;
    static isUrl(value: string): boolean;
    static isHttpUrl(value: string): boolean;
    static isRegex(value: string): boolean;
}
//# sourceMappingURL=rules.d.ts.map