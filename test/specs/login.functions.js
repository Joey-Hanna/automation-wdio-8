export async function getEmailField() {
    return await $('#email');
}

export async function getPasswordField() {
    return await $('#password');
}

export async function getLoginButton() {
    return await $('.btn-primary');
}

export async function getUserNameDropdown() {
    return await $('.navbar-right').$('[data-toggle="dropdown"]');
}

export async function getToastMessage() {
    return await $('.toast-message');
}

export async function getFieldError() {
    return await $('.invalid-feedback');
}

export async function getNavbarRight() {
    return await $('.navbar-right');
}

export async function getLogoutLink() {
    return await $('#logout-link');
}