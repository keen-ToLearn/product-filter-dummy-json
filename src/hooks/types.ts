type CallMethodArgsType = string | number;

type FetchCallHelperArgsType<D> = {
    callMethod: (...args: CallMethodArgsType[]) => Promise<Response>;
    callArgs?: CallMethodArgsType[];
    successCallback: (data: D) => void;
}

export type DoFetchCallFuncType = <D>(helper: FetchCallHelperArgsType<D>) => Promise<void>;