# Smart Coach API
> Discover Smart Coach API! Smart Coach, the ultimate platform for amateur football coaches. Streamline scheduling, communication, and team management in one user-friendly hub. Save time, reduce frustration, and focus on your team's success with powerful features, customizable settings, and data-driven insights. Elevate your coaching experience today!

## Features
1. **Players Management:** API Endpoints for Players CRUD

2. **Managing Teams/Rosters:**  API Endpoints for Teams/Rosters CRUD

3. **Mangaing Events:**  API Endpoints for Events CRUD

## Requirements

To run the Smart Coach API locally, the following requirements must be met:

- Operating System: Any modern operating system (`Windows`, `macOS`, `Linux`)
- Web Browser: Latest version of `Chrome`, `Firefox`, `Safari`, or `Edge`
- Server: `Node.js` runtime environment

## Installation

To install and set up Smart Coach locally, follow these steps:

### Clone
Clone the Smart Coach repository from [SmartCoach](https://github.com/RaoAkif/smart-coach-api) with the command:
```
git clone git@github.com:RaoAkif/smart-coach-api.git
```
### Setup Environment
Install `Node.js` from [Node.js website](https://nodejs.org/en/download) and configure it on your system.

### Database Configuration
Install and set up a `MySQL` or `PostgreSQL` database OR get a connection string of some cloud database like [Planet Scale](https://planetscale.com/)

### Install Packages
Navigate to the project directory and run the following command to install the required dependencies
```
npm install
```
### ENV File
Configure the database connection and `Access Token` and `Refresh Token` by updating the `.env` file, placed in the project root directory.
`.env` file should contain:
  - Database: Put the `Database_URL` Connection String of SQL database.
  - `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` in `.env` file.
   For example:

```
DATABASE_URL='mysql://<username>:<password>@aws.connect.psdb.cloud/smart-coach-api?sslaccept=strict'
ACCESS_TOKEN_SECRET='RANDOM_STRING'
REFRESH_TOKEN_SECRET='RANDOM_STRING'
```

### Database Migration
Run the database migration script to set up the required tables and schema. In case of Planet Scale, run
```
npx prisma db push
```

### Run Server
Start the application server using the command
```
npm run dev
```

### API URL
Access the Smart Coach API at
```
http://localhost:8000/api/
```

## Usage

Once the `Smart Coach API` is up and running, users can access it using `Postman`. Use the desktop version of [Postman](https://www.postman.com/downloads/).

API access and usage details are provided in the `API documentation` section.

## API Documentation

The detailed API documentation for `Smart Coach` can be found at [API Documentation URL](https://smart-coach-api.vercel.app/api-docs). It provides information about available endpoints, `request/response` formats, authentication mechanisms, and examples of `API usage`. The documentation [API Documentation](https://smart-coach-api.vercel.app/api-docs) helps developers integrate Smart Coach with other systems or build custom applications on top of it.

## Code Contributors

👤 **Rao Akif**
- GitHub: [@raoakif](https://github.com/RaoAkif)
- Twitter: [@raoakif](https://twitter.com/RaoAkif)
- LinkedIn: [Rao Akif](https://linkedin.com/in/RaoAkif)

## Acknowledgments
  👤 Project Manager:   [Adrian Dubler](https://www.linkedin.com/in/adrian-dubler).
  👤 Project Designer:  [Atakan Bacaksiz](https://www.linkedin.com/in/atakanbacaksiz). Original design of [Smart Coach](https://www.figma.com/file/CTngvtmn5qXkjlEpXlDfAT/smartcoach-ui?type=design&mode=design&t=zihPgAIp5oaHmQkm-0)
  - Thanks to my peers who are always there to offer support.
  - Contributions, issues, and feature requests are welcome!
  - Feel free to check the [issues page](../../issues/).
 
## Contributing

We welcome contributions from other developers to enhance Smart Coach. To contribute to the project, please follow these guidelines:

1. Fork the Smart Coach repository and create a new branch for your feature or bug fix.
2. Make your changes, ensuring they follow the project's coding conventions and best practices.
3. Write unit tests to cover your code changes and ensure existing tests pass.
4. Submit a pull request with a clear description of your changes and any relevant information.

## Show your support

Give a ⭐️ if you like this project!

## License

Smart Coach is distributed under the [MIT License](./MIT.md). You are free to use, modify, and distribute the project under the terms of this license.
