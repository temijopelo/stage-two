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
}

export interface Invoice {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "draft";
}
