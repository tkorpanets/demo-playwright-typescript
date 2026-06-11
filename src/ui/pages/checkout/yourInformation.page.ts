import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AppPage } from '../base.page';
import { step } from '../../utils/step-decorator';

export class YourInformation extends AppPage {
  private inputFirstName = this.page.getByTestId('firstName');
  private inputLastName = this.page.getByTestId('lastName');
  private inputPostalCode = this.page.getByTestId('postalCode');
  private cancelButton = this.page.getByTestId('cancel');
  private continueButton = this.page.getByTestId('continue');
  private errorMessage = this.page.getByTestId('error');
  private errorClose = this.page.getByTestId('error-button');

  @step()
  async expectLoaded() {
    await Promise.all([
      expect.soft(this.inputFirstName).toBeVisible(),
      expect.soft(this.inputLastName).toBeVisible(),
      expect.soft(this.inputPostalCode).toBeVisible(),
      expect.soft(this.cancelButton).toBeVisible(),
      expect.soft(this.continueButton).toBeVisible(),
    ]);
  }

  @step()
  async fillForm(data?: { firstName?: string; lastName?: string; postalCode?: string }) {
    const first = data?.firstName ?? faker.person.firstName();
    const last = data?.lastName ?? faker.person.lastName();
    const zip = data?.postalCode ?? faker.location.zipCode('#####');

    await this.inputFirstName.fill(first);
    await this.inputLastName.fill(last);
    await this.inputPostalCode.fill(zip);
  }

  @step()
  async submitForm() {
    await this.continueButton.click();
  }

  @step()
  async cancelForm() {
    await this.cancelButton.click();
  }

  @step()
  async expectErrorMessage(errorMessage: string): Promise<void> {
    await expect.soft(this.errorMessage).toHaveText(errorMessage);
  }

  @step()
  async closeErrorIfVisible(): Promise<void> {
    if (await this.errorClose.isVisible()) {
      await this.errorClose.click();
      await expect.soft(this.errorMessage).toBeHidden();
    }
  }

  @step()
  async expectPlaceholders(
    firstNamePlaceholder: string,
    lastNamePlaceholder: string,
    postalCodePlaceholder: string
  ): Promise<void> {
    await expect.soft(this.inputFirstName).toHaveAttribute('placeholder', firstNamePlaceholder);
    await expect.soft(this.inputLastName).toHaveAttribute('placeholder', lastNamePlaceholder);
    await expect.soft(this.inputPostalCode).toHaveAttribute('placeholder', postalCodePlaceholder);
  }
}
