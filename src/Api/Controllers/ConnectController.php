<?php

namespace TokenJenny\Web3\Api\Controllers;

use Flarum\Foundation\Config;
use Flarum\Http\RequestUtil;
use Laminas\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use TokenJenny\Web3\Api\Exception\InvalidSignatureException;
use Sijad\LaravelEcrecover\EthSigRecover;
use Illuminate\Support\Arr;

class ConnectController implements RequestHandlerInterface
{
    /**
     * @var Config
     */
    protected $config;

    /**
     * @param Config $config
     */
    public function __construct(Config $config)
    {
        $this->config = $config;
    }

    /**
     * @param ServerRequestInterface $request
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        if (null !== $actor && 'POST' === $request->getMethod()) {
            $body = $request->getParsedBody();
            $signature = trim(Arr::get($body, 'signature'));
            $account = trim(Arr::get($body, 'account'));

            if (!empty($signature) && !empty($account)) {
                $date = gmdate("Y-n-j");
                $message = "Please sign this message to connect to " . $this->config['url'] . " @ " . $date;
                $eth_sig_util = new EthSigRecover();
                $signed = $eth_sig_util->personal_ecRecover($message, $signature);
                if ($signed === $account) {
                    $actor->web3_account = hex2bin(substr($account, 2));
                    $actor->save();
                    return new EmptyResponse;
                }
            }
        }

        throw new InvalidSignatureException();
    }

}
