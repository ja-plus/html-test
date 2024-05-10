import { customRef } from 'vue';

export function useLoading(value: boolean, delay = 200) {
  let refValue = value;
  let actualValue = value;
  let timeout = 0;
  const loadingRef = customRef((track, trigger) => {
    return {
      get() {
        track();
        return refValue;
      },
      set(newValue) {
        if (newValue === actualValue) return;
        if (newValue && !actualValue) {
          // false -> true
          timeout = window.setTimeout(() => {
            refValue = newValue;
            trigger();
          }, delay);
        } else if (!newValue && actualValue) {
          // true -> false
          clearTimeout(timeout);
          refValue = newValue;
          trigger();
        }
        actualValue = newValue;
      },
    };
  });
  return loadingRef;
}
