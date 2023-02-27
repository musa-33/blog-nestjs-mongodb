## Table of Contents

- [Dev environment setup](#dev-environment-setup)
- [Dev starting backend](#dev-environment-starting--backend)
- [Useful commands](#useful-commands)
- [Code standards](#code-standards)

## Dev environment setup

#### 1. Clone Github repo (kryptonite)

https://github.com/surveyanalyticscorp/kryptonite

```sh
git clone git@github.com:surveyanalyticscorp/kryptonite.git
```

#### 2. Install `nvm` and `node 17.6.0`

The `nvm` allows easily manage multiple node versions.
Follow the instructions given here to install `nvm`: https://github.com/nvm-sh/nvm#installing-and-updating.

Install `node` version `17.6.0` using following command:

```sh
nvm install 17.6.0
```

#### 3. Install node packages for react app and backend:

The following commands assumes the repo is installed at path `~/kryptonite`.  
Before installing ensure that the `node` version is `17.6.0`. To verify node version run:

```sh
node -v
```

1. Install packages for React(frontend) app.

```bash
cd ~/kryptonite/frontend/xa-app
npm i
```

2. Install packages for Nest(backend) app.

```bash
cd ~/kryptonite/backend
npm i
```

### 4. Mysql Database Setup for XA3

A new database xa3 is created for the App. The database is created with the following commands:

1. Create xa3 database

```bash
cd ~/amber
make mysql
CREATE DATABASE xa3
```

2. Insert an entry in the oauth_application table for OAuth with QuestionPro Dev App.

```bash
cd ~/amber
make mysql
mysql> use qp
mysql> INSERT INTO oauth_application VALUES (1, 1355, 'XA Dev', 'http://localhost:3400/api/auth/oauth', 'http://localhost:3400/api/auth/callback', 'gwkrftdexxraykydcdpk', '54aaf7c5c1253d65034410a6388e8ecc31321eef', '2022-03-12 10:16:21',1);
```

#### 5. Run Database Migrations

For the initial setup or when there are database upgrades run the following command:

```bash
cd ~/kryptonite/backend && npm run typeorm:cli:migration-run
```

#### 7. Test case Configurations

1. Install Docker and docker compose
   Follow this link to install docker. https://docs.docker.com/engine/install/
   Follow this link to install docker-compose. https://docs.docker.com/compose/install/

## Dev environment starting React app and backend

### Starting backend server

The backend server location is `~/kryptonite/backend`.  
Make sure the node version is `17.6.0` and you have installed all packages using run `npm i` command.

1. Start Amber App in docker: The Amber app is needed to fetch the data of folders, cx feedbacks, surveys, questions and answers for a User.

```bash
cd ~/amber
make start
```

2. Run typeORM migrations to setup database and tables.

```bash
cd ~/kryptonite/backend && npm run typeorm:cli:migration-run
```

3. Run the backend app

```
cd ~/kryptonite/backend && npm run start:dev
```

4. Run the front end react app

```
cd ~/kryptonite/frontend/xa-app && npm start
```

## Useful Commands

### Database commands

1. Generate typeORM migrations to setup database and tables.

```bash
cd ~/kryptonite/backend && npm run typeorm:cli:migration-generate
```

2. Run typeORM migrations to setup database and tables.

```bash
cd ~/kryptonite/backend && npm run typeorm:cli:migration-run
```

3. Revert recent typeORM migrations

```bash
cd ~/kryptonite/backend && npm run typeorm:cli:migration-revert
```

### Test case commands

1. Start docker

```bash
cd ~/kryptonite/backend && npm run docker:start:test
```

2. Run e2e test cases

```bash
cd ~/kryptonite/backend && npm run docker:test:e2e
```

3. Run unit test cases

```bash
cd ~/kryptonite/backend && npm run docker:test
```

## Code standards

### Backend

#### Folder structure :

The files should be placed in the right modules as per the package structure. The following structure should followed in every module along with the file name and class naming conventions in each.
![Folder structure in a Module](./docs/folder-structure.png)

1.  application : This layer consists of the classes that deal with outside world.

    1. controllers - A controller's purpose is to receive specific requests for the application. The routing mechanism controls which controller receives which requests. For more info refer: https://docs.nestjs.com/controllers
       file name: survey.controller.ts, class name: SurveyController

    2. dtos - DTOs (Data Transfer Objects) are simple objects that should not contain any business logic but may contain serialization and deserialization mechanisms for transferring data
       file name: survey.dto.ts, class name: SurveyDto

    3. decorators - A decorator is an expression that returns a function. It can take a target, name and property descriptor as arguments. We apply a decorator with an @ character and place it at the top of what we are trying to decorate. For more info refer:https://docs.nestjs.com/custom-decorators
       file name: user-context.decorator.ts, constant name: GetUserContext

2.  domain: The implementations of various services goes in this layer.

    1. services
       file name: survey.service.ts, class name: SurveyService

    2. entities
       file name: survey.entity.ts, class name: Survey

    3. enums
       file name: question-type.enum.ts, class name: QuestionType

    4. interfaces
       file name: app-config.interface.ts, class name: AppConfig

3.  infrastructure: The infrastructure related implementations goes in this layer.

4.  repository : The queries formulation and rendering the data using TypeOrm goes in this layer.
    file name: survey.repository.ts, class name: SurveyRepository which always extends BaseRepository

##### Test cases folder structure:

1.  E2E Test cases:
    The e2e test cases should be placed with the same folder structure under ~/kryptonite/backend/test folder. The extension should be .e2e-spec.ts.
    ![e2e test case](./docs/e2e-test-case.png)
    eg: dashboard.e2e-spec.ts

2.  Unit Test cases:
    The unit test cases should be placed in the same folder as that of the file which is tested. The extension should be .spec.ts
    ![unit test case](./docs/unit-test-case.png)
    eg: base.repository.spec.ts

#### Naming Conventions:

1.  The file names should be in lower case with hyphen separated and the extension specifying the type of the class.
    eg: survey.service.ts, numeric-question-widget.service.ts, survey.entity.ts

2.  The class names should be in Pascal case. eg: NumericQuestionWidgetService

3.  The variable or function names should be in camel case. eg: getAllDashboards()

4.  The enum values should ib upper case. eg: BAR, PIE
    Note: To check if the case is strictly followed by your code, you can run:

    ```bash
     cd ~/kryptonite/backend && npm run lint
    ```

5.  The method should be named based on its purpose.
    eg: In DashboardService class, findByIdOrThrow(userId: number, id: number) method gets the Dashboard entity or throw an Exception if not found. So the method which throw or can throw exception should be having name likewise.

#### DB Queries:

1. DDL queries should in written in the migration files.

2. A new migration file can be generated using the following command:
   cd ~/kryptonite/backend && npm run typeorm:cli:migration-generate
   And add the queries as. Refer : https://orkhan.gitbook.io/typeorm/docs/migrations

##### Standards to follow while writing a query:

1. All the MySQL keywords should be in capital letters.

2. Use UNSIGNED keyword whenever using Integer related data types.

3. Add index according to the retrieval of the data in the table.

#### Other Code Standards to be followed:

1. The getAll() functions of any Entity should always be called with a pager. eg : getAllDashboards() in DashboardService class.

#### Test Case Code Standards:

1. The test description should be the Class name.

2. The specific test description should always start with : should return.... when / if ....
   eg: should throw Validation Exception when dashboard name and type are not passed.

3. Avoid use of mocking in e2e test cases.

4. Group tests belonging to the same method under a describe function. eg: dashboard.e2e-spec.ts
