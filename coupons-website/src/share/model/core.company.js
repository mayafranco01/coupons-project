export default class Company {
  
// initialized properties to prevent them from being undefined when I use them later in the form
    constructor(id, name, email, password, coupons) {
      this.id = id;
      this.name = name ?? '';
      this.email = email ?? '';
      this.password = password ?? '';
      this.coupons = coupons ?? [];
    }; 
  };