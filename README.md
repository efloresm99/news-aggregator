# News Aggregator RESTful API
A RESTful API that allows you to search news from the New York Times and The Guardian APIs.

## Get started
This app is a RESTful API that. It was developed using NestJs Framework and both diaries APIs as Data sources.


## Documentation

This API has a documentation where you can find the different parameters that tha API accepts, and also its format and structure. Also, you can see the different responses that you can get in any case.

Check the documentation [here](https://documenter.getpostman.com/view/19615387/UVkvHsNx).

Additional note regarding documentation:
* **source** parameter accepts three different values:
    - **all:** (default) the API will search in both APIs
    - **thguard:** the API will search in The Guardian API only
    - **nytimes:** th API will search in The New York Times API only

This app runs in Node and developed using version 16.13.2. NPM version 8.4.0 was used for package management in the development process. Nest version 8.2.1 on top of express was used as Framework.
This app has the following package dependencies:
- **@nestjs/axios:** ^0.0.6
- **@nestjs/common:** ^8.0.0
- **@nestjs/config:** ^1.2.0
- **@nestjs/core:** ^8.0.0
- **@nestjs/platform-express:** ^8.0.0
- **axios:** ^0.26.0
- **class-transformer:** ^0.5.1
- **class-validator:** ^0.13.2
- **reflect-metadata:** ^0.1.13
- **rimraf:** ^3.0.2
- **rxjs:** ^7.5.4

The application has also some dev dependencies that should be taken into account:

- **@nestjs/cli:** ^8.0.0
- **@nestjs/schematics:** ^8.0.0
- **@nestjs/testing:** ^8.0.0
- **@types/express:** ^4.17.13
- **@types/jest:** 27.4.1
- **@types/node:** ^16.0.0
- **@types/supertest:** ^2.0.11
- **@typescript-eslint/eslint-plugin:** ^5.0.0
- **@typescript-eslint/parser:** ^5.0.0
- **eslint:** ^8.0.1
- **eslint-config-prettier:** ^8.3.0
- **eslint-plugin-prettier:** ^4.0.0
- **jest:** ^27.2.5
- **prettier:** ^2.3.2
- **source-map-support:** ^0.5.20
- **supertest:** ^6.1.3
- **ts-jest:** ^27.0.3
- **ts-loader:** ^9.2.3
- **ts-node:** ^10.0.0
- **tsconfig-paths:** ^3.10.1
- **typescript:** ^4.3.5

## How to use 

Hit the main endpoint: GET /api/news/search/ with the parameters given in the [documentation](https://documenter.getpostman.com/view/19615387/UVkvHsNx).


## 
 