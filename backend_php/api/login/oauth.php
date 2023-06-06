<?php

// hybridAuth Autentication
// --------------------------------------------------   
require_once '../../vendor/hybridauth/src/autoload.php';
require_once '../../config/database.php';
require_once '../../model/Session.php';

session_start();
session_regenerate_id(true);

$config= [    
    'callback' => \Hybridauth\HttpClient\Util::getCurrentUrl(),
    'keys' => [
        'id' => '468515275307-3b0t2kj3jp10ca35ooh9imn0htlk64je.apps.googleusercontent.com',
        'secret' => "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",
    ],
    'scope' => 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
];

try{
    $google = new Hybridauth\Provider\Google($config);

    $google->authenticate();

    $accessToken = $google->getAccessToken();
    $userProfile = $google->getUserProfile();
    $username = explode("@", $userProfile->email);
    $username = $username[0];
    $user = array(
        'email' => $userProfile->email,
        'firstName' => $userProfile->firstName,
        'lastName' => $userProfile->lastName,
        'username' => $username,
        'token' => $accessToken
    );
    
    // Si l'usuari que s'intenta logar es troba al fitxer, creem la sessió i loguem
    $fitxer_auth = json_decode(file_get_contents("../../config/auth.json"), true);
    $logat = false;
    foreach ($fitxer_auth['admins'] as $compta) {
        if ($compta === $user['email']) {
            $_SESSION['usuari'] = $user;

            $sessionOG = Session::Get(['email' => $user['email']]);
            if ($sessionOG != null) {
                $sessionOG->destroy();
            }

            try {
                $session = new Session(session_id(), $user['email'], $user['firstName'], $user['lastName'], $user['username'], 1, $user['token']);
                $session->save();
                $logat = true;
            } catch (\Throwable $th) {
                $logat = false;
            }
        }
    }
    foreach ($fitxer_auth['users'] as $compta) {
        if ($compta === $user['email']) {
            $_SESSION['usuari'] = $user;
            
            $sessionOG = Session::Get(['email' => $user['email']]);
            if ($sessionOG != null) {
                $sessionOG->destroy();
            }

            try {
                $session = new Session(session_id(), $user['email'], $user['firstName'], $user['lastName'], $user['username'], 0, $user['token']);
                $session->save();
                $logat = true;
            } catch (\Throwable $th) {
                $logat = false;
            }
        }
    }

    // i redirigirem a la pagina principal
    if ($logat) {
        header("Location: http://localhost:4200/session?session_id=" . urlencode($session->getSessionId()));
    }

}catch(Exception $e){
    echo $e->getMessage();
}


?>