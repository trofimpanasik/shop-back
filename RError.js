export default class RError {
  code
  message
  constructor (message, code) {
    this.message = message
    this.code = code
  }
}

/* 1 - auth 2 - profile 3 - posts 4 - friends 5 - feed 6 - id middleware
1 - User not found
Auth:
11 - Unauthorized
12 - Wrong password
13 - Email is already taken
14 - Error in hash generating
Profile:
21 - Invalid file type
Posts:
31 - Post not found
Friends:
.
Feed:
51 - Page not found
ID Middleware:
61 - Token not found
62 - Unauthorized
*/