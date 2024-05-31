enum StorageType {
  local = "local",
  session = "session"
}
class MyStorage {
  private _storage: Storage
  constructor(type: StorageType) {
    this._storage = type === StorageType.local ? localStorage : sessionStorage
  }

  set(key: string, value: any) {
    value = JSON.stringify(value)
    this._storage.setItem(key, value)
  }
}

console.log(1)
export {}
