declare module "squid_metrics" {
    export type ServerInstance = NonNullable<(Parameters<typeof createMiddleware>[0])>["app"];
    export type PromsterOptions = NonNullable<(Parameters<typeof createMiddleware>[0])>["options"];
    export function StartServer(port?: number): Promise<void>;
    /**
     * @param {ServerInstance} expressServer
     * @param {PromsterOptions} customizedOptions
     */
    export function GetExpressInstrumentationMiddleware(expressServer: ServerInstance, customizedOptions: PromsterOptions): (request: import("express").Request, response: import("express").Response, next: import("express").NextFunction) => void;
    /**
     * @param {PromsterOptions} [customizedOptions]
     */
    export function GetHappiInstrumentationPlugin(customizedOptions?: PromsterOptions): import("@hapi/hapi").Plugin<unknown>;
    /**
     * @returns {Promise<void>}
     */
    export function CloseMetricsServer(): Promise<void>;
    import { createMiddleware } from "@promster/express/dist/declarations/src";
}
//# sourceMappingURL=squid_metrics.d.ts.map