require('dotenv').config();

const path = require('path');
const fs = require('fs');
const url = require('url');

const ejs = require('ejs');

let getRoutes = [];
let postRoutes = [];
class Router {

    routeRequest;
    routeResponse;
    routeUrl;
    routeMethod;

    routeMime;
    routePath;
    routeExt;

    controller = null;
    controllerMethod = null;

    routeData;

    constructor(request, response) {
        this.routeRequest = request;
        this.routeResponse = response;
        this.routeParsed = url.parse(request.url, true);
        this.routeUrl = this.routeParsed.pathname;
        this.routeQuery = this.routeParsed.query;
        this.routeMethod = request.method;
    }

    run() {
        // console.log(this.routeUrl);
        // console.log(this.routeQuery);
        // init content type
        this.routeMime = 'text/html';

        // If url is '/', path to index
        this.routePath = path.join('.', 'public', this.routeUrl === '/' ? 'index.ejs' : this.routeUrl);

        // Get url extension
        this.routeExt = path.extname(this.routePath);

        // Set content type if requested route is a file
        this.setMimeType('.css', 'text/css', `./public/css${this.routeUrl}`)
        this.setMimeType('.js', 'text/javascript', `./public/js${this.routeUrl}`)
        this.setMimeType('.png', 'image/png', `./public/images${this.routeUrl}`)
        this.setMimeType('.jpeg', 'image/jpeg', `./public/images${this.routeUrl}`)
        this.setMimeType('.jpg', 'image/jpeg', `./public/images${this.routeUrl}`)
        this.setMimeType('.svg', 'image/svg+xml', `./public/images${this.routeUrl}`)
        this.setMimeType('.ico', 'image/x-icon', `./public/images${this.routeUrl}`)

        // If content type is html and no extention, add `.ejs` extention
        if (this.routeMime == 'text/html' && this.routeExt == '') this.routePath += '.ejs';

        //* Check all routes, defined route and requested url
        // if (this.routeMime === 'text/html') {
        //     console.log(`requested url: ${this.routeUrl}`);
        //     console.log('GET routes:');
        //     console.log(getRoutes);
        //     console.log('POST routes:');
        //     console.log(postRoutes);
        // }

        this.resolve(this.routeUrl);
    }

    resolve(url) {
        if (this.routeMethod === 'GET') {
            // Check if url requested has a defined route and read the respective file if content type is text/html
            if (this.routeMime === 'text/html') {

                if (this.routeExists(url, getRoutes)) {
                    this.assignController(url, getRoutes);
                    fs.readFile(this.routePath, 'utf-8', (err, content) => {
                        this.routeResponse.writeHead(200, { 'Content-Type': this.routeMime });
                        // If route calls for a controller execute it's method and pass the data in the view
                        if (this.controllerMethod !== null && this.controller !== null) {
                            const object = new this.controller;
                            object[this.controllerMethod]().then(result => {
                                const html = ejs.render(content, { data: result });
                                this.routeResponse.end(html);
                            });
                        } else {
                            const html = ejs.render(content);
                            this.routeResponse.end(html);
                        }
                    });
                    // if url requested does not have a defined route show a 404 page
                } else {
                    fs.readFile(path.join('.', 'public', '404.ejs'), 'utf-8', (err, content) => {
                        this.routeResponse.writeHead(404, { 'Content-Type': this.routeMime });
                        this.routeResponse.end(content);
                    });
                }
            } else {
                const file = fs.readFileSync(this.routePath);
                this.routeResponse.writeHead(200, { 'Content-Type': this.routeMime });
                this.routeResponse.end(file, 'binary');
            }

        } else if (this.routeMethod === 'POST') {

            if (this.routeExists(url, postRoutes)) {
                this.assignController(url, postRoutes);

                if (this.controllerMethod !== null && this.controller !== null) {

                    let body = '';
                    this.routeRequest.on('data', (chunk) => {
                        body += chunk;
                    });

                    this.routeRequest.on('end', () => {
                        const data = new URLSearchParams(body);
                        this.routeData = this.paramsToObject(data);

                        // If route calls for a controller execute it's method and pass the data in the view
                        const object = new this.controller;
                        object[this.controllerMethod](this.routeData).then(result => {
                            if (result[1]) {
                                fs.readFile(result[1], 'utf-8', (err, content) => {
                                    this.routeResponse.writeHead(200, { 'Content-Type': 'text/html' });
                                    const html = ejs.render(content, { data: result[0] });
                                    this.routeResponse.end(html);
                                });
                            } else {
                                this.routeResponse.writeHead(301, { 'Location': '/' }, { 'Content-Type': 'text/html' });
                                this.routeResponse.end();
                            }
                        });

                        // const object = new this.controller;
                        // object[this.controllerMethod](this.routeData).then(result => {
                        //     if (result.length > 0) {
                        //         this.routeResponse.writeHead(301, { 'Content-Type': 'text/html' });
                        //         const html = ejs.render(content, { data: result });
                        //         this.routeResponse.end(html);
                        //     }
                        //     this.routeResponse.writeHead(301, { 'Location': '/' }, { 'Content-Type': 'text/html' });
                        //     this.routeResponse.end();
                        // });
                    });

                    // console.log(this.controller);
                    // console.log(this.controllerMethod);
                } else {
                    this.routeResponse.writeHead(200, { 'Location': '/' }, { 'Content-Type': 'text/html' });
                    this.routeResponse.end();
                }
            } else {
                if (this.routeMime === 'text/html') {
                    fs.readFile(path.join('.', 'public', '404.ejs'), 'utf-8', (err, content) => {
                        this.routeResponse.writeHead(404, { 'Content-Type': this.routeMime });
                        this.routeResponse.end(content);
                    }
                    );
                } else {
                    fs.readFile(this.routePath, 'utf-8', (err, content) => {
                        this.routeResponse.writeHead(200, { 'Content-Type': this.routeMime });
                        this.routeResponse.end(content);
                    }
                    );
                }
            }
        }
    }

    // Add a get route and optional controller and method
    get(url, controller = null, method = null) {
        // Add the new route if it doesn't exist
        if (!this.routeExists(url, getRoutes)) {
            const route = {
                'url': url,
                'controller': controller,
                'method': method
            }
            getRoutes.push(route);
        }
    }

    // Add a get route and optional controller and method
    post(url, controller = null, method = null) {
        // Add the new route if it doesn't exist
        if (!this.routeExists(url, postRoutes)) {
            const route = {
                'url': url,
                'controller': controller,
                'method': method
            }
            postRoutes.push(route);
        }
    }

    // Set mime content type and file path depending on extention
    setMimeType(extention, mimeType, routePath) {
        if (this.routeExt === extention) {
            this.routeMime = mimeType;
            this.routePath = routePath;
        }
    }

    routeExists(url, routes) {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].url === url) {
                return true
            }
        }
        return false
    }

    assignController(url, routes) {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].url === url) {
                this.controller = routes[i].controller;
                this.controllerMethod = routes[i].method;
            }
        }
    }

    paramsToObject(data) {
        const result = {}
        for (const [key, value] of data) {
            result[key] = value;
        }
        return result;
    }
}

module.exports = Router;