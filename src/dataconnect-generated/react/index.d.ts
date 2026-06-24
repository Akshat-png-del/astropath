import { InsertUserData, InsertUserVariables, CreateChatSessionData, CreateChatSessionVariables, CreateMessageData, CreateMessageVariables, GetUserInsightsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useInsertUser(options?: useDataConnectMutationOptions<InsertUserData, FirebaseError, InsertUserVariables>): UseDataConnectMutationResult<InsertUserData, InsertUserVariables>;
export function useInsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<InsertUserData, FirebaseError, InsertUserVariables>): UseDataConnectMutationResult<InsertUserData, InsertUserVariables>;

export function useCreateChatSession(options?: useDataConnectMutationOptions<CreateChatSessionData, FirebaseError, CreateChatSessionVariables>): UseDataConnectMutationResult<CreateChatSessionData, CreateChatSessionVariables>;
export function useCreateChatSession(dc: DataConnect, options?: useDataConnectMutationOptions<CreateChatSessionData, FirebaseError, CreateChatSessionVariables>): UseDataConnectMutationResult<CreateChatSessionData, CreateChatSessionVariables>;

export function useCreateMessage(options?: useDataConnectMutationOptions<CreateMessageData, FirebaseError, CreateMessageVariables>): UseDataConnectMutationResult<CreateMessageData, CreateMessageVariables>;
export function useCreateMessage(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMessageData, FirebaseError, CreateMessageVariables>): UseDataConnectMutationResult<CreateMessageData, CreateMessageVariables>;

export function useGetUserInsights(options?: useDataConnectQueryOptions<GetUserInsightsData>): UseDataConnectQueryResult<GetUserInsightsData, undefined>;
export function useGetUserInsights(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserInsightsData>): UseDataConnectQueryResult<GetUserInsightsData, undefined>;
