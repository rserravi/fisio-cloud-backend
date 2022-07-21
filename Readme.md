# FISIO CLOUD System API
 
This api is a part of FisioCloud system with MERN stack from scratch
 
## How to use
 
- run 'git clone ...'
- run 'npm start'
 
Note: Make sure you have nodemon is installed in your system otherwise you can install as a dev dependencies in the project

To see this file formated in Visual Studio Code, press (Ctrl+Shift+V)
 
## API resources
 
### User API Resources
 
All the user API router follows '/v1/user/'
 
| #     | Routers                          | Verbs | Progress | Is Private | Description                                      |
| ----- | -------------------------------- | ----- | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/user/login'                 | POST  | DONE     | No         | Verify user authentication and return JWT      |
| 2     | '/v1/user/reset-password         | POST  | TODO     | No         | Verify email and email pin to reset the password |
| 3     | '/v1/user/reset-password         | PATCH | TODO     | No         | Replace with new password.                      |
| 4     | '/v1/user/{id}                   | GET   | TODO     | Yes        | Get users info                                   |
 