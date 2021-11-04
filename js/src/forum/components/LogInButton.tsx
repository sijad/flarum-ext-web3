import app from 'flarum/forum/app';
import Button from "flarum/common/components/Button";
import RequestError from "flarum/common/utils/RequestError";
import sign from '../utils/sign';

interface LogInButtonProps {
  className?: string;
  onclick?: () => void;
}

export default class LogInButton extends Button {
  static initAttrs(attrs: LogInButtonProps) {
    attrs.className = (attrs.className || '') + ' LogInButton';

    attrs.onclick = async function () {
      const body = await sign();
      const payload = await app.request({
        url: app.forum.attribute('apiUrl') + '/tokenjenny/web3/login',
        method: 'POST',
        body,
        extract: (resp: string) => {
          const [, payload] = resp.match(/authenticationComplete\((.+?)\)/) || [];
          return payload;
        },
      });
      app.authenticationComplete(payload);
    };

    super.initAttrs(attrs);
  }
}

