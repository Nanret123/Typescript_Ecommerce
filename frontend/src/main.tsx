import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";

import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StoreProvider } from "./Store";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderHistoryPage from "./pages/OrderHistoryPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<ProtectedRoutes />}>
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/orderhistory" element={<OrderHistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ "clientId": "sb" }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
);
