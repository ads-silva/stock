# Requester User Guide

## Stock Management System - Reservation Requester Manual

This guide explains how to use the Stock Management System as a **Reservation Requester**. Your role allows you to create reservation requests for products and track their status.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Navigation Overview](#navigation-overview)
3. [Creating a New Reservation](#creating-a-new-reservation)
4. [Viewing Your Reservations](#viewing-your-reservations)
5. [Understanding Reservation Statuses](#understanding-reservation-statuses)
6. [Reservation Lifecycle](#reservation-lifecycle)

---

## Getting Started

After logging in with your requester account, you will have access to the reservation management features. Your main tasks include:

- Creating new product reservations
- Tracking the status of your requests
- Viewing reservation details

---

## Navigation Overview

As a requester, you have access to the following menu items in the sidebar:

| Menu Item | Description |
|-----------|-------------|
| **New Reservation** | Create a new product reservation request |
| **Reservations** | View all your submitted reservations |

---

## Creating a New Reservation

### Step 1: Access the New Reservation Page

Click on **"New Reservation"** in the sidebar navigation.

### Step 2: Review Your Information

The form displays your information automatically:
- **Requester Name**: Your registered name (read-only)
- **Date/Time**: Current timestamp (read-only)

### Step 3: Add Products to Your Reservation

1. Click the **"Add Products"** button to open the product selection modal
2. In the modal, you can:
   - **Search** for products by name or description
   - **View** available stock for each product
   - **Select** the quantity you need

### Step 4: Product Selection Rules

When selecting products, keep in mind:
- Quantity must be greater than 0
- Quantity cannot exceed available stock
- Products out of stock cannot be selected
- The system shows remaining stock after your selection

### Step 5: Manage Selected Products

Before submitting:
- Review all selected products in the list
- Remove any products you no longer need by clicking the remove button
- Add more products if needed

### Step 6: Submit Your Reservation

Click the **"Save"** button to submit your reservation. You will:
- See a success notification
- Be redirected to the reservations list
- Your reservation will appear with "Pending" status

---

## Viewing Your Reservations

### Reservations List

Navigate to **"Reservations"** in the sidebar to see all your submitted requests.

The list displays:
| Column | Description |
|--------|-------------|
| **ID** | Unique reservation identifier |
| **Status** | Current status with colour-coded badge |
| **Items** | Number of products in the reservation |
| **Manager** | Assigned manager (if any) |
| **Created At** | When the reservation was submitted |

### Viewing Reservation Details

Click the **"Details"** button on any reservation to view:
- Full reservation information
- Requester details
- Assigned manager information
- All requested products with quantities
- Manager comments (if any)
- Creation and update timestamps

---

## Understanding Reservation Statuses

Your reservations can have one of four statuses:

### Pending (Amber)
- Your request has been submitted
- Waiting for a manager to review
- No action required from you

### Available (Blue)
- The manager has approved your request
- Items are prepared and ready for pickup
- Await delivery confirmation

### Completed (Green)
- Items have been delivered to you
- The reservation is finalised
- No further action needed

### Rejected (Red)
- The manager could not fulfil your request
- Reserved items have been restored to stock
- Check manager comments for the reason

---

## Reservation Lifecycle

```
┌─────────────────┐
│  Create New     │
│  Reservation    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    PENDING      │ ◄── Waiting for manager review
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│AVAILABLE│ │REJECTED│ ◄── Manager rejected
└────┬───┘ └────────┘      (items restored)
     │
     ▼
┌─────────────────┐
│   COMPLETED     │ ◄── Items delivered
└─────────────────┘
```

### Flow Description

1. **Submit Request**: You create a reservation with desired products
2. **Pending**: Your request awaits manager review
3. **Manager Decision**:
   - **Approve**: Status changes to "Available" (items ready for pickup)
   - **Reject**: Status changes to "Rejected" (items restored to stock)
4. **Delivery**: When items are delivered, status becomes "Completed"

---

## Tips for Requesters

1. **Check Stock**: Before creating a reservation, the modal shows available quantities
2. **Be Specific**: Request only what you need to help managers fulfil requests efficiently
3. **Track Status**: Regularly check your reservations list for status updates
4. **Review Comments**: If rejected, read the manager's comment for explanation

---

## Need Help?

Contact your system administrator or manager if you encounter any issues with:
- Product availability
- Reservation processing
- Account access

---

*Stock Management System - Requester Guide v1.0*
