export type ServerInstance = NonNullable<Parameters<typeof import("@promster/express").createMiddleware>[0]>["app"];
export type PromsterOptions = NonNullable<Parameters<typeof import("@promster/express").createMiddleware>[0]>["options"];
/**
 * Starts the metrics HTTP exporter server.
 * @param {number} [port]
 * @returns {Promise<void>}
 */
export function StartServer(port?: number): Promise<void>;
/**
 * @param {ServerInstance} expressServer
 * @param {PromsterOptions} [customizedOptions]
 * @returns {(request: import('express').Request, response: import('express').Response, next: import('express').NextFunction) => void}
 */
export function GetExpressInstrumentationMiddleware(expressServer: ServerInstance, customizedOptions?: PromsterOptions): (request: import("express").Request, response: import("express").Response, next: import("express").NextFunction) => void;
/**
 * @param {PromsterOptions} [customizedOptions]
 * @returns {import('@hapi/hapi').Plugin<unknown>}
 */
export function GetHappiInstrumentationPlugin(customizedOptions?: PromsterOptions): import("@hapi/hapi").Plugin<unknown>;
/**
 * @returns {Promise<void>}
 */
export function CloseMetricsServer(): Promise<void>;
/**
 * Returns the Prometheus client (prom-client) for creating custom metrics
 * @returns {typeof import('prom-client')}
 */
export function GetPrometheusClient(): typeof import("prom-client");
/**
 * Returns the default Prometheus registry used by @promster
 * This is the same registry where HTTP metrics are registered
 * @returns {import('prom-client').Registry}
 */
export function GetPrometheusRegistry(): import("prom-client").Registry;
//# sourceMappingURL=squid_metrics.d.ts.map