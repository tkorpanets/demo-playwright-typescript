import { expect } from '@playwright/test';
import { AppPage } from './base.page';
import { step } from '../utils/step-decorator';

export class Login extends AppPage {
  private logo = this.page.locator('.login_logo');
  private inputUsername = this.page.getByRole('textbox', { name: 'Username' });
  private inputPassword = this.page.getByRole('textbox', { name: 'Password' });
  private buttonLogin = this.page.getByRole('button', { name: 'Login' });
  private errorMessage = this.page.locator('[data-test="error"]');
  private errorClose = this.page.locator('[data-test="error-button"]');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      expect.soft(this.logo).toHaveText('Swag Labs'),
      expect.soft(this.inputUsername).toBeVisible(),
      expect.soft(this.inputPassword).toBeVisible(),
      expect.soft(this.buttonLogin).toBeVisible(),
    ]);
  }

  @step()
  async navigateToLoginPage(): Promise<void> {
    await this.page.goto('/');
  }

  @step()
  async login(username: string, password: string): Promise<void> {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogin.click();
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
  async expectPlaceholders(usernamePlaceholder: string, passwordPlaceholder: string): Promise<void> {
    await expect.soft(this.inputUsername).toHaveAttribute('placeholder', usernamePlaceholder);
    await expect.soft(this.inputPassword).toHaveAttribute('placeholder', passwordPlaceholder);
  }

  @step()
  async expectPasswordHidden(): Promise<void> {
    await expect.soft(this.inputPassword).toHaveAttribute('type', 'password');
  }
}
