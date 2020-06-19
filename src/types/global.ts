import * as errors from '../core/http-exception'
import config from "../config";
type Errors = typeof errors;
type Config = typeof config;

declare global{
    namespace NodeJS{
        interface Global {
            errs:Errors,
            config:Config
        }
    }
}

global.config = config;
global.errs = errors;
