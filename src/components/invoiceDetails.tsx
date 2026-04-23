import { useMediaQuery } from "@/hooks/use-media-query";

const InvoiceDetails = () => {
  const isMobile = useMediaQuery("(max-width: 425px)");
  const ItemTable = () => {
    return (
      <table className="w-full">
        <thead className="text-left text-muted">
          <tr className="">
            <th className="p-4 font-light">Item Name</th>
            <th className="p-4 text-right font-light">QTY.</th>
            <th className="p-4 text-right font-light">Price</th>
            <th className="p-4 text-right font-light">Total</th>
          </tr>
        </thead>

        <tbody className="text-left text-foreground rounded-2xl">
          <tr>
            <td className="p-4">
              <span className="font-bold">Banner Design</span>
            </td>
            <td className="p-4 text-right text-muted font-bold">1</td>
            <td className="p-4 text-right text-muted font-bold">£ 156.00</td>
            <td className="p-4 text-right font-bold">£ 156.00</td>
          </tr>

          <tr>
            <td className="p-4">
              <span className="font-bold">Banner Design</span>
            </td>
            <td className="p-4 text-right text-muted font-bold">1</td>
            <td className="p-4 text-right text-muted font-bold">£ 156.00</td>
            <td className="p-4 text-right font-bold">£ 156.00</td>
          </tr>
          <tr className="bg-navbar-primary text-white rounded-b-2xl">
            <td className="p-4 text-[13px] rounded-bl-2xl">Amount Due</td>
            <td></td>
            <td></td>
            <td className="p-4 text-right font-bold rounded-br-2xl col-span-1 text-[24px]">
              £ 156.00
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <aside className=" bg-card p-6 mt-6 rounded-lg flex flex-col gap-8 text-muted shadow-sm">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <h2>
            #<span className="text-foreground font-bold">XM9141 </span>
          </h2>
          <p>Graphic Design</p>
        </div>
        <div>
          <p>
            19 Union Terrace <br /> London <br /> E1 3EZ <br /> United
            Kingdom{" "}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-8 justify-between">
        <span className="flex-1 md:flex-1 flex flex-col justify-between ">
          <span className="flex flex-col gap-2">
            <span>Invoice Date</span>
            <span className="text-foreground font-bold">21 Aug 2021</span>
          </span>
          <span className="flex flex-col gap-2">
            <span>Payment Due</span>
            <span className="text-foreground font-bold">20 Aug 2021</span>
          </span>
        </span>
        <span className="flex-1 md:flex-1 flex flex-col gap-2">
          <span>Bill To</span>
          <span className="text-foreground font-bold">Alex Grim</span>
          <span>
            842 Wellington Street <br /> Toronto <br /> Ontario <br /> M5V 2H1{" "}
            <br /> Canada
          </span>
        </span>
        <span className="w-full md:flex-1 flex flex-col gap-2">
          <span>Sent To</span>
          <span className="text-foreground font-bold">alexgrim@mail.com</span>
        </span>
      </div>

      <div className="bg-secondary rounded-lg">
        {!isMobile ? (
          <ItemTable />
        ) : (
          <div>
            <span className="flex justify-between items-center p-4">
              <span className="flex flex-col">
                <span className="text-[15px] font-bold text-foreground">
                  Banner Design
                </span>
                <span>1 x £ 156.00</span>
              </span>
              <span className="text-[15px] font-bold text-foreground">
                £ 156.00
              </span>
            </span>
            <span className="flex justify-between items-center p-4">
              <span className="flex flex-col">
                <span className="text-[15px] font-bold text-foreground">
                  Banner Design
                </span>
                <span>1 x £ 156.00</span>
              </span>
              <span className="text-[15px] font-bold text-foreground">
                £ 156.00
              </span>
            </span>
            <span className="bg-navbar-primary rounded-b-lg text-white flex justify-between items-center p-4">
              <span className="flex flex-col">
                <span className="text-[13px]">Grand Total</span>
              </span>
              <span className="text-[24px] font-bold">£ 556.00</span>
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default InvoiceDetails;
