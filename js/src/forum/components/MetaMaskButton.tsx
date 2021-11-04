import Component from "flarum/common/Component";
import Button from "flarum/common/components/Button";
import app from 'flarum/forum/app';
import sign from "../utils/sign";

interface MetaMaskButtonProps {
  account?: string | null;
  onAccountChange: (account: string) => void;
}

export default class MetaMaskButton extends Component<MetaMaskButtonProps> {
  view() {
    const { account } = this.attrs;
    return (
      <Button className="Button LogInButton--metamask" icon="fab fa-ethereum" onclick={() => this.handleConnect()}>
        {account ? (
          app.translator.trans('tokenjenny-web3.forum.settings.connected', {
            account
          })
        ) : (
          app.translator.trans('tokenjenny-web3.forum.settings.connect_button')
        )}
      </Button>
    );
  }

  async handleConnect() {
    const body = await sign();

    await app.request({
      url: app.forum.attribute('apiUrl') + '/tokenjenny/web3/connect',
      method: 'POST',
      body,
    });

    this.attrs.onAccountChange(body!.account);
  }
}
