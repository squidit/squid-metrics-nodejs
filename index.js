/* eslint-disable no-console */

'use strict';

const { createServer }     = require('@promster/server');
const { createPlugin }     = require('@promster/hapi');
const { createMiddleware } = require('@promster/express');

const defaultMetricTypes = [
  'httpRequestsTotal',
  'httpRequestsHistogram',
  'httpRequestsSummary',
  'httpContentLengthHistogram'
];

function DefaultStatusCodeNormalizer (status)
{
  // Normalizes all the status within their hundred range, once that
  // the specific status does not matter
  // i.e: 1XX, 2XX, 3XX, 4XX, 5XX, etc
  return Math.trunc(status / 100) + 'XX';
}

const defaultOptions = {
  metricTypes : defaultMetricTypes,
  normalizeStatusCode : DefaultStatusCodeNormalizer
}

function MergeOptions (customizedOptions)
{
  // merges the customized and default options objects
  // properties defined in the customizedOptions will overwrite the
  // properties defined in defaultOptions
  return { ...defaultOptions, ...customizedOptions };
}

function StartServer (port = 9113)
{
  createServer({ port : port }).then((server) =>
    console.log(`Prometheus metrics exporter (@promster/server) started on port ${port}.`)
  );
}

function GetExpressInstrumentationMiddleware(expressServer, customizedOptions)
{
  return createMiddleware({
    expressServer,
    options : MergeOptions(customizedOptions)
  });
}

function GetHappiInstrumentationPlugin(customizedOptions)
{
  return createPlugin({
    options : MergeOptions(customizedOptions)
  });
}

exports.StartServer = StartServer;
exports.GetExpressInstrumentationMiddleware = GetExpressInstrumentationMiddleware;
exports.GetHappiInstrumentationPlugin = GetHappiInstrumentationPlugin;
