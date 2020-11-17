import { CommitOptions, DispatchOptions } from 'vuex';
import { ROOT_STATE } from '.';
import { ACTIONS } from './actions';
import { GETTERS } from './getters';
import { MUTATIONS } from './mutations';

type Mutation = typeof MUTATIONS;
type Action = typeof ACTIONS;
type Getter = typeof GETTERS;
export type RootState = typeof ROOT_STATE;

interface MutationPayload<P> {
    type: P;
}

interface ActionPayload<P> {
    type: P;
}

export interface Commit {
    <T extends keyof Mutation> (type: T, payload?: Parameters<Mutation[T]>[1], options?: CommitOptions): void;
    <P extends keyof Mutation, K extends MutationPayload<P>> (payloadWithType: K, options?: CommitOptions): void;
}

export interface Dispatch {
    <T extends keyof Action> (type: T, payload?: Parameters<Action[T]>[1], options?: DispatchOptions): void;
    <P extends keyof Action, K extends ActionPayload<P>> (payloadWithType: K, options?: DispatchOptions): void;
}

export type Getters = {
    readonly [P in keyof Getter]: ReturnType<Getter[P]>;
};

export interface ActionContext<S, T> {
    dispatch: Dispatch;
    commit: Commit;
    state: S;
    getters: T;
    rootState: RootState;
    rootGetters: Getter;
}
