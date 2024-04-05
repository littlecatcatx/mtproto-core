function getLocalStorage() {
  return {
    set(key, value) {
      return window.localStorage.setItem(key, value);
    },

    get(key) {
      return window.localStorage.getItem(key);
    },
  };
}

export default getLocalStorage;
