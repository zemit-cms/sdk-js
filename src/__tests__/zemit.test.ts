import Zemit from '../index';

describe('Zemit', () => {
  let zemit: Zemit;

  beforeEach(() => {
    zemit = new Zemit();
  });

  it('should have Rules accessible', () => {
    expect(zemit.rules).toBeTruthy();
  });

  it('should have Logger accessible', () => {
    expect(zemit.logger).toBeTruthy();
  });

  it('should have Model accessible', () => {
    expect(zemit.model).toBeTruthy();
  });

  it('should have Identity accessible', () => {
    expect(zemit.identity).toBeTruthy();
  });

  it('should have Utils accessible', () => {
    expect(zemit.utils).toBeTruthy();
  });

  it('should have Utils accessible', () => {
    expect(zemit.logger).toBeTruthy();
  });

  describe('Rules', () => {
    it('should have empty in Rules', () => {
      expect(zemit.rules.empty).toBeDefined();
    });

    it('should have required in Rules', () => {
      expect(zemit.rules.required).toBeDefined();
    });

    it('should have ipv4 in Rules', () => {
      expect(zemit.rules.ipv4).toBeDefined();
    });

    it('should have ipv6 in Rules', () => {
      expect(zemit.rules.ipv6).toBeDefined();
    });

    it('should have email in Rules', () => {
      expect(zemit.rules.email).toBeDefined();
    });

    it('should have isLength in Rules', () => {
      expect(zemit.rules.isLength).toBeDefined();
    });

    it('should have minLength in Rules', () => {
      expect(zemit.rules.minLength).toBeDefined();
    });

    it('should have maxLength in Rules', () => {
      expect(zemit.rules.maxLength).toBeDefined();
    });

    it('should have betweenLength in Rules', () => {
      expect(zemit.rules.betweenLength).toBeDefined();
    });

    it('should have isBetween in Rules', () => {
      expect(zemit.rules.isBetween).toBeDefined();
    });

    it('should have isBetweenDates in Rules', () => {
      expect(zemit.rules.isBetweenDates).toBeDefined();
    });

    it('should have identical in Rules', () => {
      expect(zemit.rules.identical).toBeDefined();
    });

    it('should have digit in Rules', () => {
      expect(zemit.rules.digit).toBeDefined();
    });

    it('should have date in Rules', () => {
      expect(zemit.rules.date).toBeDefined();
    });

    it('should have boolean in Rules', () => {
      expect(zemit.rules.boolean).toBeDefined();
    });

    it('should have boolean in Rules', () => {
      expect(zemit.rules.boolean).toBeDefined();
    });

    it('should have required in Rules', () => {
      expect(zemit.rules.required).toBeDefined();
    });

    it('should have email in Rules', () => {
      expect(zemit.rules.email).toBeDefined();
    });

    it('should have date in Rules', () => {
      expect(zemit.rules.date).toBeDefined();
    });

    it('should have boolean in Rules', () => {
      expect(zemit.rules.boolean).toBeDefined();
    });

    it('should have digit in Rules', () => {
      expect(zemit.rules.digit).toBeDefined();
    });

    it('should have includes in Rules', () => {
      expect(zemit.rules.includes).toBeDefined();
    });

    it('should have excludes in Rules', () => {
      expect(zemit.rules.excludes).toBeDefined();
    });

    it('should have hasLowerCase in Rules', () => {
      expect(zemit.rules.hasLowerCase).toBeDefined();
    });

    it('should have hasUpperCase in Rules', () => {
      expect(zemit.rules.hasUpperCase).toBeDefined();
    });

    it('should have hasDigit in Rules', () => {
      expect(zemit.rules.hasDigit).toBeDefined();
    });

    it('should have isPositive in Rules', () => {
      expect(zemit.rules.isPositive).toBeDefined();
    });

    it('should have isNegative in Rules', () => {
      expect(zemit.rules.isNegative).toBeDefined();
    });

    it('should have isFuture in Rules', () => {
      expect(zemit.rules.isFuture).toBeDefined();
    });

    it('should have containsSpecialChar in Rules', () => {
      expect(zemit.rules.containsSpecialChar).toBeDefined();
    });

    it('should have alphanumeric in Rules', () => {
      expect(zemit.rules.alphanumeric).toBeDefined();
    });

    it('should have isUrl in Rules', () => {
      expect(zemit.rules.isUrl).toBeDefined();
    });

    it('should have isHttpUrl in Rules', () => {
      expect(zemit.rules.isHttpUrl).toBeDefined();
    });

    it('should have isRegex in Rules', () => {
      expect(zemit.rules.isRegex).toBeDefined();
    });
  });
});
