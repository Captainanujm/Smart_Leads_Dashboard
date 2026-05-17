# Smart Leads Dashboard

Hey! This is my submission for the Lead Management Dashboard assignment. Built it using the MERN stack with TypeScript (no `any` types used, as requested).

## Features
- **Auth**: JWT stored in HttpOnly cookies, bcrypt for passwords.
- **Leads**: Full CRUD (Create, Read, Update, Delete).
- **Filters**: You can filter by Status or Source, and I added a debounced search so it doesn't spam the API.
- **Pagination**: Backend handles it, 10 items per page.
- **Export**: Button to export whatever is currently filtered into a CSV.
- **RBAC**: Sales role can only manage their own leads, Admin can see and delete everything.
- **Theme**: Added a quick dark mode toggle because bright screens hurt my eyes.

## Tech
- React + Vite + TS + Tailwind
- Node + Express + TS + MongoDB

## How to run it

### The Easy Way (Docker)
I added a docker-compose file so you don't have to set up everything manually. Just make sure docker is running and do:
```
docker-compose up --build
```
Frontend runs on `http://localhost` and API on `http://localhost/api`.

### The Manual Way
If docker is acting up:
1. Put your mongo uri and jwt secret in `server/.env`
2. Run backend: `cd server && npm i && npm run dev`
3. Run frontend: `cd client && npm i && npm run dev`

*Note: Default users are created as 'sales'. If you want to test Admin features, you'll need to manually change the role to 'admin' in your MongoDB compass/atlas for one user.*

---

## API Documentation

Base url is `/api`. All lead routes need you to be logged in (requires cookie).

**Auth**
- `POST /auth/register` - pass {name, email, password}
- `POST /auth/login` - pass {email, password}
- `GET /auth/me` - gets current logged in user
- `POST /auth/logout` - clears cookie

**Leads**
- `GET /leads` - query params: `page`, `status`, `source`, `search`, `sortBy` (latest/oldest)
- `POST /leads` - body: {name, email, status, source}
- `PUT /leads/:id` - update a lead
- `DELETE /leads/:id` - admin only
- `GET /leads/export/csv` - downloads the csv
