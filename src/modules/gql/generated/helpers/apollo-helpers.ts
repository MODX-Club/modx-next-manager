import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AuthPayloadKeySpecifier = ('token' | 'userId' | AuthPayloadKeySpecifier)[];
export type AuthPayloadFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('signin' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	signin?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('me' | 'user' | 'usersConnection' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	usersConnection?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('active' | 'cls' | 'id' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	active?: FieldPolicy<any> | FieldReadFunction<any>,
	cls?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UsersConnectionResponseKeySpecifier = ('total' | 'users' | UsersConnectionResponseKeySpecifier)[];
export type UsersConnectionResponseFieldPolicy = {
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	AuthPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthPayloadKeySpecifier | (() => undefined | AuthPayloadKeySpecifier),
		fields?: AuthPayloadFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UsersConnectionResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UsersConnectionResponseKeySpecifier | (() => undefined | UsersConnectionResponseKeySpecifier),
		fields?: UsersConnectionResponseFieldPolicy,
	}
};