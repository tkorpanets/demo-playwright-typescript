import { expect } from '@playwright/test';
import { AppPage } from '../base.page';
import { ProductDetails } from '../productDetails.page';
import { step } from '../../utils/step-decorator';

type PriceTotalParams = {
  itemTotal: number;
  taxRate: number;
  labels: {
    priceTotal: string;
    itemTotal: string;
    tax: string;
    total: string;
  };
};

export class Overview extends AppPage {
  private cartQuantityLabel = this.page.getByTestId('cart-quantity-label');
  private cartDescLabel = this.page.getByTestId('cart-desc-label');
  private labelPaymentInfo = this.page.getByTestId('payment-info-label');
  private valuePaymentInfo = this.page.getByTestId('payment-info-value');
  private labelShippingInfo = this.page.getByTestId('shipping-info-label');
  private valueShippingInfo = this.page.getByTestId('shipping-info-value');
  private labelPriceTotal = this.page.getByTestId('total-info-label');
  private subtotalLabel = this.page.getByTestId('subtotal-label');
  private taxLabel = this.page.getByTestId('tax-label');
  private totalLabel = this.page.getByTestId('total-label');
  private cancelButton = this.page.getByTestId('cancel');
  private finishButton = this.page.getByTestId('finish');

  private productCard = (productName: string) => this.page.locator('div.cart_item').filter({ hasText: productName });
  private productName = (productName: string) => this.productCard(productName).locator('div.inventory_item_name');
  //   private price = (productName: string) => this.productCard(productName).locator('div.inventory_item_price');

  @step()
  async expectLoaded() {
    await Promise.all([
      expect.soft(this.cartQuantityLabel).toBeVisible(),
      expect.soft(this.cartDescLabel).toBeVisible(),
      expect.soft(this.labelPaymentInfo).toBeVisible(),
      expect.soft(this.labelShippingInfo).toBeVisible(),
      expect.soft(this.labelPriceTotal).toBeVisible(),
      expect.soft(this.totalLabel).toBeVisible(),
      expect.soft(this.subtotalLabel).toBeVisible(),
      expect.soft(this.taxLabel).toBeVisible(),
      expect.soft(this.totalLabel).toBeVisible(),
      expect.soft(this.cancelButton).toBeVisible(),
      expect.soft(this.finishButton).toBeVisible(),
    ]);
  }

  @step()
  async clickFinishButton() {
    await this.finishButton.click();
  }

  @step()
  async clickCancelButton() {
    await this.cancelButton.click();
  }

  @step()
  async expectedPaymentInfo(expectedLabelPayInfo: string, expectedValuePayInfo: string) {
    await expect.soft(this.labelPaymentInfo).toContainText(expectedLabelPayInfo);
    await expect.soft(this.valuePaymentInfo).toContainText(expectedValuePayInfo);
  }

  @step()
  async expectedShippingInfo(expectedLabelShipInfo: string, expectedValueShipInfo: string) {
    await expect.soft(this.labelShippingInfo).toContainText(expectedLabelShipInfo);
    await expect.soft(this.valueShippingInfo).toContainText(expectedValueShipInfo);
  }

  @step()
  async expectPriceTotal({ itemTotal, taxRate, labels }: PriceTotalParams) {
    await expect.soft(this.labelPriceTotal).toContainText(labels.priceTotal);
    await expect.soft(this.subtotalLabel).toContainText(labels.itemTotal);
    await expect.soft(this.subtotalLabel).toContainText(itemTotal.toFixed(2));
    const expectedTax = Number((itemTotal * taxRate).toFixed(2));
    await expect.soft(this.taxLabel).toContainText(labels.tax);
    await expect.soft(this.taxLabel).toContainText(expectedTax.toFixed(2));
    const expectedTotal = Number((itemTotal + expectedTax).toFixed(2));
    await expect.soft(this.totalLabel).toContainText(labels.total);
    await expect.soft(this.totalLabel).toContainText(expectedTotal.toFixed(2));
  }

  @step()
  async removeAllProducts(products: string[]) {
    const details = new ProductDetails(this.page);
    for (const product of products) {
      await this.productName(product).click();
      await details.clickRemoveButton();
      await this.page.goBack();
    }
  }
}
