# API Documentation

Base URL: `/api`

## Authentication (`/auth`)

### Register
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**: `{ name, email, password }`
- **Success Response**: `201 Created` - Returns user object and sets HttpOnly cookie.

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**: `{ email, password }`
- **Success Response**: `200 OK` - Returns user object and sets HttpOnly cookie.

### Get Current User
- **URL**: `/auth/me`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**: `200 OK` - Returns currently authenticated user details.

### Logout
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Auth Required**: Yes
- **Success Response**: `200 OK` - Clears the HttpOnly cookie.

---

## Leads (`/leads`)

*All lead endpoints require authentication.*

### Get All Leads
- **URL**: `/leads`
- **Method**: `GET`
- **Query Params**:
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `status` (string: "New", "Contacted", "Qualified", "Lost")
  - `source` (string: "Website", "Instagram", "Referral")
  - `search` (string)
  - `sortBy` (string: "latest", "oldest")
- **Success Response**: `200 OK` - Returns paginated leads array with metadata.
- **RBAC**: Sales users only see leads assigned to them. Admins see all leads.

### Get Lead by ID
- **URL**: `/leads/:id`
- **Method**: `GET`
- **Success Response**: `200 OK` - Returns single lead object.

### Create Lead
- **URL**: `/leads`
- **Method**: `POST`
- **Body**: `{ name, email, status, source }`
- **Success Response**: `201 Created` - Returns created lead object.
- **Note**: `assignedTo` is automatically set to the authenticated user.

### Update Lead
- **URL**: `/leads/:id`
- **Method**: `PUT`
- **Body**: `{ status, source }`
- **Success Response**: `200 OK` - Returns updated lead object.
- **RBAC**: Sales users can only update their own leads.

### Delete Lead
- **URL**: `/leads/:id`
- **Method**: `DELETE`
- **Success Response**: `200 OK`
- **RBAC**: Only Admins can delete leads.

### Export Leads CSV
- **URL**: `/leads/export/csv`
- **Method**: `GET`
- **Query Params**: Same as Get All Leads (excluding pagination).
- **Success Response**: `200 OK` - Returns `text/csv` file download.
