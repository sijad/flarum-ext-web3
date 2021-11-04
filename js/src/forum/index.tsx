import { extend } from 'flarum/common/extend';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import app from 'flarum/forum/app';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import MetaMaskButton from './components/MetaMaskButton';
import LogInButtons from 'flarum/forum/components/LogInButtons';
import LogInButton from './components/LogInButton';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';

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

  extend(
    LogInButtons.prototype,
    'items',
    function(items: ItemList) {
      items.add('github',
        <LogInButton
          className="Button LogInButton--metamask"
          icon="fab fa-ethereum"
        >
          {app.translator.trans('tokenjenny-web3.forum.log_in.with_metamask_button')}
        </LogInButton>
      );
    }
  );
});
