# MetaShot Pulse 🏏⚡

> **Motion-Powered Cricket Intelligence & Hardware Telemetry Workspace**  
> Synthesizing physical smart-bat sensor telemetry and privacy-safe customer intelligence across 232,970+ application records.

---

## 🌟 Overview

**MetaShot Pulse** is the customer intelligence, telemetry, and market activation workspace for [MetaShot](https://www.metashot.in)—the motion-powered cricket platform featured on **Shark Tank India**.

The application bridges MetaShot’s physical IoT hardware (the sensor-infused **SmartBat** and zero-latency TV Kit) with digital companion app analytics. It enables product managers, analysts, and growth engineers to profile customer demand across global markets, design event telemetry contracts, and inspect activation funnels—all within a **privacy-first, aggregate-only architecture** designed with a strict **Shadcn Monochrome (Black & White)** aesthetic.

---

## ✨ Key Highlights & Features

### 1. 🏏 SmartBat Hardware Telemetry Hub
*Directly modeled from [metashot.in](https://www.metashot.in)*:
- **9-Axis Motion IMU Tracking**: Visualizes live bat speed (up to 160 km/h), impact angle (+14.8°), sweet-spot accuracy (96.4%), and haptic strike feedback.
- **Wireless TV Casting**: Zero-latency HDMI receiver status for 1080p 60fps big-screen cricket gameplay.
- **4-Step Hardware Activation Flow**:
  1. *Unbox SmartBat & TV Kit*
  2. *Download Companion App* (iOS & Android)
  3. *Instant Bluetooth BLE 5.0 Pairing*
  4. *Play 360° Virtual Cricket Anywhere*
- **Game Modes**: Super Over, Multiplayer Online 1v1, Tournament Brackets, and Practice Nets.

### 2. ⚡ Full-Stack Lazy Loading Architecture
- **Route & View Code Splitting**: Modularized views dynamically split into standalone Vite chunks via `React.lazy()` and `<Suspense>`:
  - `Overview` chunk (`~13.9 kB`)
  - `SmartBatHub` chunk (`~10.7 kB`)
  - `LazyImage` chunk (`~0.9 kB`)
- **Zero-Layout-Shift Skeletons**: Custom `<ViewLoadingSkeleton />` renders animated shimmer placeholders while views resolve.
- **Progressive Image Lazy Loading**: High-resolution hardware and stadium assets load with `loading="lazy"`, displaying a shimmering placeholder that smoothly transitions to full opacity on mount.
- **Interactive Lazy Simulator**: An on-screen test button located on the Overview dashboard to preview the skeleton loader on demand.

### 3. 🎨 Shadcn Black & White Design System
- **Strict Monochrome Palette**: High-contrast jet blacks (`#0a0a0a`), crisp whites (`#ffffff`), subtle borders (`#27272a`), and neutral zinc tones.
- **Signature Chroma Button Transition**:
  - Implements the exact chromatic text sweep from [page3-dewas.vercel.app](https://page3-dewas.vercel.app/) using `-webkit-background-clip: text` and infinite linear-gradient keyframes.
  - Arrow translation (`translateX(3px)`) with spring timing `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Available across all primary call-to-actions, hero cards, and the interactive **"Book Appointment"** briefing modal.
- **Dark / Light Mode Toggle**: Instant switch in the topbar; both modes adhere strictly to monochrome guidelines.

### 4. 🔒 Privacy-Safe Local CSV Ingestion Engine
- **Client-Side Parsing**: Powered by `PapaParse`. Raw customer lines, personal emails, and phone numbers are parsed entirely in memory and **never transmitted or stored remotely**.
- **Automated Validation**: Flags missing identifiers, schema errors, and candidate duplicates.
- **Session Audit History**: Records aggregate outcomes, timestamped entries, and user roles.

### 5. 🌍 Customer Geography & Cohort Analysis
- **Audited Market Segments**: Analyzes 232,970 records across India (87.0%), Pakistan (1.9%), Australia (1.5%), Bangladesh (1.1%), UK (0.7%), and unresolved territories (7.6%).
- **Interactive Slide-Out Drawer**: Drill down into market metrics, device signal density, and export freshness.

### 6. 🧪 Activation Lab & Event Contracts
- **Physical-to-Digital Funnel**: Formulates the six milestones from app install to smart-bat connection and Day-7 repeat play.
- **v1.2 Telemetry Contract**: Copyable JSON schema contract defining event payload specifications.
- **Experiment Notebook**: Draft A/B testing hypotheses (e.g., visual Bluetooth setup flows).

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/metashot-pulse.git
   cd metashot-pulse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🧭 How to Use MetaShot Pulse Effectively

Follow this walkthrough to experience the end-to-end capabilities:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Overview       ──▶ Inspect 232k downloads & test lazy UI │
│ 2. Smart Bat Hub  ──▶ Review 9-axis hardware telemetry      │
│ 3. Book Briefing  ──▶ Hover & trigger signature Chroma CTA  │
│ 4. Customers      ──▶ Search & inspect geographic clusters  │
│ 5. CSV Imports    ──▶ Drag & drop export for local profile  │
│ 6. Activation Lab ──▶ Inspect BLE pairing event contract    │
│ 7. Role Switching ──▶ Test Admin, Analyst, and Viewer ACLs  │
└─────────────────────────────────────────────────────────────┘
```

### Step 1: Start at the Executive Overview
- View the 4 core macro metrics (`Download Records`, `Unique Email Keys`, `2026 Run Rate`, `Location Coverage`).
- Click **"Test Skeleton Shimmer"** on the Lazy Loading banner to watch the components simulate dynamic on-demand retrieval.
- Hover over the **"Book Appointment"** button to experience the signature chromatic gradient text sweep and arrow glide.

### Step 2: Explore the Smart Bat Hub
- Navigate to **"Smart Bat Hub"** in the sidebar.
- Inspect real-world MetaShot hardware telemetry: Bat Speed, Sweet-Spot Contact, Impact Angle, and Battery.
- Review virtual stadium gameplay modes and the 4-step unboxing-to-play workflow.

### Step 3: Profile a New CSV Export
- Switch to the **"Imports"** tab.
- Drag & drop a customer or event export (`.csv`).
- MetaShot Pulse parses the file in browser memory, extracts schema keys, counts potential duplicates, and calculates declared country coverage without sending any data over the network.
- Click **"Save to Workspace Audit"** to record an aggregate entry into the immutable audit trail.

### Step 4: Analyze Customer Markets
- Switch to **"Customers"**.
- Use the `⌘K` search bar to filter markets (e.g., type `India` or `Australia`).
- Select any row to open the slide-out inspector drawer for detailed device signals and download breakdowns.

### Step 5: Test Role Permissions
- In the top right header, switch your **Demo role**:
  - **Admin**: Full access to imports, governance, and reporting.
  - **Analyst**: Data exploration, cohort testing, and brief drafting.
  - **Viewer**: Read-only access; file uploads and report exports are automatically disabled.

### Step 6: Toggle Theme
- Click the **Sun / Moon** icon in the topbar to switch between Dark and Light mode. Both palettes maintain a clean, black-and-white look.

---

## 📁 Project Structure

```
metashot-pulse/
├── public/                     # Static assets & offline fallbacks
│   ├── metashot-logo.png       # Official MetaShot brand logo
│   ├── metashot-hero.webp      # SmartBat flagship hardware
│   ├── metashot-features.webp  # Motion sensor engineering graphic
│   ├── metashot-gameplay.webp  # Virtual cricket stadium gameplay
│   └── metashot-stadium.webp   # Arena environment
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── LazyImage.tsx       # Progressive image loader with shimmer skeleton
│   │   └── Skeleton.tsx        # Shadcn skeleton loader components
│   ├── views/                  # Lazy-loaded route views (Code Split)
│   │   ├── Overview.tsx        # Executive dashboard & lazy loading showcase
│   │   └── SmartBatHub.tsx     # Hardware specs & telemetry arena
│   ├── App.tsx                 # Core shell, navigation, modals, and views
│   ├── main.tsx                # React root mount
│   ├── metashotData.ts         # Pre-computed aggregate dataset benchmarks
│   ├── types.ts                # TypeScript interfaces (Account, ImportSummary, etc.)
│   ├── styles.css              # Shadcn monochrome design system & Chroma CSS
│   ├── responsive.css          # Responsive layouts, Kanban, and tab styles
│   └── mobile-lab.css          # Mobile breakpoint refinements
├── data/                       # Dataset profiles, dictionaries, and CSV schemas
├── research/                   # Technical architecture, privacy, & market docs
├── index.html                  # HTML entry point with Geist Mono & Inter fonts
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite bundler build configuration
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Declarative component UI and hooks (`useState`, `useMemo`, `lazy`, `Suspense`) |
| **Vite 6** | Build tooling, dynamic chunk splitting, and fast HMR |
| **TypeScript** | Strict compile-time type safety across data schemas and accounts |
| **Lucide React** | Minimalist icon set |
| **PapaParse** | High-performance, streaming in-browser CSV parser |
| **Shadcn Monochrome** | Pure Black & White token design system (`zinc-950` / `zinc-50`) |

---

## 🛡️ Privacy & Compliance Guarantees

MetaShot Pulse is designed in accordance with privacy-by-design standards:
- **No Remote Row Ingestion**: The browser operates exclusively on aggregates. Raw email addresses and phone numbers are never persisted to `localStorage` or transmitted across the wire.
- **Candidate Deduplication**: Repeated email keys are flagged as review candidates without inferring personal identity.
- **Simulation Boundary**: Campaign drafting tools are hardwired into simulation mode; no external email or SMS dispatch providers are linked.

---

## 📄 License & Credits

- **Hardware & Brand Assets**: Copyright © [MetaShot](https://www.metashot.in).
- **Project Maintainer**: Om Javia
- **Built for**: MetaShot Pulse Customer Intelligence & Hardware Telemetry.
