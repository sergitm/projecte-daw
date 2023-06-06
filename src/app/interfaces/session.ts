export interface Session {
    id: number;
    session_id: string;
    email: string;
    nom: string;
    cognoms: string;
    username: string;
    token: {
        access_token: string;
        token_type: string;
        refresh_token: string;
        expires_in: number;
        expires_at: number;
    };
}
