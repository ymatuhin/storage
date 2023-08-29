import storageAvailable from "storage-available";

type Params = {
  type?: "localStorage" | "sessionStorage";
  logger?: Function;
};

export const createStorage = (
  key: string,
  { type = "localStorage", logger }: Params = {}
) => {
  const hasStorage = storageAvailable(type);
  type IStorage = { [key: string]: string };
  const storage: IStorage = hasStorage ? window[type] : {};

  if (!hasStorage) {
    console.warn(`"${type}" doesn't work, safely fallback to object`);
  }

  return {
    remove: () => {
      logger?.(`× ${key}`);
      delete storage[key];
    },
    set: (value: any) => {
      logger?.(`▶️ ${key}`, value);
      storage[key] = JSON.stringify({ value });
    },
    get: () => {
      try {
        const value = JSON.parse(storage[key] ?? "{}").value;
        logger?.(`◀️ ${key}`, value);
        return value;
      } catch (error) {
        throw new Error(`Can't parse value from "${type}.${key}".`);
      }
    },
  };
};
