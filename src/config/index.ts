const config = {
    environment: 'dev',
    port: 7000,
    database: {
        url: 'mongodb://localhost:27017/boss'
    },
    security:{
        secretKey: 'seirios',
        expiresIn: 60*60*24*30
    }
}

export default config;
