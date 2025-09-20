import { BasePage } from './base.page';
import { Cart } from './pages/cart.page';
import { Inventory } from './pages/inventory.page';
import { Login } from './pages/login.page';
import { Header } from './pages/header';
import { ProductDetails } from './pages/productDetails.page';
import { YourInformation } from './pages/checkout/yourInformation.page';
import { Overview } from './pages/checkout/overview.page';
import { Complete } from './pages/checkout/complete.page';

export class Application extends BasePage {
  private cartInstance: Cart | undefined;
  private headerInstance: Header | undefined;
  private inventoryInstance: Inventory | undefined;
  private loginInstance: Login | undefined;
  private productDetailsInstance: ProductDetails | undefined;
  private yourInformationInstance: YourInformation | undefined;
  private overviewInstance: Overview | undefined;
  private completeInstance: Complete | undefined;

  get cart(): Cart {
    if (!this.cartInstance) {
      this.cartInstance = new Cart(this.page);
    }
    return this.cartInstance;
  }
  
  get header(): Header {
    if (!this.headerInstance) {
      this.headerInstance = new Header(this.page);
    }
    return this.headerInstance;
  }
  
  get inventory(): Inventory {
    if (!this.inventoryInstance) {
      this.inventoryInstance = new Inventory(this.page);
    }
    return this.inventoryInstance;
  }
  
  get login(): Login {
    if (!this.loginInstance) {
      this.loginInstance = new Login(this.page);
    }
    return this.loginInstance;
  }

  get productDetails(): ProductDetails {
    if (!this.productDetailsInstance) {
      this.productDetailsInstance = new ProductDetails(this.page);
    }
    return this.productDetailsInstance;
  }

  get yourInformation(): YourInformation {
    if (!this.yourInformationInstance) {
      this.yourInformationInstance = new YourInformation(this.page);
    }
    return this.yourInformationInstance;
  }

  get overview(): Overview {
    if (!this.overviewInstance) {
      this.overviewInstance = new Overview(this.page);
    }
    return this.overviewInstance;
  }

  get complete(): Complete {
    if (!this.completeInstance) {
      this.completeInstance = new Complete(this.page);
    }
    return this.completeInstance;
  }
}