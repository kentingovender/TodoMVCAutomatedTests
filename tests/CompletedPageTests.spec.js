const { test, expect } = require('@playwright/test');

test('When Website Completed page URL Launched directly And no todo added Then Correct Site Title and Heading Displayed', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    //Confirming the Title and heading of the page.
    await expect(page).toHaveURL('https://todomvc.com/examples/javascript-es6/dist/#/completed');
    await expect(page).toHaveTitle('TodoMVC: JavaScript Es6 Webpack');
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
})

test('Given Website URL Launched And todo added When Completed page navigated Then Correct Site Title and Heading Displayed', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Groceries');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByRole('link', { name: 'Completed' }).click();

    //Confirming the Title and heading of the page.
    await expect(page).toHaveURL('https://todomvc.com/examples/javascript-es6/dist/#/completed');
    await expect(page).toHaveTitle('TodoMVC: JavaScript Es6 Webpack');
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
})

test('Textbox is visible and enabled on Completed page load', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    const todoInput = page.getByPlaceholder('What needs to be done?');
    
    await expect(todoInput).toBeVisible();
    await expect(todoInput).toBeEnabled();
});

test('Given Completed Webpage loaded When page loads Then subText is displayed correctly', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');
    
    const subText1 = page.getByText('Double-click to edit a todo');
    const subText2 = page.getByText('Created by the TodoMVC Team');
    const subText3 = page.getByText('Part of TodoMVC');

    await expect(subText1).toBeVisible();
    await expect(subText2).toBeVisible();
    await expect(subText3).toBeVisible();
});

test('Given Webpage loaded When click on TodoMVC hyperlink Then URL launched', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');
 
    await page.getByRole('link', { name: 'TodoMVC' }).click();

    await expect(page).toHaveTitle('TodoMVC');
    await expect(page).toHaveURL('https://todomvc.com/');
});

test('Given Website Loaded When todo added Then not displayed in completed list', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    await page.getByPlaceholder('What needs to be done?').click();

    await page.getByPlaceholder('What needs to be done?').fill('Buy Groceries');

    await page.getByPlaceholder('What needs to be done?').press('Enter');
 
    await expect(page.getByText('Buy Groceries')).toHaveCount(0);
})

test('Given Website Loaded When 100 todos added Then 0 Todos displayed in list', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    const todoInput = page.getByPlaceholder('What needs to be done?');
    const todo = 'Buy Bread';

    for (let i = 0; i < 100; i++) {
        await todoInput.fill(todo);
        await todoInput.press('Enter');
    }

    await expect(page.locator('.todo-list li')).toHaveCount(0);
})

test('Given Website Loaded When Large Amount Text Entered Then Todo Added But not displayed in list', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    await page.getByPlaceholder('What needs to be done?').click();

    await page.getByPlaceholder('What needs to be done?').fill('a'.repeat(500));
    await page.getByPlaceholder('What needs to be done?').press('Enter');
 
    await expect(page.getByText('a'.repeat(500))).toHaveCount(0); 
})

test('Given Website Loaded When Characters And Numbers Entered Then Todo Added but not displayed on list', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    await page.getByPlaceholder('What needs to be done?').click();

    await page.getByPlaceholder('What needs to be done?').fill('!@#$%12345');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
 
    await expect(page.getByText('!@#$%12345')).toHaveCount(0); 
})

test('Given Website Loaded When Blank Space Entered Then Todo Not Added', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    await page.getByPlaceholder('What needs to be done?').click();

    await page.getByPlaceholder('What needs to be done?').fill(' ');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(0);
})

test('Given Todos Added When Mark All As Complete Clicked Then All todos visible in Completed page', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Milk');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Rice');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText('Mark all as complete').click();

    await expect(page.locator('.todo-list li')).toHaveCount(3);
})

test('Given Todos Added And Marked Completed When Mark All As Complete Clicked Then no todos in Completed list', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Milk');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Rice');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText('Mark all as complete').click();

    await page.getByText('Mark all as complete').click();

    await expect(page.locator('.todo-list li')).toHaveCount(0);
})

test('Given 100 todos active When 50 marked completed Then list Displays update', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    const todoInput = page.getByPlaceholder('What needs to be done?');

    for (let i = 0; i < 50; i++) {
        await todoInput.fill('Buy Bread');
        await todoInput.press('Enter');
        await todoInput.fill('Buy Milk');
        await todoInput.press('Enter');
    }
    await page.getByText('Mark all as complete').click();

    for (let j = 0; j < 50; j++) {
        await page.getByRole('checkbox').nth(j+1).click();
    }

    await expect(page.locator('.todo-list li')).toHaveCount(50);
    for (let j = 0; j < 50; j++) {
        await expect(page.getByRole('checkbox').nth(j+1)).toBeChecked();
    }  
})

test('Given 100 todos active When 100 marked completed Then list has 100 items', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    const todoInput = page.getByPlaceholder('What needs to be done?');

    for (let i = 0; i < 50; i++) {
        await todoInput.fill('Buy Bread');
        await todoInput.press('Enter');
        await todoInput.fill('Buy Milk');
        await todoInput.press('Enter');
    }

    await page.getByText('Mark all as complete').click();

    await expect(page.locator('.todo-list li')).toHaveCount(100); 
})

test('Given todo Completed When double clicked Then able to update', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Milk');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText('Mark all as complete').click();

    await page.getByText('Buy Bread').dblclick();
    await page.getByRole('main').getByRole('textbox').fill('Buy Rice');
    await page.getByRole('main').getByRole('textbox').press('Enter');

    await expect(page.getByText('Buy Rice')).toHaveCount(1); 
    await expect(page.getByText('Buy Bread')).toHaveCount(0); 
})

test('Given todos Added and Completed When page loaded Then X not visible by default', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Milk');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText('Mark all as complete').click();

    await expect(page.getByRole('button', { name: '×' })).toBeHidden();
})

test('Given todos Added When Hovered over todo item Then X appears', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText('Mark all as complete').click();

    await page.getByText('Buy Bread').hover();

    await expect(page.getByRole('button', { name: '×' })).toBeVisible();
})

test('Given todo Added when X clicked to delete items Then no todos present', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText('Mark all as complete').click();

    await page.getByText('Buy Bread').hover();
    await page.getByRole('button', { name: '×' }).click();

    await expect(page.locator('.todo-list li')).toHaveCount(0);
})

test('Given Todos Added And Marked Completed When Mark all as completed arrow Clicked Then All Items Active and no items displayed', async ({ page }) => {

    await page.goto('https://todomvc.com/examples/javascript-es6/dist/#/completed');

    //Add the todos and mark them completed
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy Bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Milk');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy Rice');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText('Mark all as complete').click();

    //Mark the completed todos back active
    await page.getByText('Mark all as complete').click();

    //confirm change
    await expect(page.locator('.todo-list li')).toHaveCount(0);
})