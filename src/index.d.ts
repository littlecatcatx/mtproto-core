//@ts-ignore
import RPC from './rpc';
import { Methods } from './tl/types/schema';
import { updateShortMessage, updatesTooLong, updateShortChatMessage,
  updateShort, updateShortSentMessage, updates, updatesCombined } from './tl/types/schema';
import { EventEmitter } from 'events';

type MethodReturnMap<T extends Methods> = {
  [K in keyof T]: T[K] extends { return: infer R } ? R : never;
};

type MethodOptions = {
  syncAuth?: boolean;
  dcId?: number;
};

type Error = {
  _: string;
  error_code: number;
  error_message: string;
};

declare class CustomStorage {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
}

declare interface UpdatesEventMap {
  'updatesTooLong': [updatesTooLong],
  'updateShortMessage': [updateShortMessage],
  'updateShortChatMessage': [updateShortChatMessage],
  'updateShort': [updateShort],
  'updatesCombined': [updatesCombined],
  'updates': [updates],
  'updateShortSentMessage': [updateShortSentMessage],
}

declare class MTProto {
  readonly updates: EventEmitter<UpdatesEventMap>;
  readonly api_id: number;
  readonly api_hash: string;
  readonly storage: CustomStorage;

  constructor(options: {
    api_id: number;
    api_hash: string;
    test?: boolean;
    storageOptions?: {
      instance: CustomStorage;
    };
  });

  /**
   * @throws {Error}
   */
  call<T extends keyof Methods>(
    method: T,
    params?: Methods[T]['params'],
    options?: MethodOptions,
  ): Promise<MethodReturnMap<Methods>[T]>;

  syncAuth(
    dcId: number,
  ): Promise<(MethodReturnMap<Methods>['auth.importAuthorization'] | undefined)[]>;

  setDefaultDc(dcId: number): ReturnType<InstanceType<typeof CustomStorage>['set']>;

  getRPC(dcId: number): InstanceType<typeof RPC>;

  updateInitConnectionParams(params: Record<string, string>): void;
}

export { CustomStorage, Methods, MethodReturnMap, MethodOptions, Error };
export * from './tl/types/schema';
export default MTProto;
