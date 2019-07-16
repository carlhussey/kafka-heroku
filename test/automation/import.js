const request = require('request')
let xx = 0

/**
 * Post to API Endpoint on defiend interval
 */
setInterval(function () {
    xx++
    doPost()
}, 100)


/**
 * Post to API Endpoint
 */
function doPost() {
    request.post('http://localhost:3000/api/v1/payload', {
        json: getRandomPayload(Math.floor(Math.random() * 4))
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        res.on('error', function (err) {
            if (err.code === "ECONNRESET") {
                console.log("Timeout occurs")
                return
            }
            //handle normal errors
        })
    })
}

/**
 * Pick a random payload
 * @param {*} i 
 */
function getRandomPayload(i) {

    switch (i) {
        case 0:
            return {
                "topic": "enterprise-marketing-ingest",
                "data": {
                    "firstName": "John",
                    "lastName": "Doe",
                    "age": xx,
                    "department": "UTO",
                    "campus": "Tempe",
                    "state": "Arizona"
                }
            }
            break
        case 1:
            return {
                "topic": "edplus-ingest",
                "data": {
                    "fName": "Mike",
                    "lName": "Jones",
                    "age": xx,
                    "dept": "None",
                    "campus": "Phx",
                    "state": "Arizona"
                }
            }
            break
        case 2:
            return {
                "topic": "edplus-ingest",
                "data": {
                    "fName": "Jimmy",
                    "lName": "Dodge",
                    "age": xx,
                    "dept": "Home",
                    "campus": "Phx",
                    "state": "Arizona"
                }
            }
            break
        case 3:
            return {
                "topic": "edplus-ingest",
                "data": {
                    "fName": "Rick",
                    "lName": "Smith",
                    "age": xx,
                    "dept": "Work",
                    "campus": "Phx",
                    "state": "Arizona"
                }
            }
            break
    }

}

