import {test, expect } from '@playwright/test';

test('new tab accessing',async ({context}) => {
  const page = await context.newPage()
  await page.goto('https://automationpanda.com/bdd/')
 
  const [newtab] = await Promise.all([
    context.waitForEvent('page'),                          //listener
    page.locator('a[href="https://en.wikipedia.org/wiki/Behavior-driven_development"]').click()//event on the promise page
   // page.goto("https://bstackdemo.com/")
  ])

await new Promise(resolve => setTimeout(resolve, 5000));
console.log(await newtab.title()) //child tab
console.log(await page.title()) //parent tab
})