describe('Homework', async () => {

    it('should open page and create screenshot', async () => {

       // await browser.reloadSession();

        await browser.url('https://team8-2022brno.herokuapp.com/registrace');

        //await browser.pause(5000);
        
        await browser.saveScreenshot('screenshot.png');

    });

    it('find the best selectors for all the form elements', async () => {

        await browser.reloadSession();
        await browser.url('/prihlaseni');


        /*
        CSS Selectors: the first name and last name field selector
         */
        const idNameSelector = $('#name');
        console.log(await idNameSelector.getHTML());

        /*
        CSS Selectors: the email field selector
         */
        const idEmailSelector = $('#email');
        console.log(await idEmailSelector.getHTML());

        /*
        CSS Selectors: the password field selector 
         */
        const idPasswordSelector = $('#password');
        console.log(await idPasswordSelector.getHTML());

        /*
        CSS Selectors: the password confirmation field selector 
         */
        const idPasswordConfirmSelector = $('#password-confirm');
        console.log(await idPasswordConfirmSelector.getHTML());

        /*
        CSS Selectors: the registration button selector
         */
        const registrationButtonSelector = $('.btn-primary');
        console.log(await registrationButtonSelector.getHTML());
    });

});
