parseLocalStorage = (storageKey) => parseInt(localStorage[storageKey]) || 0;

maxToLocalStorage = (storageKey, newValue) => {
    if (parseLocalStorage(storageKey) < newValue) {
        localStorage[storageKey] = newValue;
    }
}
