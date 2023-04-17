const swagger_auto_gen = require("swagger-autogen")

const outputFile = "./swagger_document.json";
const endpointsFiles = ["./users.js"];

const doc = {
    info:{
        title: "Minha API",
        description: "CRUD de usuário Uninassau",
    },
    host: "localhost: 8000",
    schemes: ["http"],
};

swagger_auto_gen(outputFile, endpointsFiles, doc);