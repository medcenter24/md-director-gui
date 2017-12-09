/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class LocalStorageHelper {

    private storage: any = null;

    constructor () {
        if (!this.storage) {
            this.storage = localStorage;
        }
    }

    getItem (key: string): string {
        return this.storage.getItem(key);
    }

    setItem (key: string, val: string) {
        this.storage.setItem(key, val);
    }

    removeItem (key: string) {
        this.storage.removeItem(key);
    }
}
