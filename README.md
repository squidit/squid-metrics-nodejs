<p align="center">
    <img
    src="https://img.icons8.com/dotty/128/737373/line-chart.png"
    width="128px" align="center" alt="logo" />
    <h1 align="center">Squid Metrics</h1>
    <p align="center">Submódulo responsável por instanciar um servidor de envio de métricas para o Prometheus.
</p>

# Build

Para gerar os artefatos ESM/CommonJS e os tipos em `dist/`, utilize:

```sh
npm run build
```

# Uso

ESM:

```js
import { StartServer } from 'squid-metrics'
```

CommonJS:

```js
const { StartServer } = require('squid-metrics')
```