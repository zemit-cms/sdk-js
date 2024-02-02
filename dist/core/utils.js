"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camel_case_1 = require("camel-case");
var uuid_1 = require("uuid");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Generates a universally unique identifier (UUID) using the v4 UUID standard.
     *
     * This function is a thin wrapper around the `uuidv4` function from the `uuid` library.
     * The `uuidv4` function generates random UUIDs. With an optional configuration object,
     * you can influence the random UUID, e.g., by supplying your own random values.
     *
     * @param {Partial<V4Options>} options - An optional configuration object for the `uuidv4` function.
     *                                      It's a partial type of V4Options, which means that all properties
     *                                      are optional.
     *
     * @returns {string} A v4 UUID string.
     *
     * @example
     * ```ts
     * const id = Utils.uuid();
     * console.log(id); // Outputs: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
     * ```
     *
     * @see {@link https://github.com/uuidjs/uuid#version-4-random}
     */
    Utils.uuid = function (options) {
        if (options === void 0) { options = {}; }
        return (0, uuid_1.v4)(options);
    };
    /**
     * Removes all types of line breaks from a string.
     *
     * The function replaces three types of line breaks: "\r\n" (Windows), "\n" (Unix), and "\r" (Macintosh)
     * with an empty string, effectively removing them from the string.
     *
     * @param {string} str - The string from which line breaks are to be removed.
     *
     * @returns {string} The string with all line breaks removed.
     *
     * @example
     * ```ts
     * const str = "Hello\nWorld\r\nHow\rAre You";
     * const result = Utils.removeLineBreaks(str);
     * console.log(result); // Outputs: "HelloWorldHowAre You"
     * ```
     */
    Utils.removeLineBreaks = function (str) {
        return str.replace(/(\r\n|\n|\r)/gm, '');
    };
    /**
     * Converts a string to camelCase. The function works by replacing all words or standalone
     * characters with the first letter of each word capitalized except for the very first character
     * of the string, which is made lowercase.
     *
     * @param str - The string to convert to camelCase.
     * @returns The camelCased string.
     */
    Utils.camelize = function (str) {
        return (0, camel_case_1.camelCase)(str, { transform: camel_case_1.camelCaseTransformMerge });
    };
    /**
     * Capitalizes the first letter of a string.
     *
     * @param str - The string to capitalize.
     * @returns The capitalized string.
     */
    Utils.capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    /**
     * Function to remove all HTML tags from a string and optionally truncate it to a specified length.
     *
     * This function uses DOMParser().parseFromString() to convert the html string into a DOM Document,
     * and then gets the text content of the body of the Document. It then either returns the entire text
     * content (if limit is null) or a substring of the text content with length limit (if limit is a number).
     *
     * @param html - The string containing HTML tags to strip out.
     * @param limit - The maximum number of characters to keep in the resulting string. If this argument
     * is null, the function will return the entire string without HTML tags. If it's a number, the
     * function will truncate the string without HTML tags to this number of characters.
     *
     * @returns A string without HTML tags and truncated to the specified limit (if any).
     */
    Utils.stripHtml = function (html, limit) {
        if (limit === void 0) { limit = null; }
        // Parse the HTML string into a DOM Document.
        var doc = new DOMParser().parseFromString(html, 'text/html');
        // Get the text content of the body element of the Document, or an empty string if there's no
        // text content.
        var text = doc.body.textContent || '';
        // If limit is null, return the entire text. If limit is a number, return up to limit characters
        // of the text.
        return limit === null ? text : text.length > limit ? text.substring(0, limit) : text;
    };
    return Utils;
}());
exports.default = Utils;
//# sourceMappingURL=utils.js.map