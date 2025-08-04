export function getToken(code: string, redirectUri: string): Promise<unknown>;
export function refreshToken(refresh_token: string): Promise<unknown>;
export function fetchData(user_id: number): Promise<unknown>;
