import React from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideBar from "../components/sidebar/SideBar";
import { AuthProvider } from "../context/AuthProvider";

import CrossSell from "./crossSell/CrossSell";
import Dashboard from "./dashboard/Dashboard";
import { Settings } from "./settings/Settings";
import ShopifyAuth from "./shopify/ShopifyAuth";
import PersistSignIn from "./signin/PersistSignIn";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";
import Upsell from "./upsell/Upsell";

import "../styles/App.css";

export default function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<ShopifyAuth />} />
            <Route element={<PersistSignIn />}>
              <Route element={<SideBar />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upsell" element={<Upsell />} />
                <Route path="/crosssell" element={<CrossSell />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}
