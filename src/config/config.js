import dotenv from 'dotenv'

dotenv.config()

export const config={
    MODE: process.env.MODE || "development",
    PERSISTENCE: process.env.PERSISTENCE || "FS",
    PORT: process.env.PORT || 8000,
    MONGO_DB: process.env.MONGO_DB,
    SESSION_KEY: process.env.SESSION_KEY,
    GITHUB_KEY: process.env.GITHUB_KEY,
    GITHUB_APP_ID: process.env.GITHUB_APP_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CALLBACK: process.env.GITHUB_CALLBACK,
    SECRET_KEY: process.env.SECRET_KEY
}