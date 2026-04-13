<?php
// ====================== CONFIGURATION ======================
$email_to = "juliettecoz95@gmail.com";
// ====================== TRAITEMENT DU FORMULAIRE ======================

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {

    function died($error) {
        echo '<!DOCTYPE html><html><head><meta' . ' charset="utf-8"><title>Erreur</title></head><body>';
        echo '<h2>Nous sommes désolés, mais des erreurs ont été détectées.</h2>';
        echo '<p>Ces erreurs apparaissent ci-dessous :</p>';
        echo '<p style="color:red;">' . $error . '</p>';
        echo '<p><a href="javascript:history.back()">? Retour au formulaire</a></p>';
        echo '</body></html>';
        exit();
    }

    // Récupération et nettoyage des données
    $nom = $_POST['nom'] ?? '';
    $email = $_POST['email'] ?? '';
    $sujet = $_POST['sujet'] ?? '';
    $commentaire = $_POST['commentaire'] ?? '';

    $error_message = '';

    // Vérification que tous les champs obligatoires sont présents
    if (empty($nom) || empty($email) || empty($commentaire)) {
        died('Tous les champs marqués d\'une * sont obligatoires.');
    }

    // Validation de l'email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message .= 'L\'adresse e-mail que vous avez entrée ne semble pas être valide.<br>';
    }

    // Validation nom et prénom (lettres, espaces, tirets, apostrophes)
    $string_exp = "/^[A-Za-zÀ-ÿ0-9 .'-]+$/u";   // support des accents

    if (!preg_match($string_exp, $nom)) {
        $error_message .= 'Le nom que vous avez entré ne semble pas être valide.<br>';
    }

    // Validation commentaire
    if (strlen($commentaire) < 5) {
        $error_message .= 'Votre commentaire est trop court (minimum 5 caractères).<br>';
    }

    // Si des erreurs ont été détectées
    if (!empty($error_message)) {
        died($error_message);
    }

    // Construction du message email
    $email_message = "Nouveau message de contact :\n\n";
    $email_message .= "Nom : " . $nom . "\n";
    $email_message .= "Email : " . $email . "\n";
    $email_message .= "Commentaire :\n" . $commentaire . "\n";

    $email_subject = "Sujet : " . $sujet . "\n";

    // En-têtes email
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "MIME-Version: 1.0\r\n" .
               "Content-Type: text/plain; charset=utf-8\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Envoi de l'email
    $mail_sent = mail($email_to, $email_subject, $email_message, $headers);

    if ($mail_sent) {
        // Message de succès
        echo '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Message' . ' envoyé</title></head><body>';
        echo '<h2>Merci de m\'avoir contactés !</h2>';
        echo '<p>Votre message a bien été envoyé. Nous vous répondrons dans les plus' . ' brefs délais.</p>';
        echo '<p><a href="' . htmlspecialchars($_SERVER['PHP_SELF']) . '">Retour au formulaire</a></p>';
        echo '</body></html>';
        exit();
    } 
    else {
        died('Désolé, une erreur est survenue lors de l\'envoi de votre message.' . ' Veuillez réessayer plus tard.');
    }
}

else{
    echo"problème";
}

?>