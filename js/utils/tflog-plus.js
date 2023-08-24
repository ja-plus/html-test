/**
 * descriptor: 注意！！！ 重写了console。将console的信息也输出到了TFLog，因此，在内部不建议再直接使用被重写过的console.log，而是使用console.__log
 * @version 1.1.1
 **/
console.__log = console.log;
console.__warn = console.warn;
console.__error = console.error;
console.__info = console.info;
/**
 * @typedef LogRecord
 * @property {number} time
 * @property {string} namespace
 * @property {'log'|'warn'|'error'|'info'} level
 * @property {string} descriptor
 * @property {any[]} data
 */

const TFLog = (function () {
  const STATUS_MAP = {
    INITING: 1,
    INITED: 2,
    FAILED: 3,
  };
  const varStorage = {
    /**@type {IDBDatabase} */
    db: null,
    isSupportIndexedDB: isSupportIDB(),
    status: STATUS_MAP.INITING,
    database: 'TFLog',
    pool: [],
    recordPool: [],
    recordLock: false,
  };

  // maxDeep,最多的层级限制 6。在低版本浏览器下 hasOwnProperty 无效，遍历dom出现问题
  function filterFunction(obj, maxDeep = 5) {
    if (maxDeep === 0) return '';
    try {
      // 函数则转为字符串
      if (typeof obj === 'function') return obj.toString();
      if (typeof obj === null) return null;
      if (typeof obj !== 'object') return obj;
      let newObj = {};
      for (let key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const item = obj[key];
          if (typeof item !== 'function' && !isDOM(item)) {
            newObj[key] = filterFunction(item, maxDeep - 1);
          }
        }
      }
      return newObj;
    } catch (e) {
      return {
        error: 'filterFunction error',
      };
    }
  }
  // dom会不断遍历，在低版本浏览器下存在问题
  function isDOM(obj) {
    try {
      //Using W3 DOM2 (works for FF, Opera and Chrome)
      return obj instanceof HTMLElement || obj instanceof SVGElement || obj instanceof Element;
    } catch (e) {
      //Browsers not supporting W3 DOM2 don't have HTMLElement and
      //an exception is thrown and we end up here. Testing some
      //properties that all elements have (works on IE7)
      return typeof obj === 'object' && obj.nodeType === 1 && typeof obj.style === 'object' && typeof obj.ownerDocument === 'object';
    }
  }

  function transTimeFormat(time, relative) {
    // if falsy value or timestamp already, pass it through directly,
    time = String(time);
    if (!time || /^\d{13}$/.test(time)) {
      return +time;
    }
    // incase relative time isn't unix timestamp format,
    // neither a falsy value which will turned out to be Date.now()
    if (relative && !/^\d{13}$/.test(relative)) {
      throw new TypeError('relative time should be standard unix timestamp');
    }
    return (relative || Date.now()) - time.replace(/d$/, '') * 24 * 3600 * 1000;
  }

  function consumePool(pool = []) {
    let handler;
    while ((handler = pool.shift())) {
      handler();
    }
  }

  function isSupportIDB() {
    var support;
    try {
      // indexedb 不支持 iframe
      if (self !== top) {
        return false;
      }

      support = !!(window.indexedDB && window.IDBTransaction && window.IDBKeyRange);
      if (support) {
        window.IDBTransaction.READ_WRITE = 'readwrite';
        window.IDBTransaction.READ_ONLY = 'readonly';
      }
      return support;
    } catch (e) {
      return false;
    }
  }

  function throwError(errorMsg, error) {
    // 异常，则置为FAILED 拒绝之后的操作
    varStorage.status = STATUS_MAP.FAILED;
    var errorStr = '';
    try {
      if (error) {
        errorMsg = errorMsg + ':' + (error.message || error.stack || error.name);
        errorStr = error.toString();
      }
    } catch (e) {
      errorStr = 'try-catch';
    }
    console.__error && console.__error('#TFLog throwError#', errorMsg, errorStr);
  }

  function initIndexedDB() {
    try {
      if (!varStorage.isSupportIndexedDB || varStorage.status !== STATUS_MAP.INITING) {
        return false;
      }

      let request = window.indexedDB.open(varStorage.database, 1);
      request.onerror = function (event) {
        throwError('protocol indexeddb is prevented.', event.target.error);
        if (event.target.error && event.target.error.name === 'QuotaExceededError') {
          // 存储满了，则全部清除 每日100+用户  Encountered full disk while opening backing store for indexedDB.open.
          clean();
        }
      };
      request.onsuccess = function (event) {
        varStorage.db = event.target.result;
        varStorage.status = STATUS_MAP.INITED;
        varStorage.db.onclose = function (_event) {
          return throwError('indexeddb_init_success_onclose', _event.target.error);
        };
        varStorage.db.onabort = function (_event) {
          return throwError('indexeddb_init_success_onabort', _event.target.error);
        };
        // globally handle db request errors
        varStorage.db.onerror = function (_event) {
          return throwError('indexeddb_init_success_onerror', _event.target.error);
        };

        consumePool(varStorage.pool);
      };
      // This event is triggered when the upgradeneeded should be triggered because of a version change but the database is still in use (that is, not closed) somewhere, even after the versionchange event was sent.
      request.onblocked = function () {
        // "Error: Failed to read the 'error' property from 'IDBRequest': The request has not finished.
        // 这里无法读取 event.target.error属性，因为请求已经结束。因此会报错
        return throwError('indexeddb_init_blocked');
      };

      request.onupgradeneeded = function (event) {
        // init dabasebase
        var store;
        try {
          varStorage.db = event.target.result;
          if (!varStorage.db) {
            return throwError('onupgradeneeded_is_null');
          }
          if (!varStorage.db.objectStoreNames.contains('logs')) {
            store = varStorage.db.createObjectStore('logs', { autoIncrement: true });
            store.createIndex('namespace', 'namespace', { unique: false });
            store.createIndex('level', 'level', { unique: false });
            store.createIndex('descriptor', 'descriptor', { unique: false });
            store.createIndex('data', 'data', { unique: false });
            store.createIndex('time', 'time', { unique: false });
          }
        } catch (e) {
          // throw Error:
          // Uncaught TransactionInactiveError: Failed to execute 'createObjectStore' on 'IDBDatabase': The transaction is not active.
          // Uncaught TransactionInactiveError: Failed to execute 'createObjectStore' on 'IDBDatabase': The transaction has finished.
          // Uncaught InvalidStateError: Failed to execute 'createObjectStore' on 'IDBDatabase': The database is not running a version change transaction.

          throwError('indexeddb_init_onupgradeneeded', e);
        }
      };
    } catch (e) {
      throwError('indexeddb_init', e);
    }
  }

  // 输出日志
  // function showLog(namespace, level, descriptor, data) {
  //   record(namespace, level, descriptor, data);
  //   if (namespace === 'console') {
  //     return;
  //   }
  //   // if (data && typeof data === 'object' && data.length !== 0) {
  //   //   console['__' + level] && console['__' + level](namespace, descriptor, data);
  //   // } else {
  //   //   console['__' + level] && console['__' + level](namespace, descriptor);
  //   // }
  // }

  function storeLog(namespace, level, descriptor, data) {
    try {
      if (varStorage.status === STATUS_MAP.FAILED) {
        varStorage.pool = [];
        varStorage.recordPool = [];
        return false;
      }
      if (varStorage.status === STATUS_MAP.INITING) {
        varStorage.pool.push(function () {
          storeLog(namespace, level, descriptor, data);
        });
        return;
      }
      // 如果上一条record函数尚未onsuccess则压入record待执行队列。将record串行执行
      if (varStorage.recordLock) {
        varStorage.recordPool.push(function () {
          storeLog(namespace, level, descriptor, data);
        });
        return;
      }
      varStorage.recordLock = true;

      const transaction = getTransaction();
      if (!transaction) {
        return throwError('getTransaction is null');
      }
      const store = transaction.objectStore('logs');
      // should not contains any function in data
      // otherwise 'DOMException: Failed to execute 'add' on 'IDBObjectStore': An object could not be cloned.' will be thrown
      const curDate = new Date();
      const timeStr = `${curDate.getMonth() + 1}-${curDate.getDate()} ${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}`;

      /**@type {LogRecord} */
      const recordObj = {
        timeMs: Date.now(),
        time: timeStr,
        level,
        namespace,
        descriptor: filterFunction(descriptor),
        data: filterFunction(data),
      };
      const request = store.add(recordObj);
      // 这里的异常和transaction的异常会同时上报，不存在冒泡关系
      // request.onerror = function (event) {
      //     event.stopPropagation();
      //     throwError('indexeddb_record_request', event.target.error);
      // };

      request.onsuccess = function () {
        // 标记为false
        varStorage.recordLock = false;
        // 将record函数压入栈串行压入，即onsucces好后再执行下一条。如果失败则之后的直接拒绝
        varStorage.recordPool = varStorage.recordPool || [];
        let handler = varStorage.recordPool.shift();
        handler && handler();
      };
    } catch (e) {
      throwError('indexeddb_record', e);
    }
  }

  function getTransaction() {
    var transaction,
      isErrorToAbort = false;
    try {
      transaction = varStorage.db.transaction(['logs'], IDBTransaction.READ_WRITE || 'readwrite');
      // 当触发异常时：可以调用event.preventDefault()避免事务被取消，因此此处会上报2次
      // Could call event.preventDefault() to prevent the transaction from aborting.
      // Otherwise the transaction will automatically abort due the failed request.

      // 通过标识是否是通过error报出的异常导致的abort，来决定是否上报abort异常
      isErrorToAbort = false;

      transaction.onerror = function (event) {
        event.stopPropagation();
        isErrorToAbort = true;
        return throwError('indexeddb_record_transaction', event.target.error);
      };
      transaction.onabort = function (event) {
        // TimeoutError:Transaction timed out due to inactivity.
        // Connection is closing.
        // An unknown error occurred within Indexed Database.
        // An internal error was encountered in the Indexed Database server
        // Internal error committing transaction.
        // Error finding current key generator value in database
        // Error checking for existence of IDBKey in object store
        // Unable to store record in object store

        event.stopPropagation();

        !isErrorToAbort && throwError('indexeddb_record_transaction_onabort', event.target.error);
        if (event.target.error && event.target.error.name === 'QuotaExceededError') {
          // 存储满了，则全部清除 每日3K条
          // Encountered disk full while committing transaction.
          // An attempt was made to add something to storage that exceeded the quota
          clean();
        }
      };
      // 事务成功回调
      // transaction.oncomplete = function(event){

      // }
      // if(!transaction) return throwError('getTransaction is null');
      // 调用处得加上不为空的判断，每天有十几个用户报此错误
      return transaction;
    } catch (e) {
      throwError('getTransaction', e);
    }
  }

  function clean() {
    try {
      // database can be removed only after all connections are closed
      varStorage.status = STATUS_MAP.FAILED;
      // 可能在打开的时候就失败 此时db尚未赋值
      varStorage.db && varStorage.db.close();
      const request = window.indexedDB.deleteDatabase(varStorage.database);
      request.onerror = function (event) {
        // 1. Internal error opening backing store for indexedDB.deleteDatabase.
        // 2. Internal error deleting database.
        return throwError('clean_error', event.target.error);
      };
      // request.onsuccess = function (event) {
      console.__log('清理成功');
      // };
    } catch (e) {
      throwError('indexeddb_clean', e);
    }
  }
  /**
   * 通过时间
   * @param {[number,number]} param0 [几天前开始，几天前结束]
   * @returns
   */
  function getByDate([from, to]) {
    if (varStorage.status === STATUS_MAP.FAILED) {
      varStorage.pool = [];
      return false;
    }

    if (varStorage.status === STATUS_MAP.INITING) {
      varStorage.pool.push(function () {
        getByDate([from, to]);
      });
      return;
    }

    from = transTimeFormat(from);
    to = transTimeFormat(to);

    return get({
      filter: record => from && to && record.timeMs > from && record.timeMs < to,
    });
  }

  /**
   * 获取日志
   * @param {function} filter
   */
  function get(filter) {
    if (!filter) {
      throw new Error('TFLog.getData(option),option.filter need a function parameter');
    }
    try {
      const transaction = getTransaction();
      if (!transaction) return throwError('getTransaction is null');

      const store = transaction.objectStore('logs');
      const logs = [];
      return new Promise(resolve => {
        store.openCursor().onsuccess = function (event) {
          const cursor = event.target.result;
          if (cursor) {
            if (!cursor.value || (filter && !filter(cursor.value))) {
              return cursor.continue();
            }
            logs.push(cursor.value);
            cursor.continue();
          } else {
            resolve(logs);
          }
        };
      });
    } catch (e) {
      throwError('indexeddb_get', e);
    }
  }

  /**
   *
   * @param {LogRecord[]} logs
   */
  function download(logs) {
    let str = 'time,level,namespace,description,data\n';
    for (let i = 0; i < logs.length; i++) {
      const record = logs[i];
      str += `${record.time},${record.level},${record.namespace},${JSON.stringify(record.descriptor)},${JSON.stringify(record.data)}\n`;
    }
    const file = new Blob([str], { type: 'text/plain' });
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'log.txt';
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }
  /**
   *
   * @param {number} daysToMaintain 保存近几天的日志
   * @returns
   */
  function keep(daysToMaintain) {
    try {
      if (varStorage.status === STATUS_MAP.FAILED) {
        varStorage.pool = [];
        return false;
      }

      if (varStorage.status === STATUS_MAP.INITING) {
        varStorage.pool.push(function () {
          keep(daysToMaintain);
        });
        return;
      }
      const transaction = getTransaction();
      if (!transaction) return throwError('getTransaction is null');

      const store = transaction.objectStore('logs');

      if (!daysToMaintain) {
        store.clear().onerror = function (event) {
          return throwError('indexedb_keep_clear', event.target.error);
        };
      } else {
        const request = store.openCursor();
        request.onsuccess = function (event) {
          const range = Date.now() - daysToMaintain * 24 * 3600 * 1000;
          const cursor = event.target.result;
          if (cursor && cursor.value && cursor.value.time < range) {
            store.delete(cursor.primaryKey);
            cursor.continue();
          }
        };
        request.onerror = function (event) {
          return throwError('unable to locate logs earlier than ' + daysToMaintain + 'd.', event.target.error);
        };
      }
    } catch (e) {
      throwError('indexeddb_keep', e);
    }
  }
  // 初始化
  initIndexedDB();

  class TFLog {
    /**超过这个值，清理一下控制台 */
    static cleanSize = 5000;
    constructor(namespace) {
      this.namespace = namespace;
    }
    static keep = keep;
    static clean = clean;
    static get = get;
    static getByDate = getByDate;
    static record = storeLog;
    static download = download;

    log(descriptor, ...data) {
      storeLog(this.namespace, 'log', descriptor, data);
    }
    warn(descriptor, ...data) {
      storeLog(this.namespace, 'warn', descriptor, data);
    }
    error(descriptor, ...data) {
      storeLog(this.namespace, 'error', descriptor, data);
    }
    info(descriptor, ...data) {
      storeLog(this.namespace, 'info', descriptor, data);
    }
  }

  return TFLog;
})();
//  export default TFLog

/**重写console */
function rewriteConsole() {
  const tfLog = new TFLog('console');
  /**记录控制台日志数量 */
  let consoleNum = 0;
  /**
   * @param {'log'|'warn'|'info'|'error'} key
   * @param {any[]} args
   */
  const consoleReplacer = (key, args) => {
    console['__' + key].apply(console, args);
    consoleNum++;
    tfLog[key](...args);
    if (consoleNum > TFLog.cleanSize) {
      console.clear();
      consoleNum = 0;
      console.__log(`日志数量达到${TFLog.cleanSize},自动清空控制台。您可通过修改TFLog.cleanSize的值变更。`);
    }
  };
  console.log = function (...args) {
    consoleReplacer('log', args);
  };
  console.warn = function (...args) {
    consoleReplacer('warn', args);
  };
  console.error = function (...args) {
    consoleReplacer('error', args);
  };
  console.info = function (...args) {
    consoleReplacer('info', args);
  };
  console.__log('tflog已劫持console');
  window.addEventListener('error', e => {
    tfLog.error(e);
  });
  window.addEventListener('unhandledrejection', e => {
    tfLog.error(e);
  });
}
rewriteConsole();
