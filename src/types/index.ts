export interface EmptyStateProps {
  text: string;
  description?: string;
}

export interface InvoiceCardProps {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "draft";
  routerId: () => void;
}

export type InvoiceStatus = "paid" | "pending" | "draft";

export interface Invoice {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "draft";
}

export interface InvoiceFormValues {
  billFrom: {
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  billTo: {
    name: string;
    email: string;
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  invoiceDate: string;
  paymentTerms: string;
  projectDescription: string;
}

export interface updateInvoiceFormValues {
  billFrom: {
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  billTo: {
    name: string;
    email: string;
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  invoiceDate: string;
  paymentTerms: string;
  projectDescription: string;
}
