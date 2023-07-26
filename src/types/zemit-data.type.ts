import ZemitIdentity from '@/types/zemit-identity.type';

export default interface ZemitData<T> {
    view: T,
    identity?: ZemitIdentity,
    api: {
        app: string,
        core: string,
        name: string,
        phalcon: string,
        php: string,
        version: string,
        zemit: string,
    },
    hash: string,
    response: boolean,
    code: number,
    status: string,
    timestamp: string,
    dispatcher?: any,
    profiler?: any,
    request?: any,
    router?: any,
}
