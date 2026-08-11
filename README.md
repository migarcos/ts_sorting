# Overview

JavaScript is the most popular scripting language for the web. But TypeScript is also used in industry because of its ability to type data, which helps avoid many of the common errors caused by JavaScript.

This project aims to use TEST to measure the performance of several sorting methods (BubbleSort, QuickSort, etc.). This process will also allow visualization of the handling of:
- Terminal output → console.log in main().
- Recursion → QuickSort.
- Classes → BubbleSort, QuickSort, ..
- Lists → arrays of numbers.
- Async functions → measurePerformance.
- Exceptions → throw new Error(...) and catch.

[Software Demo Video](https://youtu.be/uchsRBV906Q)

# Development Environment

The most easy way to use TypeScript start with NodeJS installation on your computer, also you need npm as package manager. Verify if you had it on your system:

node -v         
npm -v          

Step 2: Create and Initialize Your Project
Create a new directory for your learning playground, navigate into it, and initialize a new Node.js project.
        mkdir ts-learning
        cd ts-learning
        npm init -y

Step 3: Install TypeScript and Development Tools
Install TypeScript as a development dependency. We will also install tsx, a modern tool that lets you run TypeScript files directly in the terminal without having to manually compile them to JavaScript first.

        npm install -D typescript tsx        
        or           
        npm install typescript --save-dev

Step 4: Configure TypeScript
Generate a tsconfig.json file, which configures how the TypeScript compiler behaves.

        npx tsc --init

A solid, modern learning setup, tsconfig.json file:

        {
                "compilerOptions": {
                        "target": "ESNext",
                        "module": "ESNext",
                        // "moduleResolution": "node",
                        "outDir": "dist",
                        "rootDir": "src",
                        "strict": true,
                        "esModuleInterop": true,
                        "skipLibCheck": true,
                        "types": ["node"]
                }
        }

## Build and Run

        npm run build

        npm start

        npm run lint

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [node dowload](https://nodejs.org/en/download/current)
- [npm download](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Tutorial](https://www.w3schools.com/typescript/index.php)
- [freeCodeCamp Learn TS](https://www.freecodecamp.org/news/want-to-learn-typescript-heres-our-free-22-part-course-21cd9bbb5ef5/)
- [LearningTypeScript.org](https://learningtypescript.org/)
- [Learn TypeScript](https://www.learn-ts.org/)



# Future Work

A list of things that I need to fix, improve, and add in the future.

- Modularization
- Improve reports
- use React and Vite
