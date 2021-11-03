<?php

use Flarum\Database\Migration;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasColumn('users', 'web3_account')) {
            return;
        }

        $schema->table('users', function (Blueprint $table) {
            $table->char('web3_account', 20)
                  ->charset('binary')
                  ->nullable();
            $table->unique('web3_account');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->dropColumn('web3_account');
        });
    },
];
