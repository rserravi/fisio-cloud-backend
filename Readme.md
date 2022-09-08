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
| 5     | '/v1/customer/{_custoId}'        | PATCH    | DONE     |Yes         | Update customer data 
| 6     | '/v1/customer/list            | GET    | DONE     |Yes         | Get customer list for search nbar    |

### History API resources
All the customer API router follows '/v1/lang/'

 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/history/'                      | POST   | DONE     |Yes         | Create an history for customer                              |
| 2     | '/v1/history/'                      | GET    | DONE     |Yes         | Get History by custoId and histoId                   |
| 3     | '/v1/history/'                      | PUT    | DONE     |Yes         | Update History (form in body)               |
| 4     | '/v1/history/'                      | DELETE | DONE     |Yes         | Delete History by histoId                   |
| 5     | '/v1/history/deposits'              | GET    | DONE     |Yes         | Get deposits from histories of a custoId          |
| 6     | '/v1/history/cabins'                | GET    | DONE     |Yes         | Get cabins from a cabin id                        |

### Deposits API resources
All the customer API router follows '/v1/deposits/'

 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/deposits/?from:{fromdate}&to:{todate}&userId:{userId}'                      | GET   | DONE     |Yes         | Gives back resutl(deposits, income,debts) by query (from, end, userId)            |
   

### Reports API resources
All the customer API router follows '/v1/reports/'

 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/reports/'                      | GET   | DONE     |Yes         | Gives back a bunch of reports in same JSON                  |
| 2     | '/v1/reports/depositsforchart'      | GET    | DONE     |Yes         | Get deposits to show in chart       

### Appointments API resources
All the customer API router follows '/v1/appo/'

 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/appo/'                      | POST   | DONE     |Yes         | Create an appointment for user                              |
| 2     | '/v1/appo/'                      | GET    | DONE     |Yes         | Get Appointment by custoId and appoId                   |
| 3     | '/v1/appo/'                      | PUT    | DONE     |Yes         | Update Appointment by custoId,appoId or _id                |
| 4     | '/v1/appo/date'                  | PUT    | DONE     |Yes         | Update Appointment Date by appoId                 |
| 5     | '/v1/appo/paid'                  | PUT    | DONE     |Yes         | Update Appointment Paid  by appoId                |
| 6     | '/v1/appo/'                      | DELETE | DONE     |Yes         | Delete Appointment by custoId and histoId                   |
| 7     | '/v1/appo/close/?_id={_id}'      | DELETE | DONE     |Yes         | Move from appointments to history                  |


### Communication API resources
All the customer API router follows '/v1/comm/'

 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/comm/'                      | POST   | DONE     |Yes         | C - Create a communication for customer                              |
| 2     | '/v1/comm/'                      | GET    | DONE     |Yes         | R - Get communication by custoId and appoId                   |
| 3     | '/v1/comm/'                      | PUT    | TODO     |Yes         | U - Update communication by custoId,appoId or _id                |
| 4     | '/v1/comm/'                      | DELETE | TODO     |Yes         | D - Delete communication by custoId and histoId    
| 5     | '/v1/comm/thread?threadNumber={x}?commId={x}| GET    | DONE     |Yes         | Get Thread by threadNumber or commId
 

### Services API resources
All the services API router follows '/v1/services/'

 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/services/'                      | POST   | DONE     |Yes         | C - Create a service                                     |
| 2     | '/v1/services/'                      | GET    | DONE     |Yes         | R - Get services list . If _id is provided, get just one                 |
| 3     | '/v1/services/'                      | PUT    | DONE     |Yes         | U - Update service by  _id                |
| 4     | '/v1/services/'                      | DELETE | DONE     |Yes         | D - Delete service by _id                   |

### AlertsSetup API resources
All the AlertsSetup API router follows '/v1/setupalerts/'

 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/setupalerts/'                      | POST   | DONE     |Yes         | C - Create an alert setup by customerId                                     |
| 2     | '/v1/setupalerts/'                      | GET    | DONE     |Yes         | R - Get AlertsSetup. If userId is provided, get just one                 |
| 3     | '/v1/setupalerts/'                      | PUT    | DONE     |Yes         | U - Update AlertsSetup by  userId                |
| 4     | '/v1/setupalerts/'                      | DELETE | DONE     |Yes         | D - Delete AlertsSetup by userId                   |

### Calendar API resources
All the Calendar API router follows '/v1/calendar/'

MODE: "pastdate","nextdate","alldate,"notanswered","pastcomm","nextcomm","allcomm","seeallNoBirth","seeall"
 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/calendar/?userId&mode'                      | GET   | DONE     |No         | R - Get calendar items by "mode"                                   |



### Cabins API resources
All the cabins API router follows '/v1/cabins/'

 
| #     | Routers                             | Verbs | Progress | Is Private | Description                                       |
| ----- | ----------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/cabins/'                      | POST   | DONE     |Yes         | C - Create a cabin                                     |
| 2     | '/v1/cabins/'                      | GET    | DONE     |Yes         | R - Get cabins list . If _id is provided, get just one                 |
| 3     | '/v1/cabins/'                      | PUT    | DONE     |Yes         | U - Update cabin byi  _id                |
| 4     | '/v1/cabins/'                      | DELETE | DONE     |Yes         | D - Delete cabin by _id                   |



### Setup Language API resources
All the customer API router follows '/v1/lang/'

 
| #     | Routers                          | Verbs | Progress | Is Private | Description                                       |
| ----- | -------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/lang'                       | GET    | DONE     |Yes         | Get All languajes         |
| 2     | '/v1/lang'                       | POST    | DONE     |Yes         | Add Languaje to DataBase         |

### Consent API resources
All the consent API router follows '/v1/consent/'

 
| #     | Routers                          | Verbs | Progress | Is Private | Description                                       |
| ----- | -------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/consent/'                   | POST   | DONE     |Yes         | C - Create a consent by _customerId                   |                |
| 3     | '/v1/consent/?_customerId={_customerId}'| GET    | DONE     |Yes         | R - Get consent blueprint by _customerId        |
| 4     | '/v1/consent/?_customerId={_customerId}'| PUT    | TODO     |Yes         | U - Update consent by _id                |
| 5     | '/v1/consent/?_customerId={_customerId}' | DELETE | TODO     |Yes         | D - Delete consent by _id                   |

### Blueprint API resources
All the blueprint API router follows '/v1/blueprint/'

 
| #     | Routers                          | Verbs | Progress | Is Private | Description                                       |
| ----- | -------------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1     | '/v1/blueprint/'                    | POST   | TODO     |Yes         | C - Create a blueprint                                     |
| 2     | '/v1/blueprint/'                    | GET    | DONE     |Yes         | R - Get blueprint list .                 |
| 3     | '/v1/blueprint/?filename={_filename}' | GET    | DONE     |Yes         | R - Get consent blueprint by name                |
| 4     | '/v1/blueprint/?filename={_filename}' | PATCH  | DONE     |Yes         | U - Update blueprint by _filename                |
| 5     | '/v1/blueprint/'                    | DELETE | TODO     |Yes         | D - Delete consent by _id                   |