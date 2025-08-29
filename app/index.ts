import { BasePage } from './base.page';
import { Cart } from './pages/cart.page';
import { Inventory } from './pages/inventory.page';
import { Login } from './pages/login.page';
import { Header } from './pages/header';
import { ProductDetails } from './pages/productDetails.page';
import { YourInformation } from './pages/checkout/yourInformation.page';

export class Application extends BasePage {
  //Only pages and components extend through page

  //Example of eager initialization:
  // public cart = new Cart(this.page);

  /* Getters provide lazy initialization: 
   page objects are instantiated only when accessed. */

  get cart() {
    return new Cart(this.page);
  }
  get header() {
    return new Header(this.page);
  }
  get inventory() {
    return new Inventory(this.page);
  }
  get login() {
    return new Login(this.page);
  }

  get productDetails() {
    return new ProductDetails(this.page);
  }

  get yourInformation() {
    return new YourInformation(this.page);
  }
}
