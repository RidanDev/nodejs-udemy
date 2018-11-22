const http = require('http')
const fs = require('fs')

/*
createServer() should be executed for every incoming request
*/
const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    /*
    The incoming data is sent as a stream of data.
    Our stream is basically an ongoiong process
    the request is simply read by node in chunks (multiple parts).
    This is done so that we theoretically can start working on this
    on individual chunks without having to wait for the full request 
    being read.
    Considering a file being uploaded, this will take considerably longer and therefore
    streaming that data could make sense because it could allow you to start
    writing this to your disk, so you don't have to wait for it being fully 
    uploaded before you can do anything with it.

    To organize these incoming chunks, you use a so-call buffer. 
    A buffer is like a bus stop which allows you to hold multiple chunks
    and work with them before they are released once you're done
    */
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        const body = []
        /*
        the functions inside the req.on() are callback and, as such, they will be called sometimes 
        in the future (asynchronous), they won't be called immediately 

        req.on() allows us to listen to certain events,
        and the event I want to listen to here is the data event.
        Now we are defining a function to be executed for every incoming data piece.
        */
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        /*
        The end listener will be fired once it's done parsing the incoming requests data
        or the incoming requests in general

        The "return" allows to execute the function as soon as it gets the data, without continue
        the code execution.
        */
        return req.on('end', () => {
            //I'm able to convert it to a string because I know the user's input is a a text
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            const message = parsedBody.split('=')[1]

            /*
            writeFileSync will block all the code execution untill it has finished writing
            the file. This is not what we want even if the file is really small, because
            we don't want our server to be blocked until this operation is done (just think about
            a very big file).
            So we're gonna use the err callback that allows us to execute only a part of code
            after the file got written
            */
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>')
    res.end()
})
server.listen(3000)