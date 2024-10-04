import { z } from 'zod'

export const envSchema = z.object({
    APP_NAME: z.string().nonempty(),
    API_DEV: z.string().url(),
    API_PROD: z.string().url()
})

export function validateEnv(env: Record<string, string | undefined>) {
    return envSchema.safeParse(env)
}

export function loadConfig(env: Record<string, string | undefined>) {
    const parsedEnv = envSchema.safeParse(env)

    if (!parsedEnv.success) {
        console.error('❌ Invalid environment variables:', parsedEnv.error.format())
        process.exit(1)
    }

    return {
        appName: parsedEnv.data.APP_NAME,
        apiDev: parsedEnv.data.API_DEV,
        apiProd: parsedEnv.data.API_PROD
    }
}