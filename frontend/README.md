# Frontend - Multi-Tenant Project Management SaaS

Frontend built with Next.js using modern data-fetching and state management patterns.

---

## Frontend Responsibilities

- Authentication flow
- Tenant context handling
- Role-based UI rendering
- State synchronization
- Optimistic UI updates
- Filtering and search handling
- Bulk action handling

---

## Data Flow Process

1. User Login
   → Receive JWT
   → Store securely

2. Tenant Resolution
   → Extract organization_id from token

3. API Request
   → Attach Authorization header
   → Include tenant context

4. Data Fetching
   → TanStack Query / SWR
   → Cache layer

5. State Update
   → Optimistic update on mutation
   → Rollback on failure

6. UI Rendering
   → Permission-based component rendering
   → Conditional feature visibility

---

## Folder Structure

- app/
- components/
- hooks/
- services/
- store/
- types/
- utils/

---

## Core UI Modules

### Organization Dashboard
- Member list
- Role management

### Project Board
- Kanban view
- Status column

### Task Table View
- Sort
- Filter
- Search
- Select
- Select-all
- Bulk delete
- Export button

---

## Helper Feature Implementation

### Search
Debounced input
Trigger API call

### Sort
Controlled table header
Query param sync

### Filter
Multi-filter dropdown
Status / Priority / Assignee

### Mode
Board mode
List mode

### Bulk Actions
Checkbox state map
Select-all (current page or filtered scope)

### Delete Selected
POST /tasks/bulk-delete

### Delete All
POST /tasks/delete-all?filter=...

### Export
Trigger export job
Polling download endpoint

---

## Performance Optimization

- Pagination required
- Memoized components
- Virtualized list for large dataset
- Avoid unnecessary re-render
- Optimistic UI for task updates

---

## UI Authorization Strategy

If role == Viewer:
- Hide edit buttons
- Disable mutation actions

If role == Member:
- Allow only assigned project scope

If role == Admin / Owner:
- Full project access

---

## Scalability Consideration

Frontend supports:
- Infinite scroll
- Lazy loading
- Suspense-based rendering
- Modular component system
- Reusable data hooks

---

Frontend demonstrates:
- Real-world SaaS data flow
- Tenant-aware UI rendering
- Complex state handling
- Bulk operations handling
- Production-ready UI architecture
