# Manager User Guide

## Stock Management System - Reservation Manager Manual

This guide explains how to use the Stock Management System as a **Reservation Manager**. Your role allows you to review, approve, and fulfil reservation requests, as well as monitor stock levels and analytics.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Navigation Overview](#navigation-overview)
3. [Dashboard](#dashboard)
4. [Managing Reservations](#managing-reservations)
5. [Processing Pending Reservations](#processing-pending-reservations)
6. [Completing Deliveries](#completing-deliveries)
7. [Rejecting Reservations](#rejecting-reservations)
8. [Reservation Workflow](#reservation-workflow)

---

## Getting Started

After logging in with your manager account, you will have access to comprehensive reservation management and analytics features. Your main responsibilities include:

- Monitoring stock levels and reservation trends
- Reviewing and processing pending reservations
- Approving or rejecting requests
- Confirming deliveries

---

## Navigation Overview

As a manager, you have access to the following menu items in the sidebar:

| Menu Item | Description |
|-----------|-------------|
| **Dashboard** | Analytics and monitoring overview |
| **Reservations** | Manage all reservation requests |

---

## Dashboard

The Dashboard provides a comprehensive overview of your stock management system.

### Statistics Cards

At the top of the dashboard, you'll find key metrics:

| Metric | Description |
|--------|-------------|
| **Total Products** | Number of products in the system |
| **Total Stock** | Combined stock across all products |
| **Total Reservations** | All reservations in the system |
| **Pending** | Reservations awaiting your review |
| **Completed** | Successfully fulfilled reservations |
| **Rejected** | Declined reservations |

### Charts and Visualisations

The dashboard includes several analytical tools:

1. **Reservations Trend Chart**: Monthly trend of reservation activity
2. **Status Distribution**: Pie chart showing breakdown by status
3. **Top Products**: Most frequently reserved products
4. **Stock Levels**: Visual representation of current inventory

### Low Stock Alerts

A dedicated table highlights products with low inventory, helping you:
- Identify items that need restocking
- Anticipate potential fulfilment issues
- Plan procurement activities

---

## Managing Reservations

### Accessing the Reservations List

Navigate to **"Reservations"** in the sidebar to view all reservations in the system.

### Filtering by Status

Use the tab interface to filter reservations:

| Tab | Shows |
|-----|-------|
| **Pending** | Reservations awaiting your review |
| **Available** | Approved, ready for delivery |
| **Rejected** | Declined reservations |
| **Completed** | Successfully delivered |

### Reservations Table

Each reservation displays:

| Column | Description |
|--------|-------------|
| **ID** | Unique reservation identifier |
| **Requested By** | Name of the requester |
| **Items** | Number of products requested |
| **Created At** | Submission date |
| **Actions** | Available actions based on status |

---

## Processing Pending Reservations

Pending reservations require your review and decision.

### Option A: Full Review via Delivery Page

1. Click the **"Delivery"** button on a pending reservation
2. Review the detailed information:
   - Requester name and email
   - Creation timestamp
   - List of requested items with quantities
3. Make your decision:
   - Click **"Mark Available"** to approve
   - Click **"Reject"** to decline

### Option B: Quick Reject from List

1. From the reservations list, click **"Reject"** directly
2. Confirm your decision in the dialogue
3. Items will be restored to stock automatically

### Delivery Page Details

The delivery page shows:
- **Requester Information**: Name, email, and request date
- **Items to Prepare**: Complete list of products with requested quantities

---

## Completing Deliveries

Once items are prepared and ready, you can mark them as available for the requester.

### Marking as Available

1. From the Pending tab, click **"Delivery"** on the reservation
2. Review the items to ensure they are prepared
3. Click **"Mark Available"**
4. Confirm in the dialogue: *"The requester will be notified that items are ready for pickup"*
5. The reservation moves to "Available" status

### Confirming Delivery

When the requester has received their items:

1. Go to the **Available** tab
2. Find the reservation
3. Click **"Deliver Items"**
4. Confirm in the dialogue
5. The reservation moves to "Completed" status

---

## Rejecting Reservations

You can reject reservations from either Pending or Available status.

### When to Reject

- Insufficient stock
- Product discontinued
- Budget constraints
- Duplicate request
- Invalid request

### Rejection Process

1. Click the **"Reject"** button on the reservation
2. Review the confirmation dialogue:
   - *"Are you sure you want to reject this reservation?"*
   - *"The reserved items will be restored to stock"*
3. Click **Confirm** to proceed
4. The reservation moves to "Rejected" status

**Note**: The requester will see the updated status and any manager comments you've provided.

---

## Reservation Workflow

```
                    REQUESTER                           MANAGER
                        │                                  │
                        ▼                                  │
               ┌─────────────────┐                         │
               │ Submit Request  │                         │
               └────────┬────────┘                         │
                        │                                  │
                        ▼                                  ▼
               ┌─────────────────┐              ┌─────────────────┐
               │     PENDING     │──────────────│  Review Request │
               └─────────────────┘              └────────┬────────┘
                                                         │
                                               ┌─────────┴─────────┐
                                               │                   │
                                               ▼                   ▼
                                        ┌───────────┐       ┌───────────┐
                                        │  Approve  │       │  Reject   │
                                        └─────┬─────┘       └─────┬─────┘
                                              │                   │
                                              ▼                   ▼
               ┌─────────────────┐     ┌───────────┐       ┌───────────┐
               │  Items Ready    │◄────│ AVAILABLE │       │ REJECTED  │
               └─────────────────┘     └─────┬─────┘       └───────────┘
                        │                    │
                        ▼                    ▼
               ┌─────────────────┐    ┌───────────────┐
               │ Pickup/Receive  │◄───│Deliver Items  │
               └────────┬────────┘    └───────────────┘
                        │
                        ▼
               ┌─────────────────┐
               │   COMPLETED     │
               └─────────────────┘
```

### Status Descriptions

| Status | Description | Manager Actions |
|--------|-------------|-----------------|
| **Pending** | New request awaiting review | Approve or Reject |
| **Available** | Items prepared for pickup | Deliver or Reject |
| **Completed** | Items delivered | None (final state) |
| **Rejected** | Request declined | None (final state) |

---

## Best Practices for Managers

1. **Regular Monitoring**: Check pending reservations frequently
2. **Stock Awareness**: Use the dashboard to monitor low stock items
3. **Timely Processing**: Process requests promptly to maintain efficiency
4. **Clear Communication**: Provide helpful comments when rejecting
5. **Trend Analysis**: Use dashboard charts to identify patterns

---

## Quick Reference: Manager Actions

| Current Status | Available Actions |
|----------------|-------------------|
| Pending | View Delivery Details, Mark Available, Reject |
| Available | Deliver Items, Reject |
| Completed | View Only |
| Rejected | View Only |

---

## Need Help?

Contact your system administrator if you encounter any issues with:
- Dashboard data
- System access
- Technical problems

---

*Stock Management System - Manager Guide v1.0*
