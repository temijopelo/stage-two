import { Invoice, InvoiceFormValues } from "@/types";

export type InvoiceStatus = "paid" | "pending" | "draft";

export interface StoredInvoice extends Invoice {
  billFrom: InvoiceFormValues["billFrom"];
  billTo: InvoiceFormValues["billTo"];
  items: InvoiceFormValues["items"];
  invoiceDate: string;
  paymentTerms: string;
  projectDescription: string;
}

const INVOICES_KEY = "invoices";
const FULL_INVOICES_KEY = "full-invoices";

const DEFAULT_INVOICES: Invoice[] = [
  // {
  //   id: "XM9141",
  //   name: "Graphic Design",
  //   amount: 556.0,
  //   dueDate: "19 Aug 2021",
  //   status: "paid",
  // },
  // {
  //   id: "RG0314",
  //   name: "Website Redesign",
  //   amount: 14002.33,
  //   dueDate: "20 Sep 2021",
  //   status: "pending",
  // },
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

const calculateInvoiceTotal = (
  items: { quantity: number; price: number }[],
) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export const getFullInvoices = (): StoredInvoice[] => {
  if (!hasWindow()) return [];

  const stored = localStorage.getItem(FULL_INVOICES_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as StoredInvoice[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveFullInvoices = (invoices: StoredInvoice[]) => {
  if (!hasWindow()) return;
  localStorage.setItem(FULL_INVOICES_KEY, JSON.stringify(invoices));
};

export const createInvoice = (
  invoiceData: InvoiceFormValues,
  status: InvoiceStatus = "pending",
): StoredInvoice => {
  const id = generateInvoiceId();
  const amount = calculateInvoiceTotal(invoiceData.items);

  const newInvoice: StoredInvoice = {
    id,
    name: invoiceData.projectDescription,
    amount,
    dueDate: invoiceData.invoiceDate,
    status,
    billFrom: invoiceData.billFrom,
    billTo: invoiceData.billTo,
    items: invoiceData.items,
    invoiceDate: invoiceData.invoiceDate,
    paymentTerms: invoiceData.paymentTerms,
    projectDescription: invoiceData.projectDescription,
  };

  const fullInvoices = getFullInvoices();
  const simplifiedInvoices = getInvoices();

  fullInvoices.push(newInvoice);
  simplifiedInvoices.push({
    id,
    name: invoiceData.projectDescription,
    amount,
    dueDate: invoiceData.invoiceDate,
    status,
  });

  saveFullInvoices(fullInvoices);
  saveInvoices(simplifiedInvoices);

  return newInvoice;
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

export const deleteFullInvoice = (invoiceId: string) => {
  const fullInvoices = getFullInvoices();
  const updatedFullInvoices = fullInvoices.filter(
    (invoice) => invoice.id !== invoiceId,
  );
  saveFullInvoices(updatedFullInvoices);
};

export const updateInvoiceStatus = (
  invoiceId: string,
  status: InvoiceStatus,
) => {
  const updatedSimpleInvoice = updateInvoice(invoiceId, { status });

  const fullInvoices = getFullInvoices();
  const fullIndex = fullInvoices.findIndex(
    (invoice) => invoice.id === invoiceId,
  );
  if (fullIndex !== -1) {
    fullInvoices[fullIndex] = {
      ...fullInvoices[fullIndex],
      status,
    };
    saveFullInvoices(fullInvoices);
  }

  return updatedSimpleInvoice;
};

export const markInvoiceAsPaid = (invoiceId: string) => {
  return updateInvoiceStatus(invoiceId, "paid");
};

export const getInvoiceById = (invoiceId: string) => {
  const invoices = getInvoices();
  return invoices.find((invoice) => invoice.id === invoiceId) || null;
};

export const getFullInvoiceById = (invoiceId: string): StoredInvoice | null => {
  const fullInvoices = getFullInvoices();
  return fullInvoices.find((invoice) => invoice.id === invoiceId) || null;
};

export const saveEditedInvoice = (
  invoiceId: string,
  updatedData: Partial<InvoiceFormValues>,
) => {
  const updatedFullInvoice = updateFullInvoice(invoiceId, updatedData);

  if (updatedFullInvoice) {
    return updatedFullInvoice;
  }

  const currentInvoice = getInvoiceById(invoiceId);
  if (!currentInvoice) return null;

  const updatedSimpleInvoice = updateInvoice(invoiceId, {
    name: updatedData.projectDescription ?? currentInvoice.name,
    amount: updatedData.items
      ? calculateInvoiceTotal(updatedData.items)
      : currentInvoice.amount,
    dueDate: updatedData.invoiceDate ?? currentInvoice.dueDate,
  });

  return updatedSimpleInvoice;
};

export const updateFullInvoice = (
  invoiceId: string,
  updatedData: Partial<InvoiceFormValues>,
): StoredInvoice | null => {
  const fullInvoices = getFullInvoices();
  const invoiceIndex = fullInvoices.findIndex((inv) => inv.id === invoiceId);

  if (invoiceIndex === -1) return null;

  const existingInvoice = fullInvoices[invoiceIndex];
  const amount = updatedData.items
    ? calculateInvoiceTotal(updatedData.items)
    : existingInvoice.amount;

  const updatedInvoice: StoredInvoice = {
    ...existingInvoice,
    billFrom: updatedData.billFrom || existingInvoice.billFrom,
    billTo: updatedData.billTo || existingInvoice.billTo,
    items: updatedData.items || existingInvoice.items,
    invoiceDate: updatedData.invoiceDate || existingInvoice.invoiceDate,
    paymentTerms: updatedData.paymentTerms || existingInvoice.paymentTerms,
    projectDescription:
      updatedData.projectDescription || existingInvoice.projectDescription,
    name: updatedData.projectDescription || existingInvoice.name,
    dueDate: updatedData.invoiceDate || existingInvoice.dueDate,
    amount,
  };

  fullInvoices[invoiceIndex] = updatedInvoice;
  saveFullInvoices(fullInvoices);

  // Also update the simplified list
  const invoices = getInvoices();
  const simpleIndex = invoices.findIndex((inv) => inv.id === invoiceId);
  if (simpleIndex !== -1) {
    invoices[simpleIndex] = {
      id: updatedInvoice.id,
      name: updatedInvoice.name,
      amount: updatedInvoice.amount,
      dueDate: updatedInvoice.dueDate,
      status: updatedInvoice.status,
    };
    saveInvoices(invoices);
  }

  return updatedInvoice;
};
