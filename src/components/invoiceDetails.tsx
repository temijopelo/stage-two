import React from "react";

const InvoiceDetails = () => {
  return (
    <aside>
      <div>
        <h2>#XM9141</h2>
        <p>Graphic Design</p>
      </div>
      <div>
        <p>
          19 Union Terrace <br /> London <br /> E1 3EZ <br /> United
          Kingdom{" "}
        </p>
      </div>
      <div>
        <span>
          <span>
            <span>Invoice Date</span>
            <span>21 Aug 2021</span>
          </span>
          <span>
            <span>Payment Due</span>
            <span>20 Aug 2021</span>
          </span>
        </span>
        <span>
          <span>Bill To</span>
          <span>Alex Grim</span>
          <span>
            842 Wellington Street <br /> Toronto <br /> Ontario <br /> M5V 2H1{" "}
            <br /> Canada
          </span>
        </span>
      </div>
      <div>
        <span>
          <span>Sent To</span>
          <span>alexgrim@mail.com</span>
        </span>
      </div>
    </aside>
  );
};

export default InvoiceDetails;
