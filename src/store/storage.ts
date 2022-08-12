export class Storage {
    static readonly PREFIX = "VERBOSE_";
    static localStorage = window.localStorage;

    static get(item: string) {
        return this.localStorage.getItem(this.PREFIX + item);
    }

    static set(item: string, value: string) {
        this.localStorage.setItem(this.PREFIX + item, value);
    }
}
