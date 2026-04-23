import ViewInvoiceContent from "@/components/invoiceDetail";
import { Suspense } from "react";

const ViewInvoice = () => {
  return (
    <Suspense
      fallback={
        <section className="flex items-center justify-center min-h-[50vh] text-muted">
          Loading invoice details...
        </section>
      }
    >
      <ViewInvoiceContent />
    </Suspense>
  );
};

export default ViewInvoice;
