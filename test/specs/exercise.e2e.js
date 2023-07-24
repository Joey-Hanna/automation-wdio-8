import {username, password, userFullName} from './fixtures.js'
import {username, password} from './fixtures.js'
// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

describe('Czechitas Login Page', async () => {

    it('should open login page', async () => {

        await browser.reloadSession();

        await browser.url('/prihlaseni');

        await browser.pause(5000);

        // Klikni na Přihlásit
        const loginButton = $('.btn-primary');
        await loginButton.click();

        //Zkontroluj, že se objevila chyba a uživatel se nepřihlásil


        //Vyplň správný email a nesprávné heslo
        const email = $('#email');
        await email.setValue(username);

        const passwordField = $('#password');
        await passwordField.setValue(userFullName);

        await loginButton.click();

        //Zkontroluj, že se objevila chyba a uživatel se nepřihlásil
        const errorMessage = $('.invalid-feedback');
        console.log(await errorMessage.getText());

        // Klikni na Přihlásit
        await loginButton.click();

        // Vyplň správný email a správné heslo
        await email.setValue(username);
        await passwordField.setValue(password);

         // Klikni na Přihlásit
        await loginButton.click();

         //Zkontroluj, že se uživatel přihlásil
        const currentUser = $('.navbar-right').$('strong').getText()
        console.log(await currentUser);

        //Jdi na stránku Přihlášky
        await $('=Přihlášky').click();
        await browser.pause(1000);

        //Vypiš všechny řádky tabulky
        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.getText()
            console.log(rowText);
        }

        //Zadej něco do políčka pro filtrování tabulky
        await $('input[type="search"]').setValue('eli');

        //Zkontroluj, že se stránka profiltrovala
        await $('#DataTables_Table_0_processing').waitForDisplayed();
        await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });

        //Odhlaš se a zkontroluj, že jsi byl/a odhlášen/a


        /**
 * Lesson 4: Test structure
 */


describe('Login Page', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    });

    it('should show login form', async () => {
        const emailField = $('#email');
        await expect(emailField).toBeDisplayed();
        await expect(emailField).toBeEnabled();

        const passwordField = $('#password');
        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const loginButton = $('.btn-primary');
        await expect(loginButton).toHaveText('Přihlásit');
        //console.log('Login button is dislayed: ' + await loginButton.isDisplayed());
        //console.log('Login button text is: ' + await loginButton.getText());
    });

    it('should login with valid credentials', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        console.log('User currently logged in: ' + await userNameDropdown.getText());
    });

    it('should not login with invalid credentials', async () => {

        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();

        const toastMessage = $('.toast-message');
        console.log('Error: ' + await toastMessage.getText());

        const fieldError = $('.invalid-feedback');
        console.log('Field error: ' + await fieldError.getText());

        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());
    });

    it('should logout', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');
        const navbarRight = $('.navbar-right')
        const userNameDropdown = navbarRight.$('[data-toggle="dropdown"]');
        const logoutLink = $('#logout-link');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        console.log('User currently logged in: ' + await userNameDropdown.getText());

        await userNameDropdown.click();
        await logoutLink.click();

        console.log('User is logged in: ' + await userNameDropdown.isDisplayed());
        console.log('Navbar text: ' + await navbarRight.getText());
    });
});

describe('Applications Page', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
        await $('#email').setValue(username);
        await $('#password').setValue(password);
        await $('.btn-primary').click();
        await $('=Přihlášky').click();
        await browser.pause(1000);
    });

    it('should list all applications', async () => {
        console.log('Page title is: ' + await $('h1').getText());

        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.getText()
            console.log(rowText);
        }
    });

    it('should filter in applications', async () => {
        const searchInput = $('input[type="search"]');
        const loading = $('#DataTables_Table_0_processing');
        const searchText = 'mar';

        await searchInput.setValue(searchText);
        await browser.pause(1000);
        await loading.waitForDisplayed({ reverse: true});

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        for (const row of filteredRows) {
            console.log(await row.getText());
        }
    });
});







    });

});

// describe('Login And Applications Page', async () => {

//     it('should login and list applications', async () => {

//         await browser.reloadSession();

//         await browser.url('/prihlaseni');




//     });

// });


//Cvičení 5 - assertace


describe('Login Page', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    });

    it('should show login form', async () => {

        //Políčko a tlačítka pro přihlášení jsou viditelná
        const emailField = $('#email');
        await expect(emailField).toBeDisplayed();

        const passwordField = $('#password');
        await expect(passwordField).toBeDisplayed();

        //Tlačítko pro přihlášení obsahuje správný text
        const loginButton = $('.btn-primary');
        await expect(loginButton).toHaveText('Přihlásit');

        //  ověřte že odkaz na zapomenuté heslo odkazuje na správnou stránku

    });

    it('should list all applications', async () => {
        //Po přihlášení tabulka obsahuje správný počet přihlášek

        const unfilteredRowsCount = await table.$$('tr').length;
        
        
    });


    // Cviceni 11

    describe('Tests to Check if Navigation Paths Work', async () => {

        beforeEach(async () => {
            await browser.reloadSession();
            await browser.url('/');
        });

        it('should show that the navigation menu works', async () => {

            const dropdownProUcitele = $('.dropdown-toggle[href="https://team8-2022brno.herokuapp.com/pro-ucitele"]')
    
            await expect(dropdownProUcitele).toBeDisplayed();
            await dropdownProUcitele.click();

        });

    });






});
