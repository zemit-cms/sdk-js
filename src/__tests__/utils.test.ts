import Utils from '../core/utils';
import { validate as isUuid, version as getUuidVersion } from 'uuid';

describe('Utils', () => {

    describe('uuid', () => {
        it('should return a string', () => {
            expect(typeof Utils.uuid()).toBe('string');
        });

        it('should return a valid v4 UUID', () => {
            const id = Utils.uuid();
            expect(isUuid(id)).toBe(true);
        });

        it('should return a different UUID each time it is called', () => {
            const id1 = Utils.uuid();
            const id2 = Utils.uuid();
            expect(id1).not.toBe(id2);
        });

        it('should return a UUID of version 4', () => {
            const id = Utils.uuid();
            expect(getUuidVersion(id)).toBe(4);
        });

        it('should accept options and still return a valid UUID', () => {
            const id = Utils.uuid({ random: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] });
            expect(isUuid(id)).toBe(true);
        });
    });

    describe('capitalizeFirstLetter', () => {
        it('should handle empty string', () => {
            expect(Utils.capitalize('')).toBe('');
        });

        it('should capitalize first letter', () => {
            expect(Utils.capitalize('hello')).toBe('Hello');
        });

        it('should not change a string that starts with an uppercase letter', () => {
            expect(Utils.capitalize('World')).toBe('World');
        });

        it('should not change a string that starts with a non-alphabetical character', () => {
            expect(Utils.capitalize('123hello')).toBe('123hello');
        });

        it('should handle string with only one character', () => {
            expect(Utils.capitalize('h')).toBe('H');
            expect(Utils.capitalize('H')).toBe('H');
            expect(Utils.capitalize('1')).toBe('1');
        });

        it('should handle string with special characters', () => {
            expect(Utils.capitalize('@hello')).toBe('@hello');
            expect(Utils.capitalize('@Hello')).toBe('@Hello');
        });

        it('should not change the case of any characters after the first', () => {
            expect(Utils.capitalize('hELLO')).toBe('HELLO');
            expect(Utils.capitalize('WORLD')).toBe('WORLD');
        });

        it('should handle non-English alphabetic characters', () => {
            expect(Utils.capitalize('über')).toBe('Über');
            expect(Utils.capitalize('ñandu')).toBe('Ñandu');
            expect(Utils.capitalize('éric')).toBe('Éric');
            expect(Utils.capitalize('être')).toBe('Être');
            expect(Utils.capitalize('èques')).toBe('Èques');
        });

        it('should handle whitespace at the beginning', () => {
            expect(Utils.capitalize(' hello')).toBe(' hello');
        });

        it('should handle tabs at the beginning', () => {
            expect(Utils.capitalize('\thello')).toBe('\thello');
        });

        it('should handle line breaks at the beginning', () => {
            expect(Utils.capitalize('\nhello')).toBe('\nhello');
            expect(Utils.capitalize('\r\nhello')).toBe('\r\nhello');
        });

        it('should handle strings with only whitespace', () => {
            expect(Utils.capitalize(' ')).toBe(' ');
            expect(Utils.capitalize('\t')).toBe('\t');
            expect(Utils.capitalize('\n')).toBe('\n');
        });

        it('should handle strings with only special characters', () => {
            expect(Utils.capitalize('!@#$%^&*')).toBe('!@#$%^&*');
        });

        it('should handle strings with only non-alphabetical characters', () => {
            expect(Utils.capitalize('1234567890')).toBe('1234567890');
        });

        it('should handle strings with only uppercase characters', () => {
            expect(Utils.capitalize('HELLO')).toBe('HELLO');
        });
    });

    describe('removeLineBreaks', () => {
        it('should handle empty string', () => {
            expect(Utils.removeLineBreaks('')).toBe('');
        });

        it('should remove line breaks', () => {
            const str = 'Hello\nWorld\r\nHow\rAre You';
            expect(Utils.removeLineBreaks(str)).toBe('HelloWorldHowAre You');
        });

        it('should handle string without line breaks', () => {
            const str = 'Hello World How Are You';
            expect(Utils.removeLineBreaks(str)).toBe('Hello World How Are You');
        });

        it('should handle empty string', () => {
            expect(Utils.removeLineBreaks('')).toBe('');
        });

        it('should remove line breaks', () => {
            const str = 'Hello\nWorld\r\nHow\rAre You';
            expect(Utils.removeLineBreaks(str)).toBe('HelloWorldHowAre You');
        });

        it('should handle string without line breaks', () => {
            const str = 'Hello World How Are You';
            expect(Utils.removeLineBreaks(str)).toBe('Hello World How Are You');
        });

        it('should remove multiple consecutive line breaks', () => {
            const str = 'Hello\n\n\nWorld\r\n\r\n\r\nHow\r\r\rAre You';
            expect(Utils.removeLineBreaks(str)).toBe('HelloWorldHowAre You');
        });

        it('should remove line breaks from beginning and end of string', () => {
            const str = '\n\rHello World How Are You\r\n';
            expect(Utils.removeLineBreaks(str)).toBe('Hello World How Are You');
        });

        it('should not affect other white spaces', () => {
            const str = '  Hello \tWorld  \tHow Are You  ';
            expect(Utils.removeLineBreaks(str)).toBe('  Hello \tWorld  \tHow Are You  ');
        });

        it('should handle strings containing only line breaks', () => {
            const str = '\n\r\n\r\n';
            expect(Utils.removeLineBreaks(str)).toBe('');
        });

        it('should handle strings containing special characters', () => {
            const str = '!@#$%^&*()\n\r\n\r\nHello World';
            expect(Utils.removeLineBreaks(str)).toBe('!@#$%^&*()Hello World');
        });

        it('should handle strings containing non-English characters', () => {
            const str = 'こんにちは、\n世界\r\n';
            expect(Utils.removeLineBreaks(str)).toBe('こんにちは、世界');
        });

        it('should handle strings containing numbers and line breaks', () => {
            const str = '12345\n67890\r\n';
            expect(Utils.removeLineBreaks(str)).toBe('1234567890');
        });
    });

    describe('camelize', () => {
        it('converts a regular sentence to camelCase', () => {
            const str = 'convert this string';
            const result = Utils.camelize(str);
            expect(result).toBe('convertThisString');
        });

        it('converts a single word to lowercase', () => {
            const str = 'Convert';
            const result = Utils.camelize(str);
            expect(result).toBe('convert');
        });

        it('removes extra spaces between words', () => {
            const str = 'convert   this   string';
            const result = Utils.camelize(str);
            expect(result).toBe('convertThisString');
        });

        it('handles an empty string', () => {
            const str = '';
            const result = Utils.camelize(str);
            expect(result).toBe('');
        });

        it('handles a string with leading and trailing spaces', () => {
            const str = '  convert this string  ';
            const result = Utils.camelize(str);
            expect(result).toBe('convertThisString');
        });

        it('converts a string in PascalCase to camelCase', () => {
            const str = 'ConvertThisString';
            const result = Utils.camelize(str);
            expect(result).toBe('convertThisString');
        });

        it('converts a string with special characters and numbers', () => {
            const str = 'convert 123 this $#@! string';
            const result = Utils.camelize(str);
            expect(result).toBe('convert123ThisString');
        });

        it('converts a string with mixed case to camelCase', () => {
            const str = 'CoNvErt ThIs StRiNg';
            const result = Utils.camelize(str);
            expect(result).toBe('coNvErtThIsStRiNg');
        });

        it('ignores non-alphabetical characters', () => {
            const str = 'convert-this_string';
            const result = Utils.camelize(str);
            expect(result).toBe('convertThisString');
        });

        it('converts a string with underscore to camelCase', () => {
            const str = 'convert_this_string';
            const result = Utils.camelize(str);
            expect(result).toBe('convertThisString');
        });

        it('converts a string with hyphen to camelCase', () => {
            const str = 'convert-this-string';
            const result = Utils.camelize(str);
            expect(result).toBe('convertThisString');
        });

        it('handles a string with only spaces', () => {
            const str = '   ';
            const result = Utils.camelize(str);
            expect(result).toBe('');
        });
    });

    describe('stripHtml', () => {
        it('removes all HTML tags from a string', () => {
            const html = '<p>Hello, <strong>world</strong>!</p>';
            const result = Utils.stripHtml(html);
            expect(result).toBe('Hello, world!');
        });

        it('returns an empty string if the input is empty', () => {
            const html = '';
            const result = Utils.stripHtml(html);
            expect(result).toBe('');
        });

        it('truncates the result to the specified limit', () => {
            const html = '<p>Hello, <strong>world</strong>!</p>';
            const result = Utils.stripHtml(html, 5);
            expect(result).toBe('Hello');
        });

        it('returns the whole text if the limit is higher than the text length', () => {
            const html = '<p>Hello, <strong>world</strong>!</p>';
            const result = Utils.stripHtml(html, 100);
            expect(result).toBe('Hello, world!');
        });

        it('returns the whole text if the limit is null', () => {
            const html = '<p>Hello, <strong>world</strong>!</p>';
            const result = Utils.stripHtml(html, null);
            expect(result).toBe('Hello, world!');
        });

        it('returns an empty string if the input is just an empty HTML tag', () => {
            const html = '<p></p>';
            const result = Utils.stripHtml(html);
            expect(result).toBe('');
        });

        it('handles HTML with multiple levels of nested tags', () => {
            const html = '<div><span><p>Hello</p></span></div>';
            const result = Utils.stripHtml(html);
            expect(result).toBe('Hello');
        });

        it('handles HTML with multiple top-level tags', () => {
            const html = '<p>Hello</p><p>world</p>';
            const result = Utils.stripHtml(html);
            expect(result).toBe('Helloworld'); // @todo fix this one
        });

        it('handles HTML with tags inside text', () => {
            const html = 'Hello, <strong>world</strong>!';
            const result = Utils.stripHtml(html);
            expect(result).toBe('Hello, world!');
        });

        it('handles HTML with self-closing tags', () => {
            const html = '<p>Hello<br/>world!</p>';
            const result = Utils.stripHtml(html);
            expect(result).toBe('Helloworld!'); // @todo fix this one
        });

        it('removes HTML comments', () => {
            const html = '<!--This is a comment--><p>Hello, world!</p>';
            const result = Utils.stripHtml(html);
            expect(result).toBe('Hello, world!');
        });

        it('removes scripts and their content', () => {
            const html = '<script type="text/javascript">alert("This is a script");</script><p>Hello, world!</p>';
            const result = Utils.stripHtml(html);
            expect(result).toBe('Hello, world!');
        });

        it('removes styles and their content', () => {
            const html = '<style type="text/css">p { color: red; }</style><p>Hello, world!</p>';
            const result = Utils.stripHtml(html);
            expect(result).toBe('Hello, world!');
        });

        it('truncates the result at the limit, even if it means cutting a word in half', () => {
            const html = '<p>Hello, world!</p>';
            const result = Utils.stripHtml(html, 7);
            expect(result).toBe('Hello, ');
        });
    });
});
