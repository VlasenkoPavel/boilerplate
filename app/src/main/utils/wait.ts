export const wait = (timeout: number = 50): Promise<void> =>
    new Promise(resolve => {
        setTimeout(resolve, timeout);
    });

type Callback<T> = {
    (): T;
};

export const waitResult = async <T>(callback: Callback<T>, errorMessage?: string): Promise<T> => {
    let result = await callback();
    let count = 0;
    const maxCount = 30;
    let timeout = 20;
    const step = 5;

    while (!result && count < maxCount) {
        await wait(timeout);
        result = await callback();
        timeout += step;
        count += 1;
    }

    if (count === maxCount) {
        const parrent = module.parent;
        const message = errorMessage || `waitResult is fail module.parent = ${parrent.filename}`;
        throw new Error(message);
    }

    return result;
};
