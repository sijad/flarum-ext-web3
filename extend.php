<?php

namespace TokenJenny\Web3;

use Flarum\Extend;
use TokenJenny\Web3\Api\Controllers;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        ->post('/tokenjenny/web3/connect', 'tokenjenny.web3.connect', Controllers\ConnectController::class)
];
