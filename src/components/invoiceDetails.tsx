const InvoiceDetails = () => {
  return (
    <aside className=" bg-card p-6 mt-6 rounded-lg flex flex-col gap-8 text-muted shadow-sm">
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
      <div className="flex">
        <span className="flex-1 flex flex-col justify-between ">
          <span className="flex flex-col gap-2">
            <span>Invoice Date</span>
            <span className="text-foreground font-bold">21 Aug 2021</span>
          </span>
          <span className="flex flex-col gap-2">
            <span>Payment Due</span>
            <span className="text-foreground font-bold">20 Aug 2021</span>
          </span>
        </span>
        <span className="flex-1 flex flex-col gap-2">
          <span>Bill To</span>
          <span className="text-foreground font-bold">Alex Grim</span>
          <span>
            842 Wellington Street <br /> Toronto <br /> Ontario <br /> M5V 2H1{" "}
            <br /> Canada
          </span>
        </span>
      </div>
      <div>
        <span className="flex flex-col gap-2">
          <span>Sent To</span>
          <span className="text-foreground font-bold">alexgrim@mail.com</span>
        </span>
      </div>

      <div className="bg-secondary rounded-lg">
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
      </div>
    </aside>
  );
};

export default InvoiceDetails;
