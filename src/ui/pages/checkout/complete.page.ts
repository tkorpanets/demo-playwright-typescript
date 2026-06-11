import { expect } from '@playwright/test';
import { AppPage } from '../base.page';
import { step } from '../../utils/step-decorator';

export class Complete extends AppPage {
  private image = this.page.getByRole('img', { name: 'Pony Express' });
  private header = this.page.getByTestId('complete-header');
  private text = this.page.getByTestId('complete-text');
  private backHomeButton = this.page.getByRole('button', { name: 'Back Home' });

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      expect.soft(this.image).toBeVisible(),
      expect.soft(this.header).toBeVisible(),
      expect.soft(this.text).toBeVisible(),
      expect.soft(this.backHomeButton).toBeVisible(),
    ]);
  }

  @step()
  async backToHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
