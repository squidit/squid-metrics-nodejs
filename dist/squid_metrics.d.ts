import * as prom_client from 'prom-client';
import { Registry } from 'prom-client';
import * as _hapi_hapi from '@hapi/hapi';
import { createMiddleware } from '@promster/express';
import { Request, Response, NextFunction } from 'express';

type ServerInstance = NonNullable<Parameters<typeof createMiddleware>[0]>['app'];
type PromsterOptions = NonNullable<Parameters<typeof createMiddleware>[0]>['options'];
/**
 * Starts the metrics HTTP exporter server.
 */
declare function StartServer(port?: number): Promise<void>;
declare function GetExpressInstrumentationMiddleware(expressServer: ServerInstance, customizedOptions?: PromsterOptions): (request: Request, response: Response, next: NextFunction) => void;
declare function GetHappiInstrumentationPlugin(customizedOptions?: PromsterOptions): _hapi_hapi.Plugin<unknown>;
declare function CloseMetricsServer(): Promise<void>;
/**
 * Returns the Prometheus client (prom-client) for creating custom metrics
 */
declare function GetPrometheusClient(): typeof prom_client;
/**
 * Returns the default Prometheus registry used by @promster
 * This is the same registry where HTTP metrics are registered
 */
declare function GetPrometheusRegistry(): Registry;
declare const SquidMetrics: {
    StartServer: typeof StartServer;
    GetExpressInstrumentationMiddleware: typeof GetExpressInstrumentationMiddleware;
    GetHappiInstrumentationPlugin: typeof GetHappiInstrumentationPlugin;
    CloseMetricsServer: typeof CloseMetricsServer;
    GetPrometheusClient: typeof GetPrometheusClient;
    GetPrometheusRegistry: typeof GetPrometheusRegistry;
};

export { CloseMetricsServer, GetExpressInstrumentationMiddleware, GetHappiInstrumentationPlugin, GetPrometheusClient, GetPrometheusRegistry, type PromsterOptions, type ServerInstance, StartServer, SquidMetrics as default };
