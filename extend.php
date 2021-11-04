<?php

namespace TokenJenny\Web3;

use Flarum\Extend;
use Flarum\Api\Serializer\BasicUserSerializer;
use TokenJenny\Web3\Api\Controllers;
use TokenJenny\Web3\Api\UserAttributes;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        ->post('/tokenjenny/web3/connect', 'tokenjenny.web3.connect', Controllers\ConnectController::class)
        ->post('/tokenjenny/web3/login', 'tokenjenny.web3.login', Controllers\LoginController::class),

    (new Extend\ApiSerializer(BasicUserSerializer::class))
        ->attributes(UserAttributes::class),
];
