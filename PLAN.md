# Stock Management System - Implementation Plan

## Overview
Role-based stock management system with two roles: **Requester** and **Manager**.

---

## ✅ IMPLEMENTATION COMPLETE

All phases have been successfully implemented and the build passes.

---

## Implementation Checklist

### Phase 1: Repository Foundation ✅

#### 1.1 Repository Functions (`repository/`)

**User Repository (`users-repository.ts`)**
- [x] `isRequester(): Promise<boolean>` - Check if current user is requester role
- [x] `isManager(): Promise<boolean>` - Check if current user is manager role
- [x] `getCurrentUserRole(): Promise<string | null>` - Get current user's role

**Product Repository (`product-repository.ts`)**
- [x] `decrementProductAmounts(items: {productId: number, amount: number}[])` - Batch decrement on reservation create
- [x] `incrementProductAmounts(items: {productId: number, amount: number}[])` - Batch increment on rejection (restore stock)

**Reservation Repository (`reservation-repository.ts`)**
- [x] `createReservation(data: CreateReservationInput)` - Create new reservation with products
- [x] `getReservationById(id: number)` - Get single reservation with all details
- [x] `getReservationWithProducts(id: number)` - Get reservation with product details and amounts
- [x] `getReservationsByStatus(status: string)` - Get reservations filtered by status (for manager tabs)
- [x] `updateReservationStatus(id: number, status: string, managerId?: number)` - Update status
- [x] `rejectReservation(id: number)` - Reject and restore product amounts
- [x] `markReservationAvailable(id: number)` - Mark as available
- [x] `deliverReservation(id: number)` - Mark as completed

---

### Phase 2: Role Validation & Access Control ✅

#### 2.1 Role Helper Utilities
- [x] Role helpers in `users-repository.ts`:
  - `isRequester()` - Server-side role check
  - `isManager()` - Server-side role check
  - `getCurrentUserRole()` - Get user's role

#### 2.2 Role-Based Navigation
- [x] Update `app-sidebar.tsx` to conditionally show menu items:
  - "New Reservation" - Only for **Requester**
  - "Reservations" - Both roles (different views)
  - "Dashboard" - Both roles

---

### Phase 3: Requester Features ✅

#### 3.1 New Reservation - Complete Save Flow
- [x] Update `new-reservation-form.tsx` to call repository `createReservation()`
- [x] Implement product amount deduction on save
- [x] Add success/error toast notifications
- [x] Redirect to reservations list after successful save
- [x] Add loading state during save

#### 3.2 Requester Reservations List
- [x] Update `requester-reservations.tsx` table columns:
  - ID, Status, Manager, Created At
- [x] Add "View Details" button on each row
- [x] Remove "Requested By" column (since it's their own)

#### 3.3 Reservation Details Page (Requester)
- [x] Create `app/(protected)/reservations/[id]/page.tsx`
- [x] Create `components/reservation-details.tsx`:
  - Reservation header (ID, Status badge, Created date)
  - Manager info (if assigned)
  - Manager comment (if any)
  - Products table with columns: Product Name, Description, Requested Amount
  - Back button to reservations list

---

### Phase 4: Manager Features ✅

#### 4.1 Manager Reservations Page with Status Tabs
- [x] Update `manager-reservations.tsx` to use tabs:
  - **Pending Tab**: Reservations with status "pending"
  - **Available Tab**: Reservations with status "available"
  - **Rejected Tab**: Reservations with status "rejected"
  - **Completed Tab**: Reservations with status "completed"

#### 4.2 Manager Reservations Table (per tab)
- [x] Columns: ID, Requested By, Created At
- [x] Action buttons based on tab:
  - **Pending**: "Delivery" | "Reject"
  - **Available**: "Deliver Items" | "Reject"
  - **Rejected**: No actions (history)
  - **Completed**: No actions (history)

#### 4.3 Reject Action
- [x] Create `rejectReservation(id: number)` server action:
  1. Update reservation status to "rejected"
  2. Set managerUserId to current user
  3. Restore product amounts from reservations_products
- [x] Add confirmation dialog before reject
- [x] Show toast notification on success/error

#### 4.4 Delivery Page (Manager) - READ ONLY
- [x] Create `app/(protected)/reservations/[id]/delivery/page.tsx`
- [x] Role check: Only managers can access
- [x] Create `components/delivery-view.tsx`:
  - Reservation header info (ID, Created date)
  - Requester info (name, email)
  - Products table (READ-ONLY) with columns:
    - Product Name
    - Description
    - Requested Amount
  - **"Mark Available"** button at bottom (confirms items are ready)
  - **"Reject"** button
  - Back/Cancel button

#### 4.5 Mark Available Action
- [x] Create `markReservationAvailable(id: number)` server action:
  1. Update reservation status to "available"
  2. Set managerUserId to current user
- [x] Redirect back to reservations list after success

#### 4.6 Deliver Items Action
- [x] Create `deliverReservation(id: number)` server action:
  1. Update reservation status to "completed"
  2. Set updatedUserId to current user
- [x] Add to Available tab table as action button
- [x] Show confirmation dialog before action

---

### Phase 5: Reservations Page Role Routing ✅

#### 5.1 Main Reservations Page
- [x] Update `app/(protected)/reservations/page.tsx`:
  - Check user role on load
  - Render `RequesterReservations` for requester role
  - Render `ManagerReservations` for manager role

#### 5.2 New Reservation Page Access
- [x] Update `app/(protected)/new-reservation/page.tsx`:
  - Add role check at top
  - Redirect managers to reservations page

---

### Phase 6: UI Components ✅

#### 6.1 Shadcn/UI Components Added
- [x] `tabs.tsx` - For manager status tabs
- [x] `alert-dialog.tsx` - For reject/deliver confirmation
- [x] `sonner` - For toast notifications (Toaster in root layout)

---

### Phase 7: Testing & Polish

#### 7.1 Flow Testing
- [ ] Test: Requester creates reservation → product amounts decrease
- [ ] Test: Manager rejects → product amounts restore
- [ ] Test: Manager flow: Delivery → Mark Available → Deliver Items
- [ ] Test: Role-based navigation visibility
- [ ] Test: Role-based page access restrictions

#### 7.2 Edge Cases
- [x] Handle products with 0 stock (already implemented in add-product-modal)
- [x] Handle unauthorized access attempts (redirects in place)
- [x] Handle network errors with proper feedback (toast notifications)

---

## Database Changes Required

**NO DATABASE CHANGES NEEDED** - The existing schema is sufficient.

### Reservation Status Values
Status column accepts: `pending`, `available`, `rejected`, `completed`

---

## File Structure (Created/Updated Files)

```
app/(protected)/
├── reservations/
│   ├── page.tsx                          # Updated: role-based view
│   ├── [id]/
│   │   ├── page.tsx                      # NEW: Details page
│   │   └── delivery/
│   │       └── page.tsx                  # NEW: Delivery page (manager)
│   └── components/
│       ├── manager-reservations.tsx      # Updated: tabs + actions
│       ├── requester-reservations.tsx    # Updated: columns + details btn
│       ├── reservation-details.tsx       # NEW: details component
│       └── delivery-view.tsx             # NEW: delivery view
├── new-reservation/
│   ├── page.tsx                          # Updated: role check
│   └── components/
│       └── new-reservation-form.tsx      # Updated: save to DB
└── layout.tsx                            # Updated: pass role to sidebar

components/
├── ui/
│   ├── tabs.tsx                          # NEW: shadcn tabs
│   └── alert-dialog.tsx                  # NEW: shadcn alert-dialog
└── app-sidebar.tsx                       # Updated: role-based nav

app/layout.tsx                            # Updated: added Toaster

repository/
├── product-repository.ts                 # Updated: amount operations
├── reservation-repository.ts             # Updated: CRUD operations
└── users-repository.ts                   # Updated: role checks
```

---

## Status Flow Diagram

```
                                    Manager clicks
                                   "Mark Available"
                                         │
[NEW] ──create──> [PENDING] ──delivery──> [AVAILABLE] ──deliver items──> [COMPLETED]
                     │                         │
                     │                         │
                     └───reject───> [REJECTED] <───reject───┘
```

**Flow Description:**
1. **Requester** creates reservation → Status: `pending`, product amounts decremented
2. **Manager** opens "Delivery" page, views items, physically prepares them
3. **Manager** clicks "Mark Available" → Status: `available`
4. **Requester** goes to stock sector to pick up items
5. **Manager** clicks "Deliver Items" → Status: `completed`

**Reject at any point (pending or available):**
- Status changes to `rejected`
- Product amounts are restored to stock

---

## Future Enhancements (Optional)

1. Dashboard statistics (total reservations, pending count, etc.)
2. Manager comment field for rejected reservations
3. Email notifications when status changes
4. Pagination on reservation lists
5. Search/filter functionality on tables
