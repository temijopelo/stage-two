import { InvoiceFormValues } from "@/types";

export type InvoiceFormIntent = "draft" | "final";

export interface InvoiceValidationResult {
  isValid: boolean;
  errors: string[];
}

const hasValue = (value: string) => value.trim().length > 0;

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

const isCompleteItem = (item: InvoiceFormValues["items"][number]) => {
  return hasValue(item.name) && item.quantity > 0 && item.price > 0;
};

const hasPartialItem = (item: InvoiceFormValues["items"][number]) => {
  return hasValue(item.name) || item.quantity > 0 || item.price > 0;
};

export const validateInvoiceForm = (
  values: InvoiceFormValues,
  intent: InvoiceFormIntent = "final",
): InvoiceValidationResult => {
  const errors: string[] = [];
  const completeItems = values.items.filter(isCompleteItem);
  const hasIncompleteItems = values.items.some(
    (item) => hasPartialItem(item) && !isCompleteItem(item),
  );

  if (intent === "final") {
    if (!hasValue(values.billFrom.streetAddress)) {
      errors.push("Bill from street address is required.");
    }
    if (!hasValue(values.billFrom.city)) {
      errors.push("Bill from city is required.");
    }
    if (!hasValue(values.billFrom.postCode)) {
      errors.push("Bill from post code is required.");
    }
    if (!hasValue(values.billFrom.country)) {
      errors.push("Bill from country is required.");
    }

    if (!hasValue(values.billTo.name)) {
      errors.push("Client name is required.");
    }
    if (!hasValue(values.billTo.email)) {
      errors.push("Client email is required.");
    } else if (!isValidEmail(values.billTo.email)) {
      errors.push("Client email must be a valid email address.");
    }
    if (!hasValue(values.billTo.streetAddress)) {
      errors.push("Client street address is required.");
    }
    if (!hasValue(values.billTo.city)) {
      errors.push("Client city is required.");
    }
    if (!hasValue(values.billTo.postCode)) {
      errors.push("Client post code is required.");
    }
    if (!hasValue(values.billTo.country)) {
      errors.push("Client country is required.");
    }

    if (!hasValue(values.invoiceDate)) {
      errors.push("Invoice date is required.");
    }
    if (!hasValue(values.paymentTerms)) {
      errors.push("Payment terms are required.");
    }
    if (!hasValue(values.projectDescription)) {
      errors.push("Project description is required.");
    }
  }

  if (completeItems.length === 0) {
    errors.push("Add at least one complete item.");
  }

  if (hasIncompleteItems) {
    errors.push("Complete or remove partially filled item rows.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
