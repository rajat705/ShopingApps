
# Backend

  Create project
  
  ```sh
    npm i -g @nestjs/cli
    nest new backend
    cd backend
  
  ```

1. Install Backend Dependencies:

  ```sh
    npm install @prisma/client
    npm install prisma --save-dev
  ```

2. Initialize Prisma:

  ```sh
    npx prisma init
  ```

3. Generate Prisma Client:

  ```sh
    npx prisma generate
  ```
4. Run Database Migration:

    ```sh
    npx prisma migrate dev --name init
    ```
5. Seed Database:
      ```sh
    npx prisma db seed
    ```
 ### Running the Project
1. Start Backend:
  ```sh
    npm run start:dev
   ```
 2. Open your browser and navigate to:
    ```sh
    http://localhost:3000
    ```
 Run Backend Tests
 ```sh
    npm run test
   ```


# Frontend


1. Clone the repository:

    ```sh
    git clone https://github.com/rajat705/ShopingApps.git
    ```

2. Navigate to the project directory:

    ```sh
    cd ShopingApps / frontend
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```
    npm install

     ```sh
    npm install -D tailwindcss@3.4.17 postcss autoprefixer
    ```

      ```sh
    npx tailwindcss init -p
    ```
  Install libraries:

  ```sh
    npm install react-router-dom zustand axios
   ```


### Running the Project

1. Start the development server:

    ```sh
    npm run dev
    ```

2. Open your browser and navigate to:
    ```sh
    http://localhost:5173
    ```
