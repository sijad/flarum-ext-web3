<?php

namespace TokenJenny\Web3\Api;

use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\User\User;

class UserAttributes
{
    /**
     * @param Flarum\Api\Serializer\BasicUserSerializer $serializer
     * @param Flarum\User\User                     $discussion
     *
     * @return mixed
     */
    public function __invoke(BasicUserSerializer $serializer, User $model)
    {
        $actor = $serializer->getActor();

        if ($model->getPreference('discloseWeb3Address') || $actor->id === $model->id) {
            $provider = $model->loginProviders()
                  ->where('provider', 'web3')
                  ->first();

            return [
                'web3Account' => empty($provider) ? null : $provider->identifier,
            ];
        }

        return [];
    }
}
