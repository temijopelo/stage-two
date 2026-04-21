import { InvoiceCardProps } from "@/types";
import { GoDotFill } from "react-icons/go";

const InvoiceCard = ({
  id,
  name,
  amount,
  dueDate,
  status,
}: InvoiceCardProps) => {
  return (
    <div className="border rounded-lg p-4 bg-[#FFFFFF]">
      <span className="flex items-center justify-between">
        <p className="text-muted font-bold text-[15px]">
          #<span className="text-black">{id}</span>
        </p>
        <p className="text-[13px] text-[#858BB2]">{name}</p>
      </span>
      <span className="flex items-center justify-between mt-4">
        <span className=" flex flex-col gap-2">
          <p className="text-[13px] text-muted">Due {dueDate}</p>
          <p className="text-[15px] font-bold"> £ {amount.toFixed(2)}</p>
        </span>
        <span
          className={`${
            status === "paid"
              ? "bg-[#33D69F]/10 text-[#33D69F]"
              : status === "pending"
                ? "bg-[#FF9E0A]/10 text-[#FF9E0A]"
                : "bg-[#373B53]/10 text-[#373B53]"
          } p-3 space-x-1 w-[100px] rounded-md flex items-center justify-center`}
        >
          <span className="mb-1">
            <GoDotFill size={16} />
          </span>
          <span className="text-[15px] font-bold">
            {status === "paid"
              ? "Paid"
              : status === "pending"
                ? "Pending"
                : "Draft"}
          </span>
        </span>
      </span>
    </div>
  );
};

export default InvoiceCard;
