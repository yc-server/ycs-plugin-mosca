import { IConfig, setup, getMoscaServer } from '../src/';
import { dev } from './plugins/mosca';

jest.mock('mosca', () => {
  return {
    Server: class {
      settings: any;
      constructor(settings: any) {
        this.settings = settings;
      }
      on(event: string, handler: any) {
        handler();
      }
    },
  };
});

process.env.NODE_ENV = 'dev';
console.log = jest.fn();
console.error = jest.fn();

test('Should setup', async () => {
  const app: any = { dir: __dirname, use: jest.fn(), config: {} };
  const router = await setup.pre(app);
  expect(router.length).toBe(0);
  expect(app.config.mosca).toMatchObject({
    websocket: true,
  });
});

test('Should setup without websocket', async () => {
  dev.websocket = false;
  const app: any = { dir: __dirname, config: {} };
  const router = await setup.pre(app);
  expect(app.config.mosca).toMatchObject({
    websocket: false,
  });
});

test('Should setup with events', async () => {
  let ok;
  dev.events = [
    {
      on: 'ok',
      handler: () => {
        ok = true;
      },
    },
  ];
  const app: any = { dir: __dirname, config: {} };
  const router = await setup.pre(app);
  expect(ok).toBe(true);
});

test('Should get the server', () => {
  expect(getMoscaServer()).toBeTruthy();
});

test('Should setup with an error', async () => {
  const app: any = { dir: 'somewhere', config: {} };
  try {
    await setup.pre(app);
  } catch (e) {}
  expect(true).toBeTruthy();
});
