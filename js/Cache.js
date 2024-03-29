class Cache {
  expire = 2000;
  /** @type {string} */
  size = 10;
  store = new Map();
  set(id, data) {
    // check size
    if (this.size <= this.store.size) {
      // remove oldest
      this.removeOldest();
    }
    this.store.set(id, {
      expire: this.getExpireTimeout(id),
      ts: Date().now(),
      data,
    });
  }

  get(id) {
    const data = this.store.get(id);
    // update ts and expire
    this.updateCache(id);
    return data;
  }

  getExpireTimeout(id) {
    return window.setTimeout(() => {
      this.store.delete(id);
      this.size--;
    }, this.expire);
  }

  removeOldest() {
    let oldest = {
      ts: Infinity,
    };
    this.store.forEach((v, k) => {
      if (v.ts < oldest.ts) {
        oldest = v;
      }
    });
    this.store.delete(oldest.id);
    window.clearTimeout(oldest.expire);
  }

  updateCache(id) {
    const data = this.store.get(id);
    data.expire = this.getExpireTimeout(id);
    data.ts = Date().now();
    return data;
  }
}

const cache = new Cache();
