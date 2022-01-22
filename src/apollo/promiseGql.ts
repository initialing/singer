import {
    ApolloClient,
    ApolloError,
    NormalizedCacheObject,
    OperationVariables,
} from "@apollo/client";
import {
    provideApolloClient,
    useResult,
    UseQueryReturn,
    useQuery,
} from "@vue/apollo-composable";
import {
    DocumentParameter,
    OptionsParameter,
    VariablesParameter,
} from "@vue/apollo-composable/dist/useQuery";

export function asyncQuery<
    TResult = any,
    TVariables extends OperationVariables = OperationVariables
>(
    client: ApolloClient<NormalizedCacheObject>,
    document:
        | DocumentParameter<TResult, TVariables>
        | DocumentParameter<TResult, undefined>,
    variables?: VariablesParameter<TVariables> | undefined | null,
    options?:
        | OptionsParameter<TResult, TVariables>
        | OptionsParameter<TResult, null>
): Promise<
    | UseQueryReturn<TResult, TVariables>
    | UseQueryReturn<TResult, null>
    | UseQueryReturn<TResult, undefined>
> {
    return new Promise(
        (
            resolve: (
                val:
                    | UseQueryReturn<TResult, TVariables>
                    | UseQueryReturn<TResult, null>
                    | UseQueryReturn<TResult, undefined>
            ) => void,
            reject: (param: ApolloError) => void
        ) => {
            const Result = provideApolloClient(client)(() => {
                if (variables != undefined && options != undefined) {
                    return useQuery(
                        document,
                        variables as VariablesParameter<TVariables>,
                        options as OptionsParameter<TResult, TVariables>
                    );
                } else if (variables == null && options != undefined) {
                    return useQuery(
                        document as DocumentParameter<TResult, undefined>,
                        null,
                        options as OptionsParameter<TResult, null>
                    );
                } else if (variables != undefined && options == undefined) {
                    return useQuery(document, variables);
                } else {
                    return useQuery(document);
                }
            });
            const val = useResult(Result.result, null, (data) => data).value;
            if (val) {
                resolve(Result);
            }
            Result.onResult((qr) => {
                if (qr.data) {
                    resolve(Result);
                }
            });
            Result.onError((er) => {
                reject(er);
            });
        }
    );
}
