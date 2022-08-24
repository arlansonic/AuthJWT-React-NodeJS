import mongoose from 'mongoose'

import config from '../config/database'

class Database {
    constructor() {
        this.connection = mongoose.connect(
            config.url,
            {
                maxPoolSize: 50,
                wtimeoutMS: 2500,
                useNewUrlParser: true
            }
        )
        console.log('MongoDB Connected')
    }
}


export default new Database();