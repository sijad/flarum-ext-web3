<?php

namespace TokenJenny\Web3\Api\Exception;

use Exception;
use Flarum\Foundation\KnownError;

class InvalidSignatureException extends Exception implements KnownError
{
    public function getType(): string
    {
        return 'invalid_web3_signature';
    }
}
