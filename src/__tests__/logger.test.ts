import Logger, { LogLevel } from '../core/logger';

describe('Logger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger('testSource');
    Logger.level = LogLevel.Debug;
  });

  it('should log debug messages when level is Debug', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    logger.debug('Debug message');
    expect(consoleLogSpy).toHaveBeenCalledWith('[testSource]', 'Debug message');
    consoleLogSpy.mockClear();
  });

  it('should not log debug messages when level is higher than Debug', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    Logger.level = LogLevel.Info;
    logger.debug('Debug message');
    expect(consoleLogSpy).not.toHaveBeenCalled();
    consoleLogSpy.mockClear();
  });

  it('should log info messages when level is Info', () => {
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    Logger.level = LogLevel.Info;
    logger.info('Info message');
    expect(consoleInfoSpy).toHaveBeenCalledWith('[testSource]', 'Info message');
    consoleInfoSpy.mockClear();
  });

  it('should not log info messages when level is higher than Info', () => {
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    Logger.level = LogLevel.Warning;
    logger.info('Info message');
    expect(consoleInfoSpy).not.toHaveBeenCalled();
    consoleInfoSpy.mockClear();
  });

  it('should log warning messages when level is Warning', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    Logger.level = LogLevel.Warning;
    logger.warn('Warning message');
    expect(consoleWarnSpy).toHaveBeenCalledWith('[testSource]', 'Warning message');
    consoleWarnSpy.mockClear();
  });

  it('should not log warning messages when level is higher than Warning', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    Logger.level = LogLevel.Error;
    logger.warn('Warning message');
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    consoleWarnSpy.mockClear();
  });

  it('should log error messages when level is Error', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    Logger.level = LogLevel.Error;
    logger.error('Error message');
    expect(consoleErrorSpy).toHaveBeenCalledWith('[testSource]', 'Error message');
    consoleErrorSpy.mockClear();
  });

  it('should call output methods when they are added', () => {
    const outputSpy = jest.fn();
    Logger.outputs.push(outputSpy);
    logger.debug('Debug message with output');
    expect(outputSpy).toHaveBeenCalledWith('testSource', LogLevel.Debug, 'Debug message with output');
  });

  it('should not call output methods for levels higher than current', () => {
    const outputSpy = jest.fn();
    Logger.outputs.push(outputSpy);
    Logger.level = LogLevel.Warning;
    logger.info('Info message');
    expect(outputSpy).not.toHaveBeenCalled();
  });

  it('should set level to Warning when production mode is enabled', () => {
    Logger.enableProductionMode();
    expect(Logger.level).toBe(LogLevel.Warning);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
