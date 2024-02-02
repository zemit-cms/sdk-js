/**
 * Simple logger system with the possibility of registering custom outputs.
 *
 * 4 different log levels are provided, with corresponding methods:
 * - debug   : for debug information
 * - info    : for informative status of the application (success, ...)
 * - warning : for non-critical errors that do not prevent normal application behavior
 * - error   : for critical errors that prevent normal application behavior
 *
 * Example usage:
 * ```
 * import Logger from 'app/core/logger.service';
 *
 * const log = new Logger('myFile');
 * ...
 * log.debug('something happened');
 * ```
 *
 * To disable debug and info logs in production, add this snippet to your root component:
 * ```
 * export class AppComponent implements OnInit {
 *   ngOnInit() {
 *     if (environment.production) {
 *       Logger.enableProductionMode();
 *     }
 *     ...
 *   }
 * }
 *
 * If you want to process logs through other outputs than console, you can add LogOutput functions to Logger.outputs.
 */
/**
 * The possible log levels.
 * LogLevel.Off is never emitted and only used with Logger.level property to disable logs.
 */
export declare enum LogLevel {
    Off = 0,
    Error = 1,
    Warning = 2,
    Info = 3,
    Debug = 4
}
/**
 * Log output handler function.
 */
export type LogOutput = (source: string | undefined, level: LogLevel, ...objects: any[]) => void;
export default class Logger {
    private source?;
    /**
     * Current logging level.
     * Set it to LogLevel.Off to disable logs completely.
     */
    static level: LogLevel;
    /**
     * Additional log outputs.
     */
    static outputs: LogOutput[];
    /**
     * Enables production mode.
     * Sets logging level to LogLevel.Warning.
     */
    static enableProductionMode(): void;
    constructor(source?: string | undefined);
    /**
     * Logs messages or objects  with the debug level.
     * Works the same as console.log().
     */
    d: (...objects: any[]) => void;
    debug(...objects: any[]): void;
    /**
     * Logs messages or objects  with the info level.
     * Works the same as console.log().
     */
    info(...objects: any[]): void;
    /**
     * Logs messages or objects  with the warning level.
     * Works the same as console.log().
     */
    warn(...objects: any[]): void;
    /**
     * Logs messages or objects  with the error level.
     * Works the same as console.log().
     */
    error(...objects: any[]): void;
    private log;
}
//# sourceMappingURL=logger.d.ts.map