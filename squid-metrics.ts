import { createMiddleware, type TPromsterOptions } from '@promster/express'
import { createPlugin } from '@promster/hapi'
import { Prometheus, defaultRegister } from '@promster/metrics'
import { createServer } from '@promster/server'
import type { Request, Response, NextFunction } from 'express'
import type { Server } from 'node:http'
import type { Registry } from 'prom-client'

type CreateMiddlewareOptions = NonNullable<Parameters<typeof createMiddleware>[0]>

export type ServerInstance = CreateMiddlewareOptions['app']
export type PromsterOptions = TPromsterOptions

const defaultMetricTypes = [
  'httpRequestsTotal',
  'httpRequestsHistogram',
  'httpRequestsSummary',
  'httpContentLengthHistogram',
]

let metricsServer: Server | undefined

/**
 * Normalizes all the status within their hundred range, once that
 * the specific status does not matte (i.e: 1XX, 2XX, 3XX, 4XX, 5XX etc)
 */
function DefaultStatusCodeNormalizer(status: number): number {
  return Math.trunc(status / 100) * 100
}

const defaultOptions: PromsterOptions = {
  metricTypes: defaultMetricTypes,
  normalizeStatusCode: DefaultStatusCodeNormalizer,
}

/**
 * merges the customized and default options objects
 * properties defined in the customizedOptions will overwrite the
 * properties defined in defaultOptions
 */
function MergeOptions(customizedOptions: PromsterOptions = {}): PromsterOptions {
  return { ...defaultOptions, ...customizedOptions }
}

/**
 * Starts the metrics HTTP exporter server.
 */
async function StartServer(port = 9113): Promise<void> {
  metricsServer = await createServer({ port: port })
  console.log(`Prometheus metrics exporter (@promster/server) started on port ${port}.`)
}

function GetExpressInstrumentationMiddleware(
  expressServer: ServerInstance,
  customizedOptions?: PromsterOptions,
): (request: Request, response: Response, next: NextFunction) => void {
  return createMiddleware({
    app: expressServer,
    options: MergeOptions(customizedOptions),
  })
}

function GetHapiInstrumentationPlugin(customizedOptions?: PromsterOptions): import('@hapi/hapi').Plugin<unknown> {
  return createPlugin({
    options: MergeOptions(customizedOptions),
  })
}

async function CloseMetricsServer(): Promise<void> {
  if (!metricsServer) {
    console.warn('Prometheus metrics exporter (@promster/server) is not running')
    return
  }

  await new Promise<void>((resolve, reject) => {
    metricsServer.close((error) => {
      if (error) {
        console.error('Error while closing the metrics server:', error)
        reject(error)
        return
      }

      console.log('Prometheus metrics exporter (@promster/server) stopped')
      resolve()
    })
  })
}

/**
 * Returns the Prometheus client (prom-client) for creating custom metrics
 */
function GetPrometheusClient(): typeof import('prom-client') {
  return Prometheus
}

/**
 * Returns the default Prometheus registry used by @promster
 * This is the same registry where HTTP metrics are registered
 */
function GetPrometheusRegistry(): Registry {
  return defaultRegister
}

const SquidMetrics = {
  StartServer,
  GetExpressInstrumentationMiddleware,
  GetHapiInstrumentationPlugin,
  CloseMetricsServer,
  GetPrometheusClient,
  GetPrometheusRegistry,
}

export {
  StartServer,
  GetExpressInstrumentationMiddleware,
  GetHapiInstrumentationPlugin,
  CloseMetricsServer,
  GetPrometheusClient,
  GetPrometheusRegistry,
}
