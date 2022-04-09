export default class Coupon {
  
  // initialized properties to prevent them from being undefined when I use them later in the form
    constructor(id, title, company, category, description, startDate, endDate, amount, price, image) {
      this.id = id;
      this.title = title ?? '';
      this.company = company;
      this.category = category;
      this.description = description ?? '';
      this.startDate = startDate ?? '';
      this.endDate = endDate ?? '';
      this.amount = amount ?? '';
      this.price = price ?? '';
      this.image = image;
    }; 
  };