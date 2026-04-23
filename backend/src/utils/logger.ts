import * as colors from 'colors';

export class Logger {
  
    static log(message: string) {
        console.log(colors.blue(`📘 [LOG] ${new Date().toISOString()}: ${message}`));
    }

    static error(message: string) {
        console.error(colors.red(`❌ [ERROR] ${new Date().toISOString()}: ${message}`));
    }

    static warn(message: string) {
        console.warn(colors.yellow(`⚠️ [WARN] ${new Date().toISOString()}: ${message}`));
    }

    static debug(message: string) {
        console.debug(colors.gray(`🐞 [DEBUG] ${new Date().toISOString()}: ${message}`));
    }
}