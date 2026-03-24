# MyShop

A Next.js 14+ E-commerce Store built, using the App Router, Context API, and Vanilla CSS. It fetching fake product data from [Fake Store API](https://fakestoreapi.com/) and provides a full simulated shopping experience.

## Features

- **Next.js 14+ App Router:** Modern architecture.
- **Responsive Design:** Mobile-first layout without using a CSS framework, allowing beginners to easily understand raw styles.
- **Product Grid & Details:** Display all products, use a dynamic route (`/product/[id]`) to view single product details.
- **Search & Filter:** Real-time search to filter products by their title.
- **Shopping Cart System:** Built locally using React Context (`CartContext`) and `useState`. Total calculation, quantity updates, and items persistence.
- **Checkout Simulation:** A simple unvalidated checkout form mimicking a real order flow.
- **Dark Mode Support:** CSS relies on standard media query preferring color schemes seamlessly.

![Home Page Placeholder](./public/screenshots/home.png)
![Product Detail Placeholder](./public/screenshots/product.png)
![Cart Placeholder](./public/screenshots/cart.png)

## How to Run Locally

You must have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd my-shop
   ```

2. **Install dependencies:**

   ```bash
   npm install
   npm install lucide-react
   ```

   _Note: If you encounter network errors during creation, manually run this command._

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## How to Deploy on Vercel (Free)

Deploying a Next.js application to Vercel is extremely fast and straightforward since Vercel built Next.js.

1. **Push your code to GitHub** (or GitLab/Bitbucket).
2. Create an account on [Vercel](https://vercel.com/) and click **Add New** > **Project**.
3. Import your GitHub repository.
4. Leave all build settings as default (Framework Preset: Next.js).
5. Click **Deploy**. Vercel will install dependencies, build the app, and give you a live URL in minutes!
