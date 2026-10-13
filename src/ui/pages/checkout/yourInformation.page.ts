import { expect } from '@playwright/test';
import { AppPage } from '../base.page';
import { step } from '../../utils/step-decorator';

export type CheckoutInformation = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class YourInformation extends AppPage {
  private inputFirstName = this.page.getByTestId('firstName');
  private inputLastName = this.page.getByTestId('lastName');
  private inputPostalCode = this.page.getByTestId('postalCode');
  private cancelButton = this.page.getByTestId('cancel');
  private continueButton = this.page.getByTestId('continue');
  private errorMessage = this.page.getByTestId('error');
  private errorClose = this.page.getByTestId('error-button');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      expect(this.inputFirstName).toBeVisible(),
      expect(this.inputLastName).toBeVisible(),
      expect(this.inputPostalCode).toBeVisible(),
      expect(this.cancelButton).toBeVisible(),
      expect(this.continueButton).toBeVisible(),
    ]);
  }

  @step()
  async fillForm(data: CheckoutInformation): Promise<void> {
    await this.inputFirstName.fill(data.firstName);
    await this.inputLastName.fill(data.lastName);
    await this.inputPostalCode.fill(data.postalCode);
  }

  @step()
  async submitForm(): Promise<void> {
    await this.continueButton.click();
  }

  @step()
  async cancelForm(): Promise<void> {
    await this.cancelButton.click();
  }

  @step()
  async expectErrorMessage(errorMessage: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(errorMessage);
  }

  @step()
  async closeErrorIfVisible(): Promise<void> {
    if (await this.errorClose.isVisible()) {
      await this.errorClose.click();
      await expect(this.errorMessage).toBeHidden();
    }
  }

  @step()
  async expectPlaceholders(
    firstNamePlaceholder: string,
    lastNamePlaceholder: string,
    postalCodePlaceholder: string
  ): Promise<void> {
    await expect(this.inputFirstName).toHaveAttribute('placeholder', firstNamePlaceholder);
    await expect(this.inputLastName).toHaveAttribute('placeholder', lastNamePlaceholder);
    await expect(this.inputPostalCode).toHaveAttribute('placeholder', postalCodePlaceholder);
  }
}
