<?php

namespace TokenJenny\Web3\Api\Controllers;

use Exception;
use Flarum\Foundation\Config;
use Flarum\Forum\Auth\Registration;
use Flarum\Forum\Auth\ResponseFactory;
use Flarum\Settings\SettingsRepositoryInterface;
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
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param Config $config
     */
    public function __construct(Config $config, ResponseFactory $response, SettingsRepositoryInterface $settings)
    {
        $this->response = $response;
        $this->config = $config;
        $this->settings = $settings;
    }

    /**
     * @param ServerRequestInterface $request
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $body = $request->getParsedBody();
        $signature = trim(Arr::get($body, 'signature'));
        $account = trim(Arr::get($body, 'account'));
        $method = trim(Arr::get($body, 'method'));

        $no_email = !!$this->settings->get('tokenjenny-web3.signup-without-email');

        if (!empty($signature) && !empty($account)) {
          if ($method === 'metamask') {
            $signed = Sign::personalRecover($signature, $this->config['url']);
            if ($signed === $account) {
                return $this->response->make(
                    'web3',
                    $account,
                    function (Registration $registration) use ($no_email, $account) {
                        if ($no_email === true) {
                          $email = "$account@web3";

                          $registration->provideTrustedEmail($email);
                        }

                        $registration
                            ->setPayload([]);
                    }
                );
            }
          }
        }

        throw new Exception('Invalid state');
    }
}
