var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var squid_metrics_exports = {};
__export(squid_metrics_exports, {
  CloseMetricsServer: () => CloseMetricsServer,
  GetExpressInstrumentationMiddleware: () => GetExpressInstrumentationMiddleware,
  GetHapiInstrumentationPlugin: () => GetHapiInstrumentationPlugin,
  GetPrometheusClient: () => GetPrometheusClient,
  GetPrometheusRegistry: () => GetPrometheusRegistry,
  StartServer: () => StartServer
});
module.exports = __toCommonJS(squid_metrics_exports);
var import_express = require("@promster/express");
var import_hapi = require("@promster/hapi");
var import_metrics = require("@promster/metrics");
var import_server = require("@promster/server");
const defaultMetricTypes = [
  "httpRequestsTotal",
  "httpRequestsHistogram",
  "httpRequestsSummary",
  "httpContentLengthHistogram"
];
let metricsServer;
function DefaultStatusCodeNormalizer(status) {
  return Math.trunc(status / 100) * 100;
}
const defaultOptions = {
  metricTypes: defaultMetricTypes,
  normalizeStatusCode: DefaultStatusCodeNormalizer
};
function MergeOptions(customizedOptions = {}) {
  return { ...defaultOptions, ...customizedOptions };
}
async function StartServer(port = 9113) {
  metricsServer = await (0, import_server.createServer)({ port });
  console.log(`Prometheus metrics exporter (@promster/server) started on port ${port}.`);
}
function GetExpressInstrumentationMiddleware(expressServer, customizedOptions) {
  return (0, import_express.createMiddleware)({
    app: expressServer,
    options: MergeOptions(customizedOptions)
  });
}
function GetHapiInstrumentationPlugin(customizedOptions) {
  return (0, import_hapi.createPlugin)({
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
  return import_metrics.Prometheus;
}
function GetPrometheusRegistry() {
  return import_metrics.defaultRegister;
}
const SquidMetrics = {
  StartServer,
  GetExpressInstrumentationMiddleware,
  GetHapiInstrumentationPlugin,
  CloseMetricsServer,
  GetPrometheusClient,
  GetPrometheusRegistry
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CloseMetricsServer,
  GetExpressInstrumentationMiddleware,
  GetHapiInstrumentationPlugin,
  GetPrometheusClient,
  GetPrometheusRegistry,
  StartServer
});
//# sourceMappingURL=squid-metrics.cjs.map