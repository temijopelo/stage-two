# Invoice Management App

A responsive invoice management application built with Next.js, TypeScript, Tailwind CSS, and localStorage persistence. The app lets you create, edit, filter, view, mark, and delete invoices from a single interface.

## Features

- Create invoices with bill-from, bill-to, invoice date, payment terms, project description, and itemized line items.
- Save invoices as pending or draft.
- View invoice details on a dedicated details page.
- Edit an existing invoice with prefilled values.
- Delete invoices from the details page.
- Mark pending invoices as paid.
- Filter invoices by status: draft, pending, and paid.
- Persist invoice data in the browser using localStorage.
- Responsive layout for mobile and desktop.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI and Vaul for dialogs, drawers, and menus
- React Icons for iconography

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

### Start the production server

```bash
npm start
```

### Lint the project

```bash
npm run lint
```

## Application Flow

1. The home route renders the invoices page.
2. Invoice data is loaded from localStorage through `src/lib/invoice-storage.ts`.
3. Creating an invoice writes both the simplified list and the full invoice record.
4. Clicking an invoice opens the details page with the invoice id in the query string.
5. The details page reads the invoice id, loads the full invoice, and renders the invoice data.
6. Edit and delete actions are handled from the invoice details footer.
7. Status filters are stored in localStorage so the selected filter state is preserved.

## Code Structure

### App Routes

- `src/app/page.tsx` - root route that renders the invoice list.
- `src/app/invoices/page.tsx` - invoice list, creation drawer, and status filters.
- `src/app/invoices/view/page.tsx` - invoice details page with edit, delete, and mark-as-paid actions.
- `src/app/layout.tsx` - root layout, theme bootstrapping, and app shell.

### Components

- `src/components/newInvoiceForm.tsx` - form used to create invoices.
- `src/components/editInvoiceForm.tsx` - prefilled form used to edit invoices.
- `src/components/invoice-card.tsx` - invoice card used in the list view.
- `src/components/invoiceDetails.tsx` - renders a full invoice record.
- `src/components/common/footerBtn.tsx` - edit, delete, and mark-as-paid actions on the details page.
- `src/components/layout/appLayout.tsx` - shared layout wrapper.
- `src/components/ui/*` - reusable UI primitives for drawers, dialogs, dropdowns, buttons, and checkboxes.

### Data Layer

- `src/lib/invoice-storage.ts` - localStorage helpers for creating, reading, editing, deleting, and updating invoice status.
- `src/lib/invoice-validation.ts` - shared validation logic for invoice forms.

### Types

- `src/types/index.ts` - shared TypeScript interfaces for invoices and form values.

### Hooks

- `src/hooks/use-media-query.ts` - responsive utility used across mobile and desktop layouts.

## Data Storage

The app uses two localStorage keys:

- `invoices` stores the simplified list used on the invoice index page.
- `full-invoices` stores the full invoice record used by the details page and edit flow.

This split keeps the list view lightweight while preserving the full form data for editing and inspection.

## Validation Rules

- Final invoice submission requires all required fields to be filled.
- Final submission also requires at least one complete item row.
- Draft saving skips validation so the user can come back and finish later.

## Notes

- The project uses the League Spartan Google font in the root layout.
- Theme preference is persisted in localStorage and applied on load.
- The code is designed for browser-only persistence, so invoice data is tied to the current device and browser.

## Deployment

You can deploy this app to any platform that supports Next.js, including Vercel.

1. Run `npm run build`.
2. Deploy the generated application.
3. Start it with `npm start` in a production environment.

## License

No license file is currently included in this repository.
