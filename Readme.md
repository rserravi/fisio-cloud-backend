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
| 4     | '/v1/user/{id}                   | GET   | DONE     | Yes        | Get users info |
| 5     | '/v1/user/{id}                   | PATCH | DONE     | Yes        | Update a user by id
| 6     | '/v1/user/                     | POST  | DONE     | Yes        | Create new user
| 7     | '/v1/user/list                    | GET  | DONE     | Yes        | Get all users list
 
### Tokens API resources
 
All the Tokens API router follows '/v1/tokens'
 
| #     | Routers                          | Verbs | Progress | Is Private | Description                                      |
| ----- | -------------------------------- | ----- | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/tokens'                     | GET   | DONE     |no          | Get a fresh access JWT              |

### Customer API resources
All the customer API router follows '/v1/customer/'

 
| #     | Routers                          | Verbs | Progress | Is Private | Description                                       |
| ----- | -------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/customer'                 | GET    | DONE     |Yes         | Get All customers         |
| 2     | '/v1/customer/{_custoId}'       | GET    | DONE     |Yes         | Get a custoId customer  
| 3     | '/v1/customer'                 | POST   | DONE     |Yes         | Create a new customer with no appo, comm, hist 
| 4     | '/v1/customer/{_custoId}'        | DELETE | DONE     |Yes         | Delete a customer custoId
| 5     | '/v1/customer/{_custoId}'        | PUT    | TODO     |Yes         | Update customer data 
| 6     | '/v1/customer/{_custoId}/phone   | GET    | TODO     |Yes         | Get customer phone from ID
| 7     | '/v1/customer/{_custoId}/whastsapp' | GET    | TODO     |Yes         | Get customer whatsapp from ID
| 8     | '/v1/customer/{_custoId}/mail' | GET    | TODO     |Yes         | Get customer mail from ID
| 9     | '/v1/customer/{_custoId}/name' | GET    | TODO     |Yes         | Get customer name from ID

### History API resources
All the customer API router follows '/v1/lang/'

 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/history/'                      | POST   | DONE     |Yes         | Create an history for user                              |
| 2     | '/v1/history/'                      | GET    | DONE     |Yes         | Get History by custoId and histoId                   |
| 3     | '/v1/history/'                      | PUT    | DONE     |Yes         | Update History by custoId,histoId or _id                |
| 4     | '/v1/history/'                      | DELETE | DONE     |Yes         | Delete History by custoId and histoId                   |
| 5     | '/v1/history/deposits'              | GET    | DONE     |Yes         | Get deposits from histories of a custoId          |

### Services API resources
All the services API router follows '/v1/services/'

 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/service/'                      | POST   | DONE     |Yes         | C - Create a service                                     |
| 2     | '/v1/service/'                      | GET    | DONE     |Yes         | R - Get services list . If _id is provided, get just one                 |
| 3     | '/v1/service/'                      | PUT    | DONE     |Yes         | U - Update service by  _id                |
| 4     | '/v1/service/'                      | DELETE | DONE     |Yes         | D - Delete service by _id                   |


### Setup Language API resources
All the customer API router follows '/v1/lang/'

 
| #     | Routers                          | Verbs | Progress | Is Private | Description                                       |
| ----- | -------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/lang'                       | GET    | DONE     |Yes         | Get All languajes         |
| 2     | '/v1/lang'                       | POST    | DONE     |Yes         | Add Languaje to DataBase         |

