interface ICurrentUser {
    isAuthenticated: boolean;
    roles: string[];
    username: string;

    isInRole(role: string): boolean;
}
