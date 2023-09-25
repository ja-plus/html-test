/**
 * @typedef CreateOption
 * @prop {string} url
 * @prop {number} overtimeMs 超时
 * @prop {number} heartBeatInterval 心跳间隔
 * @prop {string} heartBeatMessage 心跳信息
 */

/**@type {CreateOption} */
const defaultOption = {
  overtimeMs: 5_000,
  heartBatInterval: 60_000,
  heartBeatMessage: 'heartbeat',
};

class Ws {
  /** @type {WebSocket} */
  ws;
  /** @type {number} 心跳循环*/
  wsHeartBeatsTimer = 0;
  /** @type {CreateOption} */
  option;
  /**
   *
   * @param {CreateOption} option
   */
  constructor(option) {
    this.option = Object.assign(option, defaultOption);

    this.ws = new WebSocket(option.url);
    this.checkOvertime();
  }
  /** 检查超时 */
  checkOvertime() {
    self.setTimeout(() => {
      if (this.ws && this.ws.readyState !== -1) this.ws.close();
    }, this.option.overtimeMs);
  }
  /** 心跳 */
  heartBeat() {
    this.wsHeartBeatsTimer = self.setTimeout(() => {
      this.ws.send();
    }, this.option.heartBeatInterval);
  }
  addEvent() {
    this.ws.onopen = () => {};
    this.ws.onerror = e => {
      console.error(e);
    };
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data);
    };
    this.ws.onclose = () => {};
  }
}

/**
 *
 * @param {CreateOption} option
 */
export function createWebSocket(option) {
  return new Ws(option);
}
