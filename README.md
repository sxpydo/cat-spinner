[![Netlify Status](https://api.netlify.com/api/v1/badges/08f66698-47ad-4ee8-ba06-475de9647c87/deploy-status)](https://app.netlify.com/projects/tuxie-spinner/deploys)
# Cat Spinner Component

This repository contains a reusable tuxedo-cat-themed loading spinner built with React and TypeScript. It provides a friendly and engaging user experience during loading or busy application states.

## Development Setup
To get the development environment up and running, follow these steps:

### Prerequisites
* **Node.js:** Version 18+ (includes npm)
* **Git:** Used for version control
* **IDE:** VS Code or a similar code editor is recommended

### Steps
1. **Clone the Repository:**

 ```bash
    git clone https://github.com/sxpydo/cat-spinner.git
    cd client
 ```

2. **Install Dependencies:**

```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
```

3. **Run the Application:**


```bash
   npm run dev
   # or
   pnpm run dev
   # or
   yarn dev
```

The application will typically be available at http://localhost:5173.

4. **Testing:**
This project uses Vitest for unit testing.

To run all unit tests once:

```bash
   npm run test
```

For continuous testing in watch mode (recommended for development):

```bash
   npm run test:watch
```

5. **Component Usage**
The Spinner component can be found at `./src/component/CatSpinner.tsx`.

**Import**
```ts
   import { Spinner } from './component/CatSpinner';
```

**Props**
* `isLoading (boolean, default: true):` Hides the spinner when false.
* `captionText (string[], default: ['Loading...']):` Array of caption strings to cycle through.
* `captionInterval (number, default: 1500):` Time in milliseconds between caption changes.
* `size ('small' | 'medium' | 'large'):` Controls the size of the spinner.
* `color (string, default: "#333"):` CSS color value for the cat's fill.

Example:
```tsx
function Dashboard() {
    const messages = [
        "Petting the code...",
        "Compiling purrfectly...",
        "Chasing the mouse..."
    ];
    const [dataReady, setDataReady] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setDataReady(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="dashboard-container">
            <Spinner
                isLoading={!dataReady}
                captionText={messages}
                captionInterval={2000}
                size="large"
                color="#00aaff"
            />
            {dataReady && <h1>Data Loaded!</h1>}
        </div>
    );
}
```

This setup should allow you to get the Cat Spinner Component running on your local machine. Happy coding! 😊
