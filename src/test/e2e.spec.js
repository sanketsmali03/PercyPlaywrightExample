const { expect, test} = require('@playwright/test');
const percySnapshot = require('@percy/playwright');


test.describe("End to End Tests", ()=>{
  test.setTimeout(80000); 
  test('End to End test', async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await percySnapshot(page, 'homePage');

    await page.click("#signin", { delay: 100 });
    await percySnapshot(page, 'SignInPage');
    await page.fill("#react-select-2-input", "fav_user");
    await page.press("#react-select-2-input", "Enter");
    await page.fill("#react-select-3-input", "testingisfun99");
    await new Promise(resolve => setTimeout(resolve, 2000));
    await percySnapshot(page, 'Added Creds');
    await page.press("#react-select-3-input", "Enter");
    await page.click("#login-btn");
    await new Promise(resolve => setTimeout(resolve, 2000))
    await percySnapshot(page, 'LoggedIn Page');
    const username = await page.textContent('.username');
    expect(username).toBe('fav_user')

    await page.click('#\\31 > .shelf-item__buy-btn');
    await page.click('div.float-cart__close-btn');
    await page.click('#\\32 > .shelf-item__buy-btn');
    await page.click('.buy-btn');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await percySnapshot(page, 'Buy');


    await page.fill("#firstNameInput", "first", { timeout: 15000 }); 
    await page.fill("#lastNameInput", "last");
    await page.fill("#addressLine1Input", "address");
    await page.fill("#provinceInput", "province");
    await page.fill("#postCodeInput", "pincode");
    await percySnapshot(page, 'Details Page');

    await page.click('#checkout-shipping-continue');
    await page.click('text=Continue')
    await new Promise(resolve => setTimeout(resolve, 2000));
    await percySnapshot(page, 'Continue ');
    await page.click('text=Orders')
    await new Promise(resolve => setTimeout(resolve, 2000));

    await percySnapshot(page, 'orders Page');
    const list = page.locator('.a-fixed-left-grid-inner');
    await expect(list).toHaveCount(2);
    
  });
})

