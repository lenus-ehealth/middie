import * as connect from 'connect'
import { FastifyPluginCallback } from 'fastify'
import * as http from "http";

declare module "fastify" {
  interface FastifyInstance {
    middie(fn: fastifyMiddie.Handler): this;
    middie(route: string, fn: fastifyMiddie.Handler): this;
    middie(routes: string[], fn: fastifyMiddie.Handler): this;
  }
}

type FastifyMiddie = FastifyPluginCallback<fastifyMiddie.FastifyMiddieOptions>

declare namespace fastifyMiddie {
  export interface FastifyMiddieOptions {
    hook?: 'onRequest' | 'preParsing' | 'preValidation' | 'preHandler' | 'preSerialization' | 'onSend' | 'onResponse' | 'onTimeout' | 'onError';
  }
  
  /**
   * @deprecated Use FastifyMiddieOptions instead
   */
  export type MiddiePluginOptions = FastifyMiddieOptions

  export interface IncomingMessageExtended {
    body?: any;
    query?: any;
  }
  export type NextFunction = (err?: any) => void;
  export type SimpleHandleFunction = (req: http.IncomingMessage & IncomingMessageExtended, res: http.ServerResponse) => void;
  export type NextHandleFunction = (req: connect.IncomingMessage & IncomingMessageExtended, res: http.ServerResponse, next: NextFunction) => void;
  
  export type Handler = SimpleHandleFunction | NextHandleFunction
  
  export const fastifyMiddie: FastifyMiddie
  export { fastifyMiddie as default }
}

declare function fastifyMiddie(...params: Parameters<FastifyMiddie>): ReturnType<FastifyMiddie>
export = fastifyMiddie
