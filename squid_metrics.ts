declare module 'squid-metrics'{
  export function Configure(): void;

  export function StartServer(port?: number): void;
  export function GetExpressInstrumentationMiddleware(expressServer: any, customizedOptions: any): any;
  export function GetHappiInstrumentationPlugin(customizedOptions: any): any;
}