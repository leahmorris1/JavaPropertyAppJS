import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from 'react';
import './navbar.css';

import Home from "./HomePropertyPage";

import Seller from "./Seller/SellerProperty";
import SellerInputForm from "./Seller/AddSellerForm";
import ManagePropertyData from "./Seller/ManageSellerProperty";
import SellerPropertyInputform from "./Seller/AddSellerPropertyForm";

import Buyer from "./Buyer/BuyerProperty";
import BuyerInputForm from "./Buyer/AddBuyerForm";
import ManageBuyerBookings from "./Buyer/ManageBuyerBookings";

import PropertySearch from "./Property/PropertySearch";
import Booking from "./Property/Booking";


function NavBar() {

    return (
        <BrowserRouter>
            <nav class="navbar navbar-inverse navbar-expand-sm navbar-light bg-light" id="topNavBar">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <ul class="collapse navbar-collapse navbar-nav nav" id="collapsibleNavbar">
                        <li className="link-container">
                            <Link className="nav-link link" to="/HomeProperty">Home</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Seller/SellerProperty">Seller</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Buyer/BuyerProperty">Buyer</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Property/PropertySearch">Property Search</Link>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li className="link-container"><Link className="glyphicon glyphicon-user nav-link link" to="/HomeProperty"><span></span>Sign Up</Link></li>
                        <li className="link-container"><Link className="glyphicon glyphicon-log-in nav-link link" to="/HomeProperty"><span></span>Login</Link></li>
                    </ul>
                </div>
            </nav>

            <Routes>
                <Route path="/HomeProperty" element={<Home />} />

                <Route path="/Seller/SellerProperty" element={<Seller />} />
                <Route path="/Seller/AddSellerForm" element={<SellerInputForm />} />
                <Route path="/Seller/ManageSellerProperty/:sellerId/:firstName/:surname" element={<ManagePropertyData />} />
                <Route path="/Seller/AddSellerPropertyform/:sellerId/:firstName/:surname" element={<SellerPropertyInputform />} />

                <Route path="/Buyer/BuyerProperty" element={<Buyer />} />
                <Route path="/Buyer/AddBuyerForm" element={<BuyerInputForm />} />
                <Route path="/Buyer/ManageBuyerBookings/:buyerId/:firstName/:surname" element={<ManageBuyerBookings />} />

                <Route path="/Property/PropertySearch" element={<PropertySearch />} />
                <Route path="/Property/Booking" element={<Booking />} />


            </Routes>
        </BrowserRouter>
    )
}

export default NavBar;