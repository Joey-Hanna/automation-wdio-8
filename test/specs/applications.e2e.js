import {username, password, userFullName, expectedApplicationsPageRows} from '../../fixtures.js'
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
        const table = $('.dataTable').$('tbody');
        const rows = await table.$$('tr');

        await expect(await $('h1')).toHaveText('Přihlášky');
        await expect(rows.length).toEqual(expectedApplicationsPageRows);

        for (const row of rows) {
            console.log(await row.getText());
            const cols = await row.$$('td');
            await expect(cols[0]).toHaveText(/^(?!\s*$).+/);
            await expect(cols[1]).toHaveText(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            await expect(cols[2]).toHaveText(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            // nebo
            await expect(cols[2]).toHaveText(['Bankovní převod', 'FKSP', 'Hotově', 'Složenka']);
            await expect(cols[3]).toHaveText(/\d{1,3}(| \d{0,3}) Kč/);
        }
    });

    it('should filter in applications', async () => {
        const searchInput = $('input[type="search"]');
        const table = $('.dataTable').$('tbody');
        const loading = $('#DataTables_Table_0_processing');
        const searchText = 'mar';

        const unfilteredRowsCount = await table.$$('tr').length;

        await searchInput.setValue(searchText);
        await browser.pause(1000);
        await loading.waitForDisplayed({ reverse: true});

        const filteredRows = await table.$$('tr');

        await expect(filteredRows.length).toBeLessThan(unfilteredRowsCount);

        for (const row of filteredRows) {
            console.log(await row.getText());
            const cols = await row.$$('td');
            await expect(cols[0]).toHaveTextContaining(searchText, { ignoreCase: true });
        }
    });
});
