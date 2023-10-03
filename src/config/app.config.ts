
export const EnvConfiguration = () =>({
    environment: process.env.NDE_ENV  || 'dev',
    mongodb: process.env.MONGODB,
    prot: process.env.PORT || 3002,
    default_limit: +process.env.DEFAULT_LIMIT || 7
})