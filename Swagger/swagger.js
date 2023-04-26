const swagger_auto_gen = require("swagger-autogen")

const outputFile = "./swagger_document.json";
const endpointsFiles = ["./server.js"];

const doc = {
    info:{
        title: "Minha API",
        description: "Documento de do projeto Site Doação",
    },
    host: "localhost: 8000",
    schemes: ["http"],
};

swagger_auto_gen(outputFile, endpointsFiles, doc);
