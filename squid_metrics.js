/* eslint-disable no-console */
const { createServer }     = require('@promster/server');
const { createPlugin }     = require('@promster/hapi');
const { createMiddleware } = require('@promster/express');

const defaultMetricTypes = [
  'httpRequestsTotal',
  'httpRequestsHistogram',
  'httpRequestsSummary',
  'httpContentLengthHistogram'
];

/** @type {import('http').Server | null} */
let metricsServer = null;

/**
  * Normalizes all the status within their hundred range, once that
  * the specific status does not matte (i.e: 1XX, 2XX, 3XX, 4XX, 5XX etc)
  * @param {number} status
  * @returns {string}
  */
function DefaultStatusCodeNormalizer (status)
{
  return Math.trunc(status / 100) + 'XX';
}

/** @type {PromsterOptions} */
const defaultOptions = {
  metricTypes         : defaultMetricTypes,
  normalizeStatusCode : DefaultStatusCodeNormalizer
};

/**
 * merges the customized and default options objects
 * properties defined in the customizedOptions will overwrite the
 * properties defined in defaultOptions
 * @param {PromsterOptions} customizedOptions
 * @returns {PromsterOptions}
 */
function MergeOptions (customizedOptions = {})
{
  return { ...defaultOptions, ...customizedOptions };
}

async function StartServer (port = 9113)
{
  metricsServer = await createServer({ port : port });
  console.log(`Prometheus metrics exporter (@promster/server) started on port ${port}.`);
}

/**
 * @param {ServerInstance} expressServer
 * @param {PromsterOptions} customizedOptions
 */
function GetExpressInstrumentationMiddleware (expressServer, customizedOptions)
{
  return createMiddleware({
    app     : expressServer,
    options : MergeOptions(customizedOptions)
  });
}

/**
 * @param {PromsterOptions} [customizedOptions]
 */
function GetHappiInstrumentationPlugin (customizedOptions)
{
  return createPlugin({
    options : MergeOptions(customizedOptions)
  });
}

/**
 * @returns {Promise<void>}
 */
async function CloseMetricsServer ()
{
  if (!metricsServer)
  {
    console.warn('Prometheus metrics exporter (@promster/server) is not running');
    return;
  }

  await new Promise((resolve, reject) =>
  {
    metricsServer.close((error) =>
    {
      if (error)
      {
        console.error('Error while closing the metrics server:', error);
        reject(error);
        return;
      }
      console.log('Prometheus metrics exporter (@promster/server) stopped');
      resolve();
    });
  });
}
/** @typedef {NonNullable<(Parameters<typeof createMiddleware>[0])>['app']} ServerInstance */
/** @typedef {NonNullable<(Parameters<typeof createMiddleware>[0])>['options']} PromsterOptions */

module.exports = {
  StartServer,
  GetExpressInstrumentationMiddleware,
  GetHappiInstrumentationPlugin,
  CloseMetricsServer
};
