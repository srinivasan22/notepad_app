import { dbConfig } from "../constants/config"
import { MongoClient } from 'mongodb';
import { readFileSync } from "fs";

/**
 * DatabaseService is the database layer of the Event Management System. Instance of this class stores a private instance dbClient 
 * which is used for connecting to the cloud MongoDB database. Instead of using password, I used x.509 certificate for authentication
 * since password string can be misused and I don't prefer it either. After a week of validity, this certificate will be invalid. 
 * In case of network disconnects, MongoClient will try to reconnect with back-off times (by default it is true and it can be set to 
 * false as well). Since not more than a couple of clients are going to be used, I have kept the maxPoolSize to 5. 
 * 
 * In our case, the structure of DB is almost fixed. So SQL based databases could be a better choice as of now. But if we need to 
 * change the structure of the data at any point in time with minimal effort, NoSQL seems to be a better choice. 
 * 
 * In this case, I was not sure what are the final params of event object could be. Also, I had a plan to add an analytics collection 
 * where we can store the server traffic statistics. I am a fan of having stats data and proper logging. By parsing the log streams, 
 * we can get even more debug information. To keep it simple, I just thought of using MongoDB Atlas cloud service instead of having a 
 * database locally.
 */
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