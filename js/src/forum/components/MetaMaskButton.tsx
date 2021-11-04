import Component from "flarum/common/Component";
import Button from "flarum/common/components/Button";
import app from 'flarum/forum/app';
import sign from "../utils/sign";

export default class MetaMaskButton extends Component {
  view() {
    return (
      <Button className="Button" onclick={() => this.handleConnect()}>
        {app.translator.trans('tokenjenny-web3.forum.settings.connect_button')}
      </Button>
    );
  }

  async handleConnect() {
    const body = await sign();
    await app.request({
      url: app.forum.attribute('apiUrl') + '/tokenjenny/web3/connect',
      method: 'POST',
      body,
    })
  }
}
