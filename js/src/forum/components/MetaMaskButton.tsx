import Component from "flarum/common/Component";
import Button from "flarum/common/components/Button";
import app from 'flarum/forum/app';

export default class MetaMaskButton extends Component {
  view() {
    return (
      <Button className="Button" onclick={() => this.handleConnect()}>
        {app.translator.trans('tokenjenny-web3.forum.settings.connect_button')}
      </Button>
    );
  }

  async handleConnect() {
    const eth = (window as any).ethereum;
    if (!eth) {
      alert('MetaMask not found!');
      return;
    }

    const d = new Date();
    const date = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
    const message = `Please sign this message to connect to ${app.forum.attribute('baseUrl')} @ ${date}`;

    const accounts = await eth.request({ method: 'eth_requestAccounts' });
    const signature = await eth.request({
      method: 'personal_sign',
      params: [
        accounts[0],
        message,
      ],
    });

    await app.request({
      url: app.forum.attribute('apiUrl') + '/tokenjenny/web3/connect',
      method: 'POST',
      body: {
        signature,
        account: accounts[0],
      },
    })
  }
}
