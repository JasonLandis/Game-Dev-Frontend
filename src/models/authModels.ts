export interface IAuth {
	username: string;
	password: string;
    email?: string;
}

export interface ITokens {
	access: string;
	refresh: string;
}
