import { extend, override } from 'flarum/common/extend';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import app from 'flarum/forum/app';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import ItemList from 'flarum/common/utils/ItemList';
import LogInButtons from 'flarum/forum/components/LogInButtons';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';
import Switch from 'flarum/common/components/Switch';

import LogInButton from './components/LogInButton';
import MetaMaskButton from './components/MetaMaskButton';

app.initializers.add('tokenjenny-web3', () => {
  (User.prototype as any).web3Account = Model.attribute('web3Account');

  extend(
    SettingsPage.prototype,
    'accountItems',
    function(this: SettingsPage, items: ItemList) {
      const account = this.user.web3Account();
      items.add(
        'metamask-connect',
        <MetaMaskButton
          account={account}
          onAccountChange={(web3Account: string) => {
            this.user.pushAttributes({
              web3Account,
            });
            m.redraw();
          }}
        />
      );
    }
  );

  override(
    SignUpModal.prototype,
    'className',
    function(original) {
      return `${original()} ${this.attrs.isWeb3 ? ' SignUpModal--no-email' : ''}`
    }
  );

  extend(
    SettingsPage.prototype,
    'privacyItems',
    function(this: SettingsPage & {discloseWeb3AddressLoading: boolean}, items: ItemList) {
      items.add(
        'discloseWeb3Address',
        <Switch
          state={this.user.preferences().discloseWeb3Address}
          onchange={(value: boolean) => {
            this.discloseWeb3AddressLoading = true;
            m.redraw();

            this.user.savePreferences({ discloseWeb3Address: value }).then(() => {
              this.discloseWeb3AddressLoading = false;
              m.redraw();
            });
          }}
          loading={this.discloseWeb3AddressLoading}
        >
          {app.translator.trans('tokenjenny-web3.forum.settings.privacy_disclose_web3_address_label')}
        </Switch>
      );
    }
  );

  extend(
    LogInButtons.prototype,
    'items',
    function(items: ItemList) {
      items.add('metamask',
        <LogInButton
          className="Button LogInButton--metamask"
          icon="fab fa-ethereum"
          method="metamask"
        >
          {app.translator.trans('tokenjenny-web3.forum.log_in.with_metamask_button')}
        </LogInButton>
      );
    }
  );
});
