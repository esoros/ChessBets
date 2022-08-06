import { readFile } from "node:fs/promises"
import {createServer} from "node:http"
import path from "node:path"
let port = 8080

let getContentType = (requestPath: string) => {
    switch(path.extname(requestPath)) {
        case ".js": return "text/javascript"
        case ".html": return "text/html"
        case ".css": return "text/css"
        case ".svg": return "image/svg+xml"
        default: throw new Error("mimetype not found")
    }
} 

let server = createServer(async (req, res) => {
    if(!req.url) {
        res.statusCode = 500
        res.write("<p>url not found</p>")
        res.end()        
        return 
    }

    if(req.url.startsWith("/api")) { //handle the api...
        res.statusCode = 401
        res.write("<p>unauthenticated</p>") 
        res.end()  
        return
    }

    if(req.url.includes('.')) {
        let file = await readFile(path.join("./dapp/dist/", req.url))
        res.setHeader("Content-Type", getContentType(req.url))
        res.write(file)
        res.end()
        return
    }
    
    let file = await readFile("./dapp/dist/index.html")
    res.statusCode = 200
    res.setHeader("Content-Type", "index.html")
    res.write(file)
    res.end()   
})
server.listen(port, () => {
    console.log("chessbets server listening on port %s", port)
})