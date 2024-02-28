# Overview

The app was built with the following technologies

!!! info

    This page is currently under construction and not yet completed

## Frontend

The frontend of the application was built using [ReactJS](https://reactjs.org/) and heavily incorporated [MaterialUI](https://mui.com/) as a reusable, customizable library on top of React.

### MUI Theme

### Redux

###

## Backend

[NodeJS](https://nodejs.org/en/about/) is the JavaScript runtime environment used to build the application using the [ExpressJS](https://expressjs.com/) framework.

### Middleware

Middleware is used for boh authentication and for uploading images with [multer](https://www.npmjs.com/package/multer). Cookies are used to store either a JWT that contains the user's session expiration and their user ID or a custom token consisting of the user's session expiration and a Google OAuth 2.0 token used to obtain the user's email. The auth middleware is processed in almost every API call and checks to see if the user's session is still valid. If any errors occur, a 401 error is sent back to the client. The frontend handles 401 errors by immediately logging the user out of the app as all app content is intended only for authenticated users.

### Routing

### Role Based Access Control

Role Based Access Control (RBAC) is used to create roles and handle specific permissions. Four roles are used, those being fan, pro, moderator, and admin.

### Emailing

The app uses [Nodemailer](https://nodemailer.com/) to send out both account verification and password reset emails.

## Database

The app uses [PostgreSQL](https://www.postgresql.org/) as its relational database management system. No ORMs were implemented; only raw SQL can be seen in the backend directory.

### CRUD Operations

The four CRUD operations (**C**reate, **R**ead, **U**pdate, **D**elete) are used in dozens of different database queries to achieve the app's core functionalities. The app's data is very complex - consisting of many different yet intertwining types which include the following and their respective dependent data:

-   **Celebrities**
-   **Professionals**
-   **Seasons**
-   **Teams** - celeb, pro, and season
-   **Episodes** - season
-   **Dances** - episode
-   **Judges**
-   **Scores** - judge and score
-   **Dancers** - dance and either celeb, pro, or team
-   **Tours** - season
-   **Tour Cast** - tour and either celeb or pro
-   **Users** - season (_optional_)

Each of these types are separated into their own backend controllers where CRUD operations are used to handle adding, fetching, updating, and deleting objects from the database.

The following code is an example of an `Add` operation used to add a celebrity into the database:

```JavaScript
export const addCeleb = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            birthday,
            height,
            gender,
            twitter,
            instagram,
            tiktok,
            is_junior,
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO celebs (
                first_name,
                last_name,
                birthday,
                height,
                gender,
                twitter,
                instagram,
                tiktok,
                is_junior
            )
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
            `,
            [
                first_name,
                last_name,
                birthday,
                height,
                gender,
                twitter,
                instagram,
                tiktok,
                is_junior,
            ]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }

};
```

### Additional Operations

The app uses these basic CRUD operations to allow for additional app features, such as setting user scores and liking functionality.

The following code is used to like a dance:

```JavaScript
export const likeDance = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }

        const query = await pool.query(
            `
            SELECT EXISTS(
                SELECT 1
                FROM dance_likes
                WHERE dance_id = $1
                    AND user_id = $2
            )
            `,
            [id, req.userId]
        );

        const user = await pool.query(
            `
            SELECT id, username
            FROM users u
            WHERE id = $1
            `,
            [req.userId]
        );

        if (query.rows[0].exists) {
            await pool.query(
                `
                DELETE FROM dance_likes
                WHERE dance_id = $1
                AND user_id = $2
                `,
                [id, req.userId]
            );
            res.status(200).json({ user: user.rows[0], type: 'unlike' });
        } else {
            const liked_at = new Date();

            await pool.query(
                `
                INSERT INTO dance_likes (
                    dance_id,
                    user_id,
                    liked_at
                )
                VALUES($1, $2, $3)
                `,
                [id, req.userId, liked_at]
            );
            res.status(200).json({ user: user.rows[0], type: 'like' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
```

## Future Development

Below are a few plans for future development I hope to achieve:

-   [x] Users can score any dance - not restricted to daily dances
-   [ ] Individual season pages
-   [ ] Individual tour pages
    -   [ ] Incorporation of tour dances
-   [ ] Rankings & polls
-   [ ] Point system
