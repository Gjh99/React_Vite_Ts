export interface GlobalState {
    type: string;
    isDarkMode: boolean;
    locale: string;
}

export interface AuthState {
    token?: string;
}
