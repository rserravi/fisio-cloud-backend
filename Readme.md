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
| 2     | '/v1/user/reset-password         | POST  | DONE     | No         | Verify email and email pin to reset the password |
| 3     | '/v1/user/reset-password         | PATCH | DONE     | No         | Replace with new password.                      |
| 4     | '/v1/user/{id}                   | GET   | DONE     | Yes        | Get users info                                   |
 
### Tokens API resources
 
All the Tokens API router follows '/v1/tokens'
 
| #     | Routers                          | Verbs | Progress | Is Private | Description                                      |
| ----- | -------------------------------- | ----- | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/tokens'                     | GET   | DONE     |no          | Get a fresh access JWT              |

### Customer API resources
 
| #     | Routers                          | Verbs | Progress | Is Private | Description                                       |
| ----- | -------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/customer'                 | GET    | TODO     |Yes         | Get All customers         |
| 2     | '/v1/customer/{custoId}'       | GET    | TODO     |Yes         | Get a custoId customer  
| 3     | '/v1/customer'                 | POST   | DONE     |Yes         | Create a new customer with no appo, comm, hist 
| 4     | '/v1/custome/{custoId}'        | DELETE | TODO     |Yes         | Delete a customer custoId
| 5     | '/v1/custome/{custoId}'        | PUT    | TODO     |Yes         | Update customer data 