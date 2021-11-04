<?php

namespace TokenJenny\Web3;

use Sijad\LaravelEcrecover\EthSigRecover;

class Sign {
    static function personalRecover($signature, $url) {
        $date = gmdate("Y-n-j");
        $message = "Please sign this message to connect to " . $url . " @ " . $date;
        $eth_sig_util = new EthSigRecover();
        return $eth_sig_util->personal_ecRecover($message, $signature);
    }
}

