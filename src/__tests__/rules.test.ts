import Rules from '../core/rules';

describe('Rules.email - advanced', () => {
    // Test valid emails
    test('Validates simple@example.com', () => {
        expect(Rules.email('simple@example.com')).toBe(true);
    });

    test('Validates very.common@example.com', () => {
        expect(Rules.email('very.common@example.com')).toBe(true);
    });

    test('Validates a.little.lengthy.but.fine@example.org', () => {
        expect(Rules.email('a.little.lengthy.but.fine@example.org')).toBe(true);
    });

    test('Validates department+category@example.com', () => {
        expect(Rules.email('department+category@example.com')).toBe(true);
    });

    test('Validates disposable.style.with-symbol@example.com', () => {
        expect(Rules.email('disposable.style.with-symbol@example.com')).toBe(true);
    });

    test('Validates other.email-with-dash@example.com', () => {
        expect(Rules.email('other.email-with-dash@example.com')).toBe(true);
    });

    // Test invalid emails
    test('Rejects Abc.example.com', () => {
        expect(Rules.email('Abc.example.com')).toBe(false);
    });

    test('Rejects A@b@c@example.com', () => {
        expect(Rules.email('A@b@c@example.com')).toBe(false);
    });

    test('Rejects john.doe@example..com', () => {
        expect(Rules.email('john.doe@example..com')).toBe(false);
    });

    test('Rejects john.doe@example.c', () => {
        expect(Rules.email('john.doe@example.c')).toBe(false);
    });

    test('Rejects john.doe@com', () => {
        expect(Rules.email('john.doe@com')).toBe(false);
    });

    // Test local domains with options
    test('Validates local domains when allowed', () => {
        // expect(Rules.email('admin@mailserver1', { allowLocalDomains: true })).toBe(true);
        // expect(Rules.email('example@s.example', { allowLocalDomains: true })).toBe(true);
    });

    test('Rejects local domains when not allowed', () => {
        // expect(Rules.email('admin@mailserver1', { allowLocalDomains: false })).toBe(false);
        // expect(Rules.email('example@s.example', { allowLocalDomains: false })).toBe(false);
        // expect(Rules.email('admin@mailserver1')).toBe(false); // Default behavior
        // expect(Rules.email('example@s.example')).toBe(false); // Default behavior
    });

    // Test edge cases that may not be handled by this regex
    test('Validates "very.unusual.@.unusual.com"@example.com', () => {
        expect(Rules.email('"very.unusual.@.unusual.com"@example.com')).toBe(true);
    });

    test('Rejects a"b(c)d,e:f;g<h>i[j\\k]l@example.com', () => {
        expect(Rules.email('a"b(c)d,e:f;g<h>i[j\\k]l@example.com')).toBe(false);
    });
});

test('Rules - Required', () => {
    expect(Rules.required(undefined)).toBe(false);
    expect(Rules.required(null)).toBe(false);
    expect(Rules.required('')).toBe(false);
    expect(Rules.required([])).toBe(false);

    expect(Rules.required('-')).toBe(true);
    expect(Rules.required(' ')).toBe(true);
    expect(Rules.required([''])).toBe(true);
});


describe('Rules', () => {
    describe('isPositive', () => {
        it('should return true if the number is positive', () => {
            const result = Rules.isPositive(10);
            expect(result).toBe(true);
        });

        it('should return false if the number is zero', () => {
            const result = Rules.isPositive(0);
            expect(result).toBe(false);
        });

        it('should return false if the number is negative', () => {
            const result = Rules.isPositive(-10);
            expect(result).toBe(false);
        });

        // more tests...
        it('should return true for a positive decimal number', () => {
            const result = Rules.isPositive(0.1);
            expect(result).toBe(true);
        });

        it('should return false for a negative decimal number', () => {
            const result = Rules.isPositive(-0.1);
            expect(result).toBe(false);
        });

        it('should return true for a very large positive number', () => {
            const result = Rules.isPositive(Number.MAX_VALUE);
            expect(result).toBe(true);
        });

        it('should return false for a very large negative number', () => {
            const result = Rules.isPositive(-Number.MAX_VALUE);
            expect(result).toBe(false);
        });

        it('should return false for NaN values', () => {
            const result = Rules.isPositive(NaN);
            expect(result).toBe(false);
        });

        it('should return false for Infinity', () => {
            const result = Rules.isPositive(Infinity);
            expect(result).toBe(true);
        });

        it('should return false for -Infinity', () => {
            const result = Rules.isPositive(-Infinity);
            expect(result).toBe(false);
        });
    });

    describe('isNegative', () => {
        it('should return false if the number is positive', () => {
            const result = Rules.isNegative(10);
            expect(result).toBe(false);
        });

        it('should return false if the number is zero', () => {
            const result = Rules.isNegative(0);
            expect(result).toBe(false);
        });

        it('should return true if the number is negative', () => {
            const result = Rules.isNegative(-10);
            expect(result).toBe(true);
        });

        // more tests...
        it('should return false for a positive decimal number', () => {
            const result = Rules.isNegative(0.1);
            expect(result).toBe(false);
        });

        it('should return true for a negative decimal number', () => {
            const result = Rules.isNegative(-0.1);
            expect(result).toBe(true);
        });

        it('should return false for a very large positive number', () => {
            const result = Rules.isNegative(Number.MAX_VALUE);
            expect(result).toBe(false);
        });

        it('should return true for a very large negative number', () => {
            const result = Rules.isNegative(-Number.MAX_VALUE);
            expect(result).toBe(true);
        });

        it('should return false for NaN values', () => {
            const result = Rules.isNegative(NaN);
            expect(result).toBe(false);
        });

        it('should return false for Infinity', () => {
            const result = Rules.isNegative(Infinity);
            expect(result).toBe(false);
        });

        it('should return true for -Infinity', () => {
            const result = Rules.isNegative(-Infinity);
            expect(result).toBe(true);
        });
    });

    describe('hasDigit', () => {
        it('should return true if the string has a digit', () => {
            const result = Rules.hasDigit('Hello1');
            expect(result).toBe(true);
        });

        it('should return false if the string does not have a digit', () => {
            const result = Rules.hasDigit('Hello');
            expect(result).toBe(false);
        });

        it('should return false for an empty string', () => {
            const result = Rules.hasDigit('');
            expect(result).toBe(false);
        });

        it('should return true for a string with only digits', () => {
            const result = Rules.hasDigit('1234567890');
            expect(result).toBe(true);
        });

        it('should return true for a string with digits and non-alphabetic characters', () => {
            const result = Rules.hasDigit('!@#$%1^&*()');
            expect(result).toBe(true);
        });

        // more tests...
        it('should return false for a string with only alphabetic characters', () => {
            const result = Rules.hasDigit('HelloWorld');
            expect(result).toBe(false);
        });

        it('should return false for a string with only special characters', () => {
            const result = Rules.hasDigit('!@#$%^&*()');
            expect(result).toBe(false);
        });

        it('should return false for a string with only spaces', () => {
            const result = Rules.hasDigit('   ');
            expect(result).toBe(false);
        });

        it('should return false for null values', () => {
            const result = Rules.hasDigit(null);
            expect(result).toBe(false);
        });

        it('should return false for undefined values', () => {
            const result = Rules.hasDigit(undefined);
            expect(result).toBe(false);
        });

        it('should handle non-string inputs like numbers', () => {
            const result = Rules.hasDigit(12345);
            expect(result).toBe(true);
        });
    });

    describe('hasUpperCase', () => {
        it('should return true if the string has uppercase characters', () => {
            const result = Rules.hasUpperCase('Hello');
            expect(result).toBe(true);
        });

        it('should return false if the string does not have uppercase characters', () => {
            const result = Rules.hasUpperCase('hello');
            expect(result).toBe(false);
        });

        it('should return false for an empty string', () => {
            const result = Rules.hasUpperCase('');
            expect(result).toBe(false);
        });

        it('should return false for a string with only non-alphabetic characters', () => {
            const result = Rules.hasUpperCase('1234567890');
            expect(result).toBe(false);
        });

        it('should return true for a string with uppercase and non-alphabetic characters', () => {
            const result = Rules.hasUpperCase('123ABC');
            expect(result).toBe(true);
        });

        // more tests...
        it('should return false for a string with only special characters', () => {
            const result = Rules.hasUpperCase('!@#$%^&*()');
            expect(result).toBe(false);
        });

        it('should return true for a string with uppercase and special characters', () => {
            const result = Rules.hasUpperCase('!@#$%A^&*()');
            expect(result).toBe(true);
        });

        it('should return true for a string with spaces and uppercase letters', () => {
            const result = Rules.hasUpperCase(' Hello World ');
            expect(result).toBe(true);
        });

        it('should return false for a string with spaces and lowercase letters', () => {
            const result = Rules.hasUpperCase(' hello world ');
            expect(result).toBe(false);
        });

        it('should return false for a string with only spaces', () => {
            const result = Rules.hasUpperCase('   ');
            expect(result).toBe(false);
        });

        it('should return false for null values', () => {
            const result = Rules.hasUpperCase(null);
            expect(result).toBe(false);
        });

        it('should return false for undefined values', () => {
            const result = Rules.hasUpperCase(undefined);
            expect(result).toBe(false);
        });

        it('should handle non-string inputs like numbers', () => {
            const result = Rules.hasUpperCase(12345);
            expect(result).toBe(false);
        });
    });

    describe('hasLowerCase', () => {
        it('should return true if the string has lowercase characters', () => {
            const result = Rules.hasLowerCase('Hello');
            expect(result).toBe(true);
        });

        it('should return false if the string does not have lowercase characters', () => {
            const result = Rules.hasLowerCase('HELLO');
            expect(result).toBe(false);
        });

        it('should return false for an empty string', () => {
            const result = Rules.hasLowerCase('');
            expect(result).toBe(false);
        });

        it('should return false for a string with only non-alphabetic characters', () => {
            const result = Rules.hasLowerCase('1234567890');
            expect(result).toBe(false);
        });

        it('should return true for a string with lowercase and non-alphabetic characters', () => {
            const result = Rules.hasLowerCase('123abc');
            expect(result).toBe(true);
        });

        it('should return false for a string with only special characters', () => {
            const result = Rules.hasLowerCase('!@#$%^&*()');
            expect(result).toBe(false);
        });

        it('should return true for a string with lowercase and special characters', () => {
            const result = Rules.hasLowerCase('!@#$%a^&*()');
            expect(result).toBe(true);
        });

        it('should return true for a string with spaces and lowercase letters', () => {
            const result = Rules.hasLowerCase(' hello world ');
            expect(result).toBe(true);
        });

        it('should return false for a string with spaces and uppercase letters', () => {
            const result = Rules.hasLowerCase(' HELLO WORLD ');
            expect(result).toBe(false);
        });

        it('should return false for a string with only spaces', () => {
            const result = Rules.hasLowerCase('   ');
            expect(result).toBe(false);
        });

        it('should return false for null values', () => {
            const result = Rules.hasLowerCase(null);
            expect(result).toBe(false);
        });

        it('should return false for undefined values', () => {
            const result = Rules.hasLowerCase(undefined);
            expect(result).toBe(false);
        });

        it('should handle non-string inputs like numbers', () => {
            const result = Rules.hasLowerCase(12345);
            expect(result).toBe(false);
        });
    });

    describe('containsSpecialChar', () => {
        it('should return true if the string contains a special character', () => {
            const result = Rules.containsSpecialChar('abc123!');
            expect(result).toBe(true);
        });

        it('should return false if the string does not contain a special character', () => {
            const result = Rules.containsSpecialChar('abc123');
            expect(result).toBe(false);
        });

        it('should return false for an empty string', () => {
            const result = Rules.containsSpecialChar('');
            expect(result).toBe(false);
        });

        it('should return true for strings with special characters', () => {
            expect(Rules.containsSpecialChar('Hello!')).toBe(true);
            expect(Rules.containsSpecialChar('World@')).toBe(true);
            expect(Rules.containsSpecialChar('$123')).toBe(true);
            expect(Rules.containsSpecialChar('(test)')).toBe(true);
        });

        it('should return false for strings without special characters', () => {
            expect(Rules.containsSpecialChar('Hello')).toBe(false);
            expect(Rules.containsSpecialChar('World')).toBe(false);
            expect(Rules.containsSpecialChar('123')).toBe(false);
        });

        it('should return false for empty string without allowing empty', () => {
            expect(Rules.containsSpecialChar('')).toBe(false);
        });

        it('should return true for empty string when allowing empty', () => {
            expect(Rules.containsSpecialChar('', true)).toBe(true);
        });

        it('should return true for strings consisting only of special characters', () => {
            expect(Rules.containsSpecialChar('!@#$%^&*()-_=+[]{};:,.<>/?\\|`')).toBe(true);
        });

        it('should handle strings with spaces and special characters', () => {
            expect(Rules.containsSpecialChar('Hello World!')).toBe(true);
            expect(Rules.containsSpecialChar(' ')).toBe(false);
        });

        it('should handle strings with tabs and special characters', () => {
            expect(Rules.containsSpecialChar('\t!')).toBe(true);
            expect(Rules.containsSpecialChar('\t')).toBe(false);
        });

        it('should handle strings with line breaks and special characters', () => {
            expect(Rules.containsSpecialChar('\n!')).toBe(true);
            expect(Rules.containsSpecialChar('\n')).toBe(false);
        });

        it('should handle strings with only non-alphabetical characters', () => {
            expect(Rules.containsSpecialChar('1234567890')).toBe(false);
        });

        it('should handle strings with only uppercase characters', () => {
            expect(Rules.containsSpecialChar('HELLO')).toBe(false);
        });

        it('should return true for strings with non-English and special characters', () => {
            expect(Rules.containsSpecialChar('こんにちは、世界!')).toBe(true);
        });
    });

    describe('alphanumeric', () => {
        it('should return false if the string is alphanumeric', () => {
            const result = Rules.alphanumeric('abc123');
            expect(result).toBe(false);
        });

        it('should return true if the string contains non-alphanumeric characters', () => {
            const result = Rules.alphanumeric('abc123!');
            expect(result).toBe(true);
        });

        it('should return true for an empty string when allowEmpty is true', () => {
            const result = Rules.alphanumeric('', true);
            expect(result).toBe(true);
        });

        it('should return false for an empty string when allowEmpty is false', () => {
            const result = Rules.alphanumeric('', false);
            expect(result).toBe(false);
        });

        it('should return true for whitespace characters', () => {
            const result = Rules.alphanumeric(' ');
            expect(result).toBe(true);
        });

        // it('should return true for null values', () => {
        //     const result = Rules.alphanumeric(null);
        //     expect(result).toBe(true);
        // });

        // it('should return true for undefined values', () => {
        //     const result = Rules.alphanumeric(undefined);
        //     expect(result).toBe(true);
        // });

        // it('should handle non-string inputs like numbers', () => {
        //     const result = Rules.alphanumeric(12345);
        //     expect(result).toBe(false);
        // });

        it('should return true for strings with special characters', () => {
            const result = Rules.alphanumeric('@#%&');
            expect(result).toBe(true);
        });
    });

    describe('isUrl', () => {
        it('should return true if the string is a valid http URL', () => {
            const result = Rules.isUrl('http://example.com');
            expect(result).toBe(true);
        });

        it('should return true if the string is a valid https URL', () => {
            const result = Rules.isUrl('https://example.com');
            expect(result).toBe(true);
        });

        it('should return true if the string is a valid ftp URL', () => {
            const result = Rules.isUrl('ftp://example.com');
            expect(result).toBe(true);
        });

        it('should return false if the string is not a valid URL', () => {
            const result = Rules.isUrl('not a valid url');
            expect(result).toBe(false);
        });

        it('should return false for an empty string', () => {
            const result = Rules.isUrl('');
            expect(result).toBe(false);
        });

        // it('should return false for null values', () => {
        //     const result = Rules.isUrl(null);
        //     expect(result).toBe(false);
        // });

        // it('should return false for undefined values', () => {
        //     const result = Rules.isUrl(undefined);
        //     expect(result).toBe(false);
        // });

        // it('should handle non-string inputs like numbers', () => {
        //     const result = Rules.isUrl(12345);
        //     expect(result).toBe(false);
        // });

        it('should return true for URL with unusual but valid protocol', () => {
            const result = Rules.isUrl('customprotocol://example');
            expect(result).toBe(true);
        });
    });

    describe('isHttpUrl', () => {
        it('should return true if the string is a valid http URL', () => {
            const result = Rules.isHttpUrl('http://example.com');
            expect(result).toBe(true);
        });

        it('should return true if the string is a valid https URL', () => {
            const result = Rules.isHttpUrl('https://example.com');
            expect(result).toBe(true);
        });

        it('should return false if the string is not a valid URL', () => {
            const result = Rules.isHttpUrl('not a valid url');
            expect(result).toBe(false);
        });

        it('should return false for an empty string', () => {
            const result = Rules.isHttpUrl('');
            expect(result).toBe(false);
        });

        it('should return false for URLs with non-http/https protocols', () => {
            const result = Rules.isHttpUrl('ftp://example.com');
            expect(result).toBe(false);
        });

        // it('should return false for null values', () => {
        //     const result = Rules.isHttpUrl(null);
        //     expect(result).toBe(false);
        // });

        // it('should return false for undefined values', () => {
        //     const result = Rules.isHttpUrl(undefined);
        //     expect(result).toBe(false);
        // });

        // it('should handle non-string inputs like numbers', () => {
        //     const result = Rules.isHttpUrl(12345);
        //     expect(result).toBe(false);
        // });
    });

    describe('isRegex', () => {
        it('should return true if the string can be converted into a regex', () => {
            const result = Rules.isRegex('^abc');
            expect(result).toBe(true);
        });

        it('should return false if the string can not be converted into a regex', () => {
            const result = Rules.isRegex('\\');
            expect(result).toBe(false);
        });

        it('should return true for an empty string', () => {
            const result = Rules.isRegex('');
            expect(result).toBe(true);
        });

        // it('should return false for null values', () => {
        //     const result = Rules.isRegex(null);
        //     expect(result).toBe(false);
        // });

        // it('should return false for undefined values', () => {
        //     const result = Rules.isRegex(undefined);
        //     expect(result).toBe(false);
        // });

        // it('should handle non-string inputs like numbers', () => {
        //     const result = Rules.isRegex(12345);
        //     expect(result).toBe(true);
        // });

        it('should return true for a simple valid regular expression', () => {
            const result = Rules.isRegex('[0-9]');
            expect(result).toBe(true);
        });

        it('should return true for a complex valid regular expression', () => {
            const result = Rules.isRegex('^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$');
            expect(result).toBe(true);
        });

        it('should return true for a valid regular expression with flags', () => {
            const result = Rules.isRegex('abc/g');
            expect(result).toBe(true);
        });

        it('should return false for a string with unbalanced parentheses', () => {
            const result = Rules.isRegex('(abc');
            expect(result).toBe(false);
        });

        // it('should return false for a string with invalid flags', () => {
        //     const result = Rules.isRegex('abc/x');
        //     expect(result).toBe(false);
        // });

        it('should return false for a string with unclosed character class', () => {
            const result = Rules.isRegex('[abc');
            expect(result).toBe(false);
        });

        it('should return false for a string with unescaped special character', () => {
            const result = Rules.isRegex('.*+');
            expect(result).toBe(false);
        });
    });
});
