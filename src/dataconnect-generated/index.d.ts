import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ChatSession_Key {
  id: UUIDString;
  __typename?: 'ChatSession_Key';
}

export interface CosmicInsight_Key {
  id: UUIDString;
  __typename?: 'CosmicInsight_Key';
}

export interface CreateChatSessionData {
  chatSession_insert: ChatSession_Key;
}

export interface CreateChatSessionVariables {
  status: string;
}

export interface CreateMessageData {
  message_insert: Message_Key;
}

export interface CreateMessageVariables {
  chatSessionId: UUIDString;
  content: string;
  senderType: string;
}

export interface GetUserInsightsData {
  cosmicInsights: ({
    content: string;
    insightType: string;
    generatedAt: TimestampString;
  })[];
}

export interface InsertUserData {
  user_insert: User_Key;
}

export interface InsertUserVariables {
  email: string;
  displayName: string;
  birthDate: DateString;
  birthTime: string;
  birthLocation: string;
}

export interface MemoryFragment_Key {
  id: UUIDString;
  __typename?: 'MemoryFragment_Key';
}

export interface Message_Key {
  id: UUIDString;
  __typename?: 'Message_Key';
}

export interface NatalChart_Key {
  id: UUIDString;
  __typename?: 'NatalChart_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface InsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertUserVariables): MutationRef<InsertUserData, InsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertUserVariables): MutationRef<InsertUserData, InsertUserVariables>;
  operationName: string;
}
export const insertUserRef: InsertUserRef;

export function insertUser(vars: InsertUserVariables): MutationPromise<InsertUserData, InsertUserVariables>;
export function insertUser(dc: DataConnect, vars: InsertUserVariables): MutationPromise<InsertUserData, InsertUserVariables>;

interface CreateChatSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateChatSessionVariables): MutationRef<CreateChatSessionData, CreateChatSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateChatSessionVariables): MutationRef<CreateChatSessionData, CreateChatSessionVariables>;
  operationName: string;
}
export const createChatSessionRef: CreateChatSessionRef;

export function createChatSession(vars: CreateChatSessionVariables): MutationPromise<CreateChatSessionData, CreateChatSessionVariables>;
export function createChatSession(dc: DataConnect, vars: CreateChatSessionVariables): MutationPromise<CreateChatSessionData, CreateChatSessionVariables>;

interface CreateMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMessageVariables): MutationRef<CreateMessageData, CreateMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMessageVariables): MutationRef<CreateMessageData, CreateMessageVariables>;
  operationName: string;
}
export const createMessageRef: CreateMessageRef;

export function createMessage(vars: CreateMessageVariables): MutationPromise<CreateMessageData, CreateMessageVariables>;
export function createMessage(dc: DataConnect, vars: CreateMessageVariables): MutationPromise<CreateMessageData, CreateMessageVariables>;

interface GetUserInsightsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserInsightsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserInsightsData, undefined>;
  operationName: string;
}
export const getUserInsightsRef: GetUserInsightsRef;

export function getUserInsights(options?: ExecuteQueryOptions): QueryPromise<GetUserInsightsData, undefined>;
export function getUserInsights(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserInsightsData, undefined>;

