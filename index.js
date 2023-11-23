const puppeteer = require('puppeteer');

async function automateFormSubmission() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://bukabantuan.bukalapak.com/form/175');

  const formActions = [
    { selector: '.bl-text-field__inner input#name', value: 'testme123' },
    { selector: '.bl-text-field__inner input#email', value: 'bj@gmail.com' },
    { selector: 'div.bl-text-field__inner input[name=\'merek\']', value: 'House' },
    { selector: 'div.bl-text-field__inner input[name=\'nama_pemilik\']', value: 'Sam' },
    { selector: 'div.bl-text-field__inner input[name=\'nomor_registrasi\']', value: '0492850985' },
    { selector: 'label.bl-radio-button input[value="Iya (Yes)"]' },
    { selector: 'div.bl-text-field__inner input[name=\'hubungan_pelapor\']', value: 'Dennis' },
    { selector: 'div.bl-text-field__inner input[name=\'nama_perusahaan\']', value: 'Abc pvt limited' },
    { selector: 'div.bl-text-field__inner input[name=\'website_perusahaan\']', value: 'wwww.abc.com' },
    { selector: 'div.bl-text-field__inner input[name=\'alamat_perusahaan\']', value: 'no 2 abc street pincode 009' },
    { selector: 'div.bl-text-field__inner input[name=\'alamat_email_pemilik_merek\']', value: 'owern@gmail.com' },
    { selector: 'div.bl-text-field__inner input[name=\'no_telepon_pelapor\']', value: '98982608723' },
    { selector: 'div.bl-text-field__inner input[name=\'link_barang\']', value: 'www.productlink.com' },
    { selector: 'div.bl-textarea textarea[name=\'body\']', value: 'form type testing passed' },
  ];

  const fileInputSelectors = [
    'input#link_barang_banyak',
    'input#surat_kepemilikan_merek',
    'input#bukti_surat_kuasa',
    'input#bukti_surat_izin_usaha',
  ];
 
  async function performFormActions(actions) {
    for (const action of actions) {
      await page.waitForSelector(action.selector);
      if (action.value) {
        await page.type(action.selector, action.value);
      } else {
        await page.click(action.selector);
      }
    }
  }

  async function uploadFiles(fileInputSelectors, filePath) {
    for (const fileInputSelector of fileInputSelectors) {
      await page.waitForSelector(fileInputSelector);

      const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click(fileInputSelector),
      ]);

      await fileChooser.accept([filePath]);
    }
  }

  await performFormActions(formActions);
  await page.waitForTimeout(2000);

  const filePath = "C:\\Users\\Bhuvan\\Documents\\test\\check.jpg";
  await uploadFiles(fileInputSelectors, filePath);
  const finalClick = 'label.bl-checkbox input[value="isTncChecked"]';
  await page.waitForSelector(finalClick);
  await page.click(finalClick);
  await page.waitForTimeout(4000);
  console.log("waiting for final submission button");
  const buttonSelector = 'button.bl-button--primary';
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector);
  await page.waitForTimeout(20000);
  console.log('Automation completed"');

  await browser.close();
}


automateFormSubmission();
