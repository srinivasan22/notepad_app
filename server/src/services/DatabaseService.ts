import { dbConfig } from "../constants/config"
import { MongoClient } from 'mongodb';
import { readFileSync } from "fs";

export class DatabaseService {
    private dbCredentials;
    private dbClient;
    private dbName: string;
    private collection: string;

    public constructor(dbName: string, collection: string, useCert: boolean, dbCertFilePath?: string, ) {
        if (useCert && dbCertFilePath) {
            this.dbCredentials = readFileSync(dbCertFilePath);
            this.dbClient = new MongoClient(dbConfig.connectionUrl, {
                sslKey: this.dbCredentials,
                sslCert: this.dbCredentials,
                minPoolSize: 1,
                maxPoolSize: 5
            });
        }else {
            /**
             * For credential-based login, Username and password will be inside the URL string itself
             * Eg. URL: "mongodb+srv://<USER_NAME>:<PASSWORD>@<CLUSTER_NAME>.mongodb.net/test?w=majority"
             */
            this.dbClient = new MongoClient(dbConfig.connectionUrl, {
                minPoolSize: 1,
                maxPoolSize: 5
            });
        }

        this.dbName = dbName;
        this.collection = collection;
        this.initialize();
    }

    private async initialize() {
        return this.dbClient.connect().then(async dbClient => {
            console.log("connected")
            this.dbClient = dbClient;
            /**
             * If the collection is already present (which is most of the cases), 
             * the following call will throw error and hence we ignore it.
             */
            return this.dbClient.db(this.dbName).createCollection(this.collection).catch(_err => {
                // Ignore error
                JSON.stringify(_err);

            }).finally(()=>{
                console.log(`Database Connection Established Successfully`);
            });
        }).catch(err => {
            JSON.stringify(err);
        });
    }

    public async getDBClient() {
            return this.dbClient;
    }
}