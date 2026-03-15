import { createMiddleware } from "@promster/express";
import { createPlugin } from "@promster/hapi";
import { Prometheus, defaultRegister } from "@promster/metrics";
import { createServer } from "@promster/server";
const defaultMetricTypes = [
  "httpRequestsTotal",
  "httpRequestsHistogram",
  "httpRequestsSummary",
  "httpContentLengthHistogram"
];
let metricsServer;
function DefaultStatusCodeNormalizer(status) {
  return Math.trunc(status / 100) + "XX";
}
const defaultOptions = {
  metricTypes: defaultMetricTypes,
  normalizeStatusCode: DefaultStatusCodeNormalizer
};
function MergeOptions(customizedOptions = {}) {
  return { ...defaultOptions, ...customizedOptions };
}
async function StartServer(port = 9113) {
  metricsServer = await createServer({ port });
  console.log(`Prometheus metrics exporter (@promster/server) started on port ${port}.`);
}
function GetExpressInstrumentationMiddleware(expressServer, customizedOptions) {
  return createMiddleware({
    app: expressServer,
    options: MergeOptions(customizedOptions)
  });
}
function GetHapiInstrumentationPlugin(customizedOptions) {
  return createPlugin({
    options: MergeOptions(customizedOptions)
  });
}
async function CloseMetricsServer() {
  if (!metricsServer) {
    console.warn("Prometheus metrics exporter (@promster/server) is not running");
    return;
  }
  await new Promise((resolve, reject) => {
    metricsServer.close((error) => {
      if (error) {
        console.error("Error while closing the metrics server:", error);
        reject(error);
        return;
      }
      console.log("Prometheus metrics exporter (@promster/server) stopped");
      resolve();
    });
  });
}
function GetPrometheusClient() {
  return Prometheus;
}
function GetPrometheusRegistry() {
  return defaultRegister;
}
const SquidMetrics = {
  StartServer,
  GetExpressInstrumentationMiddleware,
  GetHapiInstrumentationPlugin,
  CloseMetricsServer,
  GetPrometheusClient,
  GetPrometheusRegistry
};
export {
  CloseMetricsServer,
  GetExpressInstrumentationMiddleware,
  GetHapiInstrumentationPlugin,
  GetPrometheusClient,
  GetPrometheusRegistry,
  StartServer
};
//# sourceMappingURL=squid-metrics.js.map