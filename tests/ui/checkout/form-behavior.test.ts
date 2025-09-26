import { faker } from '@faker-js/faker';
import { checkoutFixture } from '../fixtures/ui.fixture';

type InfoData = { firstName?: string; lastName?: string; postalCode?: string };

const cases: ReadonlyArray<{
  name: string;
  data: InfoData;
  expectedError: string;
}> = [
  {
    name: 'Submit with all fields empty',
    data: { firstName: '', lastName: '', postalCode: '' },
    expectedError: 'Error: First Name is required',
  },
  {
    name: 'Submit without Last Name',
    data: { firstName: faker.person.firstName(), lastName: '', postalCode: faker.location.zipCode('#####') },
    expectedError: 'Error: Last Name is required',
  },
  {
    name: 'Submit without First Name',
    data: { firstName: '', lastName: faker.person.lastName(), postalCode: faker.location.zipCode('#####') },
    expectedError: 'Error: First Name is required',
  },
  {
    name: 'Submit without Postal Code',
    data: { firstName: faker.person.firstName(), lastName: faker.person.lastName(), postalCode: '' },
    expectedError: 'Error: Postal Code is required',
  },
] as const;

for (const { name, data, expectedError } of cases) {
  checkoutFixture(name, { tag: ['@checkout'] }, async ({ app: { yourInformation } }) => {
    await yourInformation.expectLoaded();
    await yourInformation.closeErrorIfVisible();
    await yourInformation.fillForm(data);
    await yourInformation.submitForm();
    await yourInformation.expectErrorMessage(expectedError);
  });
}

checkoutFixture(
  'Your Information: placeholders are correct',
  { tag: ['@checkout'] },
  async ({ app: { yourInformation } }) => {
    await yourInformation.expectLoaded();
    await yourInformation.expectPlaceholders('First Name', 'Last Name', 'Zip/Postal Code');
  }
);

const cancelData = [{ name: 'Cancel from empty form' }, { name: 'Cancel after filling form with faker data' }] as const;

for (const { name } of cancelData) {
  checkoutFixture(name, { tag: ['@checkout'] }, async ({ app: { yourInformation, cart } }) => {
    await yourInformation.expectLoaded();
    if (name.includes('faker')) {
      await yourInformation.fillForm();
    }
    await yourInformation.cancelForm();
    await cart.expectLoaded();
  });
}
