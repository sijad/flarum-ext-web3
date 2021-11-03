import { extend } from 'flarum/common/extend';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import app from 'flarum/forum/app';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import MetaMaskButton from './components/MetaMaskButton';

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
});
