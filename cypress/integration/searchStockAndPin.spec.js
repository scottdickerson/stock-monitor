describe("searching Stocks", () => {
  before(() => {
    cy.visit("http://127.0.0.1:3000");
    cy.intercept("**SYMBOL_SEARCH**", {
      statusCode: 200,
      body: {
        bestMatches: [
          {
            "1. symbol": "IBM",
            "2. name": "International Business Machines Corp",
            "3. type": "Equity",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-04",
            "8. currency": "USD",
            "9. matchScore": "1.0000",
          },
          {
            "1. symbol": "IBMJ",
            "2. name": "iShares iBonds Dec 2021 Term Muni Bond ETF",
            "3. type": "ETF",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-04",
            "8. currency": "USD",
            "9. matchScore": "0.8571",
          },
        ],
      },
    });

    cy.intercept("**GLOBAL_QUOTE**", {
      statusCode: 200,
      body: {
        "Global Quote": {
          "01. symbol": "IBM",
          "02. open": "130.0000",
          "03. high": "130.9600",
          "04. low": "129.5200",
          "05. price": "130.6300",
          "06. volume": "3649044",
          "07. latest trading day": "2021-12-23",
          "08. previous close": "129.7500",
          "09. change": "0.8800",
          "10. change percent": "0.6782%",
        },
      },
    });
    cy.intercept("**EARNINGS**", {
      statusCode: 200,
      body: {
        symbol: "IBM",
        annualEarnings: [
          {
            fiscalDateEnding: "2021-09-30",
            reportedEPS: "6.62",
          },
        ],
      },
    });
    cy.intercept("**CASH_FLOW**", {
      statusCode: 200,
      body: {
        symbol: "IBM",
        annualReports: [
          {
            fiscalDateEnding: "2021-09-30",
            operatingCashflow: "10000",
          },
        ],
      },
    });
  });
  it("stock valid search", () => {
    const comboboxInput = cy.findByRole("combobox");
    comboboxInput.type("IBM");
    expect(cy.findByRole("option", { name: "IBMJ" })).to.exist;
  });
});
describe("pinning Stocks", () => {
  before(() => {
    cy.visit("http://127.0.0.1:3000");
  });
  it("stock pinning loads data", () => {
    const comboboxInput = cy.findByRole("combobox");
    comboboxInput.type("IBM");
    expect(cy.findByRole("option", { name: "IBMJ" })).to.exist;
    cy.findByRole("option", { name: "IBM" })
      .within(() => cy.findByText("IBM"))
      .click();
    expect(cy.findByText("International Business Machines Corp")).to.exist;
    expect(cy.findByText("High")).to.exist;
    expect(cy.findByText("Earnings Per Share")).to.exist;
  });
});
