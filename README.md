# Factory Operations - Production Control Dashboard

A high-performance, real-time **Production Control Dashboard** designed for factory operations managers to monitor work orders, track machine telemetry, identify production bottlenecks, and execute rapid job status updates.

Built using **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, and **Lucide React Icons**.

---

## 🛠️ Tech Stack & Rules Compliance

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Dark industrial theme design system)
- **Icons**: `lucide-react`
- **UI Architecture**: Clean modular component primitives (`Badge`, `Button`, `Card`, `Input`, `Select`, `Sheet`, `Toast`)
- **Zero Third-Party Table/Dashboard Dependencies**: Custom lightweight table, sorting, filtering, and drawer modal implementations.

---

## 📁 Project Architecture & Component Structure

The repository follows a clean architecture pattern separating domain types, custom React hooks, state management, UI primitives, and feature-specific components:

```
d:/11Labs/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with font and metadata
│   │   ├── page.tsx           # Main Dashboard Page (Hook integration & view layout)
│   │   └── globals.css        # Tailwind tokens & dark industrial theme
│   ├── types/
│   │   └── job.ts             # Domain interfaces (Job, Machine, JobStatus, JobNote, JobFilters)
│   ├── data/
│   │   └── mockJobs.ts        # Realistic dataset of 12+ factory work orders & machine specs
│   ├── hooks/
│   │   ├── useJobs.ts         # Job state management, status updates, notes & local persistence
│   │   ├── useJobFilters.ts   # Search, filter (status, machine), and multi-column sort logic
│   │   └── useMetrics.ts      # Real-time KPI metrics calculation hook
│   ├── components/
│   │   ├── ui/                # Reusable UI component primitives
│   │   │   ├── Badge.tsx      # Status badge with custom HSL tone maps
│   │   │   ├── Button.tsx     # Variant-based button component
│   │   │   ├── Card.tsx       # Glassmorphism container cards
│   │   │   ├── Input.tsx      # Accessible input with icon support
│   │   │   ├── Select.tsx     # Custom styled select dropdown
│   │   │   ├── Sheet.tsx      # Sliding side drawer modal for job details
│   │   │   └── Toast.tsx      # Floating feedback notification toast
│   │   └── dashboard/
│   │       ├── Header.tsx           # Industrial top bar with telemetry & live clock
│   │       ├── MetricsOverview.tsx  # 4 KPI cards (Total, Delayed, Due Soon, Completed)
│   │       ├── JobFilterBar.tsx     # Instant search, status pills, machine filter, sort controls
│   │       ├── JobsTable.tsx        # Interactive work orders table with delayed row highlights
│   │       ├── JobDetailDrawer.tsx  # Side panel showing specs, machine telemetry, status updater & notes timeline
│   │       └── EmptyState.tsx       # Zero-state view with one-click filter reset
│   └── lib/
│       └── utils.ts           # Class merger (`cn`), date formatting, urgency badges
├── README.md
├── package.json
└── tailwind.config.js
```

---

## 🚀 Setup & Local Execution Instructions

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd production-control-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## 🎯 Features & Product Design

1. **KPI Telemetry Overview**:
   - **Total Work Orders**: Real-time count of active jobs with progress breakdown.
   - **Delayed Jobs**: Red alert visual treatment showing percentage of delayed orders.
   - **Due Today / Soon**: Dynamic count of jobs with deadlines within 48 hours.
   - **Completed Jobs**: Green success card with overall completion rate percentage.

2. **Jobs / Work Orders Table**:
   - Displays Job ID, Product Name & SKU, Customer with brand initials, Quantity & Unit, Due Date with urgency badge, Status badge, and Assigned Machine.
   - Row-click triggers the side drawer modal.
   - Distinct row highlights for delayed orders requiring operator intervention.

3. **Multi-Filter & Search Bar**:
   - Instant search across product names, customer names, job IDs, and SKUs.
   - Quick status filter pills (`All`, `Pending`, `In Progress`, `Delayed`, `Completed`).
   - Machine filter dropdown.
   - Sorting options by Due Date or Quantity with ascending/descending toggles.

4. **Job Detail Side Panel (Drawer)**:
   - Full job details, customer PO number, and operator shift assignment.
   - Assigned machine telemetry (location, OEE efficiency rating, operational status).
   - **Status Update Action**: Dropdown to change job status instantly with live toast notification and data persistence.
   - **Notes & Issues Log**: Timeline feed of historical notes with option to add new general notes or issue alerts.

---

## 📝 Submission Explanations

### Component Structure
The project strictly isolates **logic from UI rendering**:
- **Hooks (`useJobs`, `useJobFilters`, `useMetrics`)** encapsulate data processing, filtering, sorting, state changes, and persistence.
- **Components (`JobsTable`, `JobDetailDrawer`, `MetricsOverview`, `JobFilterBar`)** handle pure UI rendering based on clean props.
- **UI Primitives (`src/components/ui/`)** ensure visual consistency and reusability across the application.

### Key Assumptions
1. **Mock Data Persistence**: Changes to job statuses and new notes are persisted to `localStorage` so user actions remain consistent across page reloads. A "Reset Demo Data" button in the header allows resetting back to the initial state.
2. **Urgency Thresholds**: Jobs with due dates $\le 2$ days are categorized as "Due Soon", and past due dates for non-completed jobs trigger an "Overdue" visual indicator.
3. **Machine Telemetry**: Machines have operational efficiency ratings (OEE %) and statuses (`Operational`, `Maintenance Required`) to simulate real factory equipment monitoring.

### Future Improvements (Given More Time)
1. **WebSocket / Real-Time Server Integration**: Replace mock local state with Server-Sent Events (SSE) or WebSockets to simulate dynamic telemetry updates from CNC machines in real time.
2. **Batch Actions**: Allow selecting multiple jobs to perform bulk status updates or reassign machine channels.
3. **Export Reports**: Add PDF / CSV export for daily shift handoff logs and delayed job root-cause reports.
4. **Unit & E2E Testing**: Add Jest / React Testing Library for custom hooks testing and Playwright for end-to-end user flow verification.
