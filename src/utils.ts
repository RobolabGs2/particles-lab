export namespace Rand {
    export function range(min = 0, max = 1) {
        return Math.random() * (max - min) + min
    }
    export function signed(max = 1, min = 0) {
        return sign() * range(min, max);
    }
    export function sign() {
        return Math.random() > 0.5 ? 1 : -1
    }
}

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(function (resolve, reject) {
        let img = new Image();
        img.crossOrigin = 'anonymous'
        img.onload = function () {
            return resolve(img);
        };
        img.onerror = function () {
            return reject(new Error(`Can't load image ${url}`));
        };
        img.src = url;
    });
}

export function mapRecord<K extends string, T1, T2>(record: Record<K, T1>, map: (value: T1, key: K) => T2): Record<K, T2> {
    return Object.fromEntries(Object.entries<T1>(record).map(([key, value]) => {
        return [key, map(value, key as K)];
    })) as Record<K, T2>;
}
