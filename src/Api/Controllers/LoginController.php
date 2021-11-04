<?php

namespace TokenJenny\Web3\Api\Controllers;

use Exception;
use Flarum\Foundation\Config;
use Flarum\Http\RequestUtil;
use Flarum\Forum\Auth\Registration;
use Flarum\Forum\Auth\ResponseFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use TokenJenny\Web3\Sign;
use Illuminate\Support\Arr;

class LoginController implements RequestHandlerInterface
{
    /**
     * @var Config
     */
    protected $config;

    /**
     * @var ResponseFactory
     */
    protected $response;

    /**
     * @param Config $config
     */
    public function __construct(Config $config, ResponseFactory $response)
    {
        $this->response = $response;
        $this->config = $config;
    }

    /**
     * @param ServerRequestInterface $request
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $body = $request->getParsedBody();
        $signature = trim(Arr::get($body, 'signature'));
        $account = trim(Arr::get($body, 'account'));

        if (!empty($signature) && !empty($account)) {
            $signed = Sign::personalRecover($signature, $this->config['url']);
            if ($signed === $account) {
                return $this->response->make(
                    'web3',
                    $account,
                    function (Registration $registration) {
                        $registration
                            ->setPayload([]);
                    }
                );
            }
        }

        throw new Exception('Invalid state');
    }
}
