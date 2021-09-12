export const dbConfig = {
    connectionUrl: "mongodb+srv://notepad_db:MongoDB22@notepad-app.bfywk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    dbName: "notepad_db",
    eventCollection: "notes"
}

export const HTTP_CODES = {
    OK:200,
    CREATED:201,
    SERVER_ERROR:500,
    BAD_REQUEST:400,
    DUPLICATE_OBJECT_ERROR:409
}