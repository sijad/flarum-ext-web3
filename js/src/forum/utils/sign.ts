import app from 'flarum/forum/app';

export default async function sign() {
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

  return {
    account: accounts[0],
    signature,
  };
}
