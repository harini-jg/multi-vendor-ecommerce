# Problem Statement

## 1. Title

Multi-Vendor E-Commerce Marketplace (Amazon Style)

## 2. Domain

E-Commerce / Online Marketplace

## 3. Who is the user?

The system has three main types of users:

- **Customer:** Searches for products, adds products to the cart, places orders, makes payments, and tracks orders.
- **Vendor/Seller:** Registers as a seller, adds and manages products, maintains inventory, and processes customer orders.
- **Admin:** Manages customers, vendors, products, categories, orders, and monitors the overall marketplace.

## 4. What problem are we solving?

Traditional online shopping platforms may not provide an efficient way for multiple independent vendors to manage and sell their products through a single platform. Vendors may face difficulties in managing products, inventory, and orders, while customers may need a convenient way to compare and purchase products from different sellers. The system aims to provide a centralized marketplace where multiple vendors can sell products and customers can shop from different vendors through one platform.

## 5. Proposed Solution

The proposed system is a multi-vendor e-commerce marketplace that allows multiple vendors to register and sell their products through a single online platform. Customers can browse, search, filter, compare, and purchase products from different vendors. The system provides shopping cart, wishlist, order management, payment processing, product reviews, inventory management, and order tracking features. An admin dashboard allows administrators to manage users, vendors, products, categories, and orders.

## 6. Core Entities / Database Tables

- Users
- Vendors
- Categories
- Products
- Product_Images
- Cart
- Cart_Items
- Orders
- Order_Items
- Payments
- Reviews
- Wishlist
- Addresses

## 7. User Roles & Permissions

### Admin
- Manage customers and vendors
- Approve or block vendors
- Manage products and categories
- Monitor orders and payments
- View marketplace reports

### Vendor
- Manage own products
- Update product prices and stock
- View and process own orders
- Manage inventory

### Customer
- Register and login
- Browse and search products
- Add products to cart and wishlist
- Place orders
- Make payments
- Track orders
- Submit ratings and reviews

## 8. Success Criteria

- A customer should be able to register and log in successfully.
- A vendor should be able to add and manage products.
- Customers should be able to search and filter products.
- Customers should be able to add products to a cart and place an order.
- The system should correctly calculate the order total.
- Vendors should be able to view and process their own orders.
- Customers should be able to track order status.
- Admin should be able to manage users, vendors, products, and orders.
- The system should prevent unauthorized users from accessing restricted features.

## 9. Out of Scope

The following features will not be included in the initial version:

- International shipping
- Advanced AI-based product recommendations
- Real-time delivery vehicle tracking
- Cryptocurrency payments
- International tax calculation
- Automated vendor payout and settlement system
- Native Android/iOS mobile applications

## 10. Chosen Track

Java (Spring Boot)