export const MoneyFormat = (amount) => {
    if (typeof amount === "number") {
      const moneyValue = amount.toLocaleString("en-LK", {
        style: "currency",
        currency: "LKR",
      });
      return moneyValue;
    } else {
      amount = "Invalid number";
    }
  };

 export const DateFormat = (date) => {

    return new Date(date).toLocaleDateString()
 } 