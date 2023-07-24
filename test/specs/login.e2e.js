import {username, password, userFullName, expectedApplicationsPageRows} from '../../fixtures.js'


describe('Login Page', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    });

    it('should show login form', async () => {

        const emailField = await getEmailField(); // awaited once, used result on twice
        await expect(emailField).toBeDisplayed();
        await expect(emailField).toBeEnabled();

        const passwordField = await getPasswordField; // awaited once, used result on twice
        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const loginButton = await getLoginButton; // did not await element here
        await expect(await loginButton.getText()).toEqual('Přihlásit'); // awaited getText() which resolved the whole chain
    });

    it('should login with valid credentials', async () => {
        const emailField = getEmailField;
        const passwordField = getPasswordField;
        const loginButton = getLoginButton;
        const userNameDropdown = getUserNameDropdown;

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        await expect(await userNameDropdown.getText()).toEqual(userFullName);
    });

    it('should not login with invalid credentials', async () => {
        const emailField = getEmailField;
        const passwordField = getPasswordField;
        const loginButton = getLoginButton;
        const toastMessage = getToastMessage;
        const fieldError = getFieldError;

        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();

        // toast message is visible
        await expect(await toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        // validation message in the form is visible as well
        await expect(await fieldError.getText()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

        // and we still see login form
        await expect(await emailField).toBeDisplayed();
        await expect(await passwordField).toBeDisplayed();
        await expect(await loginButton).toBeDisplayed();
    });

    it('should logout', async () => {
        const emailField = getEmailField;
        const passwordField = getPasswordField;
        const loginButton = getLoginButton;
        const navbarRight = getNavbarRight;
        const userNameDropdown = getUserNameDropdown;
        const logoutLink = getLogoutLink;

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        // assert we are logged in, without it, the test would be invalid
        await expect(await userNameDropdown.getText()).toEqual(userFullName);

        await userNameDropdown.click();
        await logoutLink.click();

        await expect(await userNameDropdown.isDisplayed()).toBeFalsy();
        await expect(await navbarRight.getText()).toEqual('Přihlásit');
    });
});