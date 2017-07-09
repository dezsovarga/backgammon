import storage from 'local-storage-fallback';

export default class LocalStorage {
    static getItem(key) {
        const item = storage.getItem(key);
        return JSON.parse(item);
    }

    static getEncodedItem(key) {
        let item = storage.getItem(key);
        item = item ? window.atob(item) : null;
        return JSON.parse(item);
    }

    static setItem(key, data) {
        const dataToStore = data ? JSON.stringify(data) : null;
        return storage.setItem(key, dataToStore);
    }

    static setEncodedItem(key, data) {
        let dataToStore = data ? JSON.stringify(data) : '';
        if (dataToStore) {
            dataToStore = window.btoa(unescape(encodeURIComponent(dataToStore)));
        }
        return storage.setItem(key, dataToStore);
    }

    static removeItem(key) {
        return storage.removeItem(key);
    }
}
