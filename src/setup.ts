import { Ycs } from '@ycs/core';
import { preListenActions } from '@ycs/core/lib/http';
import { Router } from '@ycs/core/lib/routers';
import * as colors from 'colors/safe';
import * as koa from 'koa';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import * as moment from 'moment';
import * as mosca from 'mosca';
import * as path from 'path';
import { IConfig } from './config';

let server;

export const setup = {
  async pre(app: Ycs): Promise<Router[]> {
    console.log(
      `[${colors.green(
        moment().format('YY-MM-DD HH:mm:ss')
      )}] Setup plugin ${colors.cyan('mosca')}`
    );
    try {
      const configPath = app.dir + '/plugins/mosca';
      app.config.mosca = require(configPath)[process.env.NODE_ENV];
      setupMosca(app, app.config.mosca);
      return [];
    } catch (e) {
      console.error(e);
    }
  },
};

function setupMosca(app: Ycs, config: IConfig) {
  if (config.websocket) {
    server = new mosca.Server({});
    app.use(
      mount(
        '/mosca',
        new koa().use(serve(path.dirname(require.resolve('mosca')) + '/public'))
      )
    );
    preListenActions.push(httpServer => {
      server.attachHttpServer(httpServer);
    });
  } else {
    server = new mosca.Server({
      port: config.port,
      backend: config.backend,
    });
  }
  setupEvents(app, config);
}

function setupEvents(app: Ycs, config: IConfig) {
  if (config.events && config.events.length) {
    for (const event of config.events) {
      server.on(event.on, event.handler);
    }
  }
}

export function getMoscaServer() {
  return server;
}
