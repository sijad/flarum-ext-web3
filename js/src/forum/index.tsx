import { extend } from 'flarum/common/extend';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import app from 'flarum/forum/app';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import MetaMaskButton from './components/MetaMaskButton';
import LogInButtons from 'flarum/forum/components/LogInButtons';
import LogInButton from './components/LogInButton';

app.initializers.add('tokenjenny-web3', () => {
  extend(
    SettingsPage.prototype,
    'accountItems',
    function(items: ItemList) {
      items.add(
        'metamask-connect',
        <MetaMaskButton />
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
