"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(req, res, next) {
    //Receive token
    var authToken = req.headers.authorization;
    //Validate token was correct
    if (!authToken) {
        return res.status(401).end();
    }
    var _a = authToken.split(" "), token = _a[1];
    try {
        //Validate if token was true
        var sub = jsonwebtoken_1.verify(token, "170e46bf5e0cafab00cac3a650910837").sub;
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end;
    }
    // Get user info
}
exports.ensureAuthenticated = ensureAuthenticated;
