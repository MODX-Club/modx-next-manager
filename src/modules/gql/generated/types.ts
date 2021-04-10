/* eslint-disable */

/** 
* ФАЙЛ ГЕНЕРИРУЕТСЯ АВТОМАТИЧЕСКИ, ПРАВИТЬ ЕГО НЕ НУЖНО 
* Команда для генерирования этого файла: "yarn generate:types" 
*/


export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: globalThis.Date;
};

export interface AuthPayload {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  userId: Scalars['Int'];
}


export interface Mutation {
  __typename?: 'Mutation';
  /** Авторизация */
  signin?: Maybe<AuthPayload>;
}


export type MutationSigninArgs = {
  login_context?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export interface Query {
  __typename?: 'Query';
  /** Current authorized user */
  me?: Maybe<User>;
  user?: Maybe<User>;
  /** Список пользователей с указанием общего количества */
  usersConnection: UsersConnectionResponse;
}


export type QueryMeArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<UserWhereInput>;
};

export interface User {
  __typename?: 'User';
  active: Scalars['Boolean'];
  /** Классы для оформления меню в зависимости от статуса пользователя */
  cls?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  username: Scalars['String'];
}

/** Условия поиска пользователей */
export interface UserWhereInput {
  /** Поиск по юзернейму, имени, емейлу */
  query?: Maybe<Scalars['String']>;
}

/** Условие поиска уникального пользователя */
export interface UserWhereUniqueInput {
  id: Scalars['Int'];
}

/** Список пользователей с указанием общего количества */
export interface UsersConnectionResponse {
  __typename?: 'UsersConnectionResponse';
  /** Общее количество пользователей */
  total: Scalars['Int'];
  /** Список пользователей */
  users: Array<User>;
}
