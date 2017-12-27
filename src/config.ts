export interface IConfig {
  /**
   * Mosca (mqtt) port.
   * No need if websocket is set to true.
   */
  port?: number;
  /**
   * pub/sub settings object. 
   * No need if websocket is set to true.
   */
  backend?: { [x: string]: any };
  /**
   * mqtt over websocket
   */
  websocket?: boolean;
  /**
   * events
   */
  events?: IEvent[];
}

export interface IEvent {
  on: string;
  handler: (...args: any[]) => void;
}
