describe('Homework', async () => {

    it('should open page and create screenshot', async () => {

       // await browser.reloadSession();

        await browser.url('https://team8-2022brno.herokuapp.com/registrace');

        //await browser.pause(5000);
        
        await browser.saveScreenshot('screenshot.png');

    });

});
