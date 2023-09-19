import app from 'flarum/forum/app';

function getMessage() {
  const d = new Date();
  const date = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
  return `Please sign this message to connect to ${app.forum.attribute('baseUrl')} @ ${date}`;
}

async function metaMaskSign() {
  const eth = (window as any).ethereum;
  if (!eth) {
    alert('MetaMask not found!');
    return;
  }

  const message = getMessage();
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
    method: 'metamask',
  };
}

export default async function sign(method: 'metamask') {
  if (method === 'metamask') {
    return metaMaskSign();
  }

  throw new Error('Method not found!')
}
