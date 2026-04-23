import { Invoice } from "@/types";

export type InvoiceStatus = "paid" | "pending" | "draft";

const INVOICES_KEY = "invoices";

const DEFAULT_INVOICES: Invoice[] = [
  {
    id: "XM9141",
    name: "Graphic Design",
    amount: 556.0,
    dueDate: "19 Aug 2021",
    status: "paid",
  },
  {
    id: "RG0314",
    name: "Website Redesign",
    amount: 14002.33,
    dueDate: "20 Sep 2021",
    status: "pending",
  },
  {
    id: "RG0314",
    name: "Website Redesign",
    amount: 14002.33,
    dueDate: "20 Sep 2021",
    status: "draft",
  },
  {
    id: "RG0314",
    name: "Website Redesign",
    amount: 14002.33,
    dueDate: "20 Sep 2021",
    status: "pending",
  },
];

const hasWindow = () => typeof window !== "undefined";

export const formatDisplayDate = (dateValue: string) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const getInvoices = (): Invoice[] => {
  if (!hasWindow()) return DEFAULT_INVOICES;

  const stored = localStorage.getItem(INVOICES_KEY);
  if (!stored) {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(DEFAULT_INVOICES));
    return DEFAULT_INVOICES;
  }

  try {
    const parsed = JSON.parse(stored) as Invoice[];
    return Array.isArray(parsed) ? parsed : DEFAULT_INVOICES;
  } catch {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(DEFAULT_INVOICES));
    return DEFAULT_INVOICES;
  }
};

export const saveInvoices = (invoices: Invoice[]) => {
  if (!hasWindow()) return;
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
};

const generateInvoiceId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letters = `${chars[Math.floor(Math.random() * chars.length)]}${chars[Math.floor(Math.random() * chars.length)]}`;
  const numbers = String(Math.floor(1000 + Math.random() * 9000));
  return `${letters}${numbers}`;
};

export const createInvoice = (
  invoice: Omit<Invoice, "id" | "status">,
  status: InvoiceStatus,
) => {
  const nextInvoice: Invoice = {
    id: generateInvoiceId(),
    name: invoice.name,
    amount: Number(invoice.amount) || 0,
    dueDate: formatDisplayDate(invoice.dueDate),
    status,
  };

  const invoices = getInvoices();
  const updatedInvoices = [nextInvoice, ...invoices];
  saveInvoices(updatedInvoices);
  return nextInvoice;
};

export const updateInvoice = (
  invoiceId: string,
  updatedData: Partial<Omit<Invoice, "id">>,
) => {
  const invoices = getInvoices();
  const updatedInvoices = invoices.map((invoice) => {
    if (invoice.id !== invoiceId) return invoice;

    const dueDate = updatedData.dueDate
      ? formatDisplayDate(updatedData.dueDate)
      : invoice.dueDate;

    return {
      ...invoice,
      ...updatedData,
      amount:
        updatedData.amount !== undefined
          ? Number(updatedData.amount)
          : invoice.amount,
      dueDate,
    };
  });

  saveInvoices(updatedInvoices);
  return updatedInvoices.find((invoice) => invoice.id === invoiceId) || null;
};

export const deleteInvoice = (invoiceId: string) => {
  const invoices = getInvoices();
  const updatedInvoices = invoices.filter(
    (invoice) => invoice.id !== invoiceId,
  );
  saveInvoices(updatedInvoices);
};

export const markInvoiceAsPaid = (invoiceId: string) => {
  return updateInvoice(invoiceId, { status: "paid" });
};

export const getInvoiceById = (invoiceId: string) => {
  const invoices = getInvoices();
  return invoices.find((invoice) => invoice.id === invoiceId) || null;
};
