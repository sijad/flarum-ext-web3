import app from 'flarum/forum/app';
import Button from "flarum/common/components/Button";
import sign from '../utils/sign';

interface LogInButtonProps {
  className?: string;
  onclick?: () => void;
  method: 'metamask';
}

export default class LogInButton extends Button {
  static initAttrs(attrs: LogInButtonProps) {
    attrs.className = (attrs.className || '') + ' LogInButton';

    attrs.onclick = async function () {
      const body = await sign(attrs.method);
      const payload = await app.request({
        url: app.forum.attribute('apiUrl') + '/tokenjenny/web3/login',
        method: 'POST',
        body,
        extract: (resp: string) => {
          const [, payload] = resp.match(/authenticationComplete\((.+?)\)/) || [];
          return payload;
        },
      });

      app.authenticationComplete({isWeb3: !!payload.email, ...payload});
    };

    super.initAttrs(attrs);
  }
}
