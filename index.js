const fetch = require("node-fetch");
const fs = require("fs");
const FormData = require("form-data")
const params = new FormData();
const { uploadURL, uploadToken, collectionID, collectionToken } = require("./config.json");

function uploadFile(imagePath, token, noembed = "noembed", collectionID, private = true, collectionToken) {
    if (!imagePath) return console.error(Error("Image isn't defined"));
    if (!token) return console.error(Error("Token isn't defined"));

    params.append("image", fs.createReadStream(imagePath))
    params.append("token", token)
    if (noembed === "noembed") params.append("noembed", "")
    if (collectionID) {
        params.append("collection", collectionID)
        if (private) {
            if (!collectionToken) return console.error(Error("Collection Token is required for private collections"));
            params.append("collection_token", collectionToken)
        }
    }

    fetch(`${uploadURL}/upload`, {
        method: "post",
        body: params
    })
        .then(res => res.json())
        .then(json => console.log(json))
}

function createCollection(title = "", private = "true", unlisted = "true", desc) {
    params.append("action", "create_collection")
    params.append("title", title)
    params.append("private", private)
    params.append("unlisted", unlisted)
    if (desc) params.append("desc", desc)

    fetch(`${uploadURL}/api/`, {
        method: "post",
        body: params
    })
    .then(async res => console.log(await res.json()))
    //.then(res => res.json())
    //.then(json => console.log(json))
}

//createCollection()
//uploadFile("./image.jpg", uploadToken, "noembed", collectionID, true, collectionToken)