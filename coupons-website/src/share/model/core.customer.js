export default class Customer {
  
// initialized properties to prevent them from being undefined when I use them later in the form
  constructor(id, firstName, lastName, email, password, coupons) {
    this.id = id;
    this.firstName = firstName ?? '';
    this.lastName = lastName ?? '';
    this.email = email ?? '';
    this.password = password ?? '';
    this.coupons = coupons ?? [];
  };
};