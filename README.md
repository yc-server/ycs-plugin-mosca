[![Build Status](https://travis-ci.org/yc-server/ycs-plugin-mosca.svg?branch=master)](https://travis-ci.org/yc-server/ycs-plugin-mosca.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/yc-server/ycs-plugin-mosca/badge.svg?branch=master)](https://coveralls.io/github/yc-server/ycs-plugin-mosca?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Installation

```bash
ycs add plugin mosca
```

# configurations

```ts
import { IConfig } from 'ycs-plugin-mosca';

export const development: IConfig = {
  websocket: true,
};

export const production: IConfig = {
  websocket: true,
};

```