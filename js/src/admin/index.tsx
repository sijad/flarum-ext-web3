import app from 'flarum/admin/app';

app.initializers.add('tokenjenny-web3', () => {
  app.extensionData
    .for('tokenjenny-web3')
    .registerSetting({
      setting: 'tokenjenny-web3.signup-without-email',
      type: 'switch',
      label: app.translator.trans('tokenjenny-web3.admin.settings.signup_without_email'),
    })
});
