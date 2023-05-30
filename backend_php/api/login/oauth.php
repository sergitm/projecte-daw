<?php

// hybridAuth Autentication
// --------------------------------------------------   
require '../../vendor/hybridauth/src/autoload.php';
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

    var_dump($user);
    
    // Si l'usuari que s'intenta logar es troba al fitxer, creem la sessió i loguem
    $fitxer_auth = json_decode(file_get_contents("../../config/auth.json"), true);
    $logat = false;
    foreach ($fitxer_auth['admins'] as $compta) {
        if ($compta === $user['email']) {
            $_SESSION['usuari'] = $user;
            
            $sessio = new \Hybridauth\Storage\Session();
        
            $sessio->set("usuari", $user);
            $logat = true;
        }
    }
    foreach ($fitxer_auth['users'] as $compta) {
        if ($compta === $user['email']) {
            $_SESSION['usuari'] = $user;
            
            $sessio = new \Hybridauth\Storage\Session();
        
            $sessio->set("usuari", $user);
            $logat = true;
        }
    }

    // i redirigirem a la pagina principal
    if ($logat) {
        // header("Location: http://localhost:4200");
    }

}catch(Exception $e){
    echo $e->getMessage();
}


?>