import { expect } from '@playwright/test';
import { step } from '../../utils/step-decorator';
import { AppPage } from '../base.page';
import { ShoppingCart } from './component/shoppingCart.component';
import { ProductSort } from './component/productSort.component';

export class Header extends AppPage {
  public shoppingCart = new ShoppingCart(this.page);
  public productSort = new ProductSort(this.page);

  private appLogo = this.page.locator('.app_logo');
  private title = this.page.locator('.title');
  private backToProductsButton = this.page.getByTestId('back-to-products');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([expect(this.appLogo).toHaveText('Swag Labs', { timeout: 30000 }), expect(this.title).toHaveText('Products', { timeout: 30000 })]);
  }

  @step()
  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
