const { test, expect } = require('@playwright/test');

test('Add Todo Item', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    await page.getByPlaceholder('What needs to be done?').click();

    await page.getByPlaceholder('What needs to be done?').fill('Buy Groceries');

    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByRole('link', { name: 'Active' }).click();
 
    await expect(page.getByText('Buy Groceries')).toHaveCount(1);
});

test('Complete Todo Item', async ({ page }) => {

  await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/');

  await page.getByPlaceholder('What needs to be done?').click();

  await page.getByPlaceholder('What needs to be done?').fill('Buy Groceries');

  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await page.locator('div').filter({ hasText: 'Buy Groceries' }).getByRole('checkbox').check();

  await page.getByRole('link', { name: 'Completed' }).click();

  await expect(page.getByText('Buy Groceries')).toHaveCount(1);

  await expect(page.getByText('Clear completed')).toHaveCount(1);
}); 

test('Delete Todo Item', async ({ page }) => {

  await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

  await page.getByPlaceholder('What needs to be done?').click();

  await page.getByPlaceholder('What needs to be done?').fill('Buy Groceries');

  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await page.getByText('Buy Groceries').hover();

  await page.getByRole('button', { class: 'destroy' }).click();

  await expect(page.getByText('Buy Groceries')).toHaveCount(0);
});

test('Update Todo Item', async ({ page }) => {

  await page.goto('https://todomvc.com/examples/javascript-es6/dist/');
  
  await page.getByPlaceholder('What needs to be done?').click();

  await page.getByPlaceholder('What needs to be done?').fill('Buy Milk');
  
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  
  await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
  
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  
  await page.getByText('Buy Bread').dblclick();
  
  await page.getByRole('main').getByRole('textbox').fill('Buy Rice');
  
  await page.getByRole('main').getByRole('textbox').press('Enter');

  await expect(page.getByText('Buy Rice')).toHaveCount(1); 
  
  await expect(page.getByText('Buy Bread')).toHaveCount(0); 
})
