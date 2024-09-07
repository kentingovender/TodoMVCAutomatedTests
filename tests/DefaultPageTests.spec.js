const { test, expect } = require('@playwright/test');

test('When Website URL Launched Then Correct Site Title and Heading Displayed', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    //Confirming the Title and heading of the page.
    await expect(page).toHaveURL('https://todomvc.com/examples/javascript-es6/dist/');
    await expect(page).toHaveTitle('TodoMVC: JavaScript Es6 Webpack');
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
})

test('Textbox is visible and enabled on page load', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');
    
    const todoInput = page.getByPlaceholder('What needs to be done?');
    
    await expect(todoInput).toBeVisible();
    await expect(todoInput).toBeEnabled();
});

test('Given Webpage loaded When page loads Then subText is displayed correctly', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');
    
    const subText1 = page.getByText('Double-click to edit a todo');
    const subText2 = page.getByText('Created by the TodoMVC Team');
    const subText3 = page.getByText('Part of TodoMVC');

    await expect(subText1).toBeVisible();
    await expect(subText2).toBeVisible();
    await expect(subText3).toBeVisible();
});

test('Given Webpage loaded When click on TodoMVC hyperlink Then URL launched', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');
 
    await page.getByRole('link', { name: 'TodoMVC' }).click();

    await expect(page).toHaveTitle('TodoMVC');
    await expect(page).toHaveURL('https://todomvc.com/');
});

test('Given Website Loaded When Normal Text Entered Then Todo Added', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    await page.getByPlaceholder('What needs to be done?').click();

    await page.getByPlaceholder('What needs to be done?').fill('Buy Groceries');

    await page.getByPlaceholder('What needs to be done?').press('Enter');
 
    await expect(page.getByText('Buy Groceries')).toHaveCount(1);
})

test('Given Website Loaded When 100 todos added Then Todos displayed in list', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todo = 'Buy Bread';

    for (let i = 0; i < 100; i++) {
        await todoInput.fill(todo);
        await todoInput.press('Enter');
    }

    await expect(page.locator('.todo-list li')).toHaveCount(100);
})

test('Given Website Loaded When Large Amount Text Entered Then Todo Added', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    await page.getByPlaceholder('What needs to be done?').click();

    await page.getByPlaceholder('What needs to be done?').fill('a'.repeat(500));
    await page.getByPlaceholder('What needs to be done?').press('Enter');
 
    await expect(page.getByText('a'.repeat(500))).toHaveCount(1); 
})

test('Given Website Loaded When Characters And Numbers Entered Then Todo Added', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    await page.getByPlaceholder('What needs to be done?').click();

    await page.getByPlaceholder('What needs to be done?').fill('!@#$%12345');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
 
    await expect(page.getByText('!@#$%12345')).toHaveCount(1); 
})

test('Given Website Loaded When Blank Space Entered Then Todo Not Added', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    await page.getByPlaceholder('What needs to be done?').click();

    await page.getByPlaceholder('What needs to be done?').fill(' ');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(0);
})

test('Given Website Loaded When Text Entered And Click Outside Textbox Then Todo Not Added', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByRole('heading', { name: 'todos' }).click();

    await expect(page.locator('.todo-list li')).toHaveCount(0);
})

test('Given Todos Added When Mark All As Complete Clicked Then All Items Marked Completed', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Milk');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Rice');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText('Mark all as complete').click();

    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.locator('div').filter({ hasText: 'Buy Rice' }).getByRole('checkbox')).toBeChecked();
    await expect(page.locator('div').filter({ hasText: 'Buy Milk' }).getByRole('checkbox')).toBeChecked();
    await expect(page.locator('div').filter({ hasText: 'Buy Bread' }).getByRole('checkbox')).toBeChecked();
})

test('Given Todos Added And Marked Completed When Mark All As Complete Clicked Then All Items Active', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Milk');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Rice');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText('Mark all as complete').click();

    await page.getByText('Mark all as complete').click();

    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.locator('div').filter({ hasText: 'Buy Rice' }).getByRole('checkbox')).toBeChecked(false);
    await expect(page.locator('div').filter({ hasText: 'Buy Milk' }).getByRole('checkbox')).toBeChecked(false);
    await expect(page.locator('div').filter({ hasText: 'Buy Bread' }).getByRole('checkbox')).toBeChecked(false);
})

test('Given 100 todos active When 50 marked completed Then list Displays update', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    const todoInput = page.getByPlaceholder('What needs to be done?');

    for (let i = 0; i < 50; i++) {
        await todoInput.fill('Buy Bread');
        await todoInput.press('Enter');
        await todoInput.fill('Buy Milk');
        await todoInput.press('Enter');
    }

    for (let j = 0; j < 50; j++) {
        await page.getByRole('checkbox').nth(j+1).check();
    }

    await expect(page.locator('.todo-list li')).toHaveCount(100);
    for (let j = 0; j < 50; j++) {
        await expect(page.getByRole('checkbox').nth(j+1)).toBeChecked();
    }  
})

test('Given 100 todos active When 100 marked completed Then list Displays update', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    const todoInput = page.getByPlaceholder('What needs to be done?');

    for (let i = 0; i < 50; i++) {
        await todoInput.fill('Buy Bread');
        await todoInput.press('Enter');
        await todoInput.fill('Buy Milk');
        await todoInput.press('Enter');
    }

    for (let j = 0; j < 100; j++) {
        await page.getByRole('checkbox').nth(j+1).check();
    }

    await expect(page.locator('.todo-list li')).toHaveCount(100);
    for (let j = 0; j < 100; j++) {
        await expect(page.getByRole('checkbox').nth(j+1)).toBeChecked();
    }  
})

test('Given todo active When double clicked Then able to update', async ({ page }) => {

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

test('Given todos Added and Active When page loaded Then X not visible by default', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');

    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Milk');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await expect(page.getByRole('button', { name: '×' })).toBeHidden();
})

test('Given todos Added When Hovered over todo item Then X appears', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');
    
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText('Buy Bread').hover();

    await expect(page.getByRole('button', { name: '×' })).toBeVisible();
})

test('Given todo Added when X clicked to delete items Then no todos present', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    
    await page.getByText('Buy Bread').hover();
    await page.getByRole('button', { name: '×' }).click();

    await expect(page.locator('.todo-list li')).toHaveCount(0);
})