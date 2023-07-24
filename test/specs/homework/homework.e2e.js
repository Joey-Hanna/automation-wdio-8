import { username, password, newPassword, newUserFullName, newUsername, userFullName, newUserName2 } from '../fixtures.js';

describe('Registration page ', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/registrace');
    });

    
    it('should show registration form', async () => {
        const nameField = await $('#name'); 
        await expect(nameField).toBeDisplayed();
        await expect(nameField).toBeEnabled();

        const emailField = await $('#email'); 
        await expect(emailField).toBeDisplayed();
        await expect(emailField).toBeEnabled();

        const passwordField = await $('#password'); 
        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const passwordControlField = await $('#password'); 
        await expect(passwordControlField).toBeDisplayed();
        await expect(passwordControlField).toBeEnabled();

        const registrationButton = $('.btn-primary'); 
        await expect(await registrationButton.getText()).toEqual('Zaregistrovat'); 

        await browser.pause(5000);
});

    it('should do a valid registration', async () => {
        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordControlField = $('#password-confirm');
        const registrationButton = $('.btn-primary');
        const navbarRight = $('.navbar-right')
        const userNameDropdown = navbarRight.$('[data-toggle="dropdown"]');

        await nameField.setValue(newUserFullName);
        await emailField.setValue(newUsername);
        await passwordField.setValue(newPassword);
        await passwordControlField.setValue(newPassword);
        await registrationButton.click();

        await expect(await userNameDropdown.getText()).toEqual(newUserFullName);

        await browser.pause(5000);
    });

    it('should not register with an already existing email', async () => {
        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordControlField = $('#password-confirm');
        const registrationButton = $('.btn-primary');
        const toastMessage = $('.toast-message');
        const fieldError = $('.invalid-feedback');

        await nameField.setValue(userFullName);
        await emailField.setValue(username);
        await passwordField.setValue(password);
        await passwordControlField.setValue(password);
        await registrationButton.click();

        await expect(await toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        await expect(await fieldError.getText()).toEqual('Účet s tímto emailem již existuje');

        await expect(await passwordField).toBeDisplayed();
        await expect(await passwordControlField).toBeDisplayed();
        await expect(await registrationButton).toBeDisplayed();

        await browser.pause(5000);
    })

    it('should not register with an invalid password containing only numbers', async () => {
        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordControlField = $('#password-confirm');
        const registrationButton = $('.btn-primary');
        const toastMessage = $('.toast-message');
        const fieldError = $('.invalid-feedback');

        await nameField.setValue(newUserFullName);
        await emailField.setValue(newUserName2);
        await passwordField.setValue('12345');
        await passwordControlField.setValue('12345');
        await registrationButton.click();

        await expect(await toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        await expect(await fieldError.getText()).toEqual('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');


        await expect(await passwordField).toBeDisplayed();
        await expect(await passwordControlField).toBeDisplayed();
        await expect(await registrationButton).toBeDisplayed();

        await browser.pause(5000);
    })



})