<?php
/*
 * mail.php
 * @author Thomas Breitbach
 */
$recipient = $_POST['recipient'];
$subject = $_POST['subject'];
$scheduling = $_POST['scheduling'];
$message = $_POST['message'] ;
$header = 'From: ' . $_POST['sender'] . "\r\n" .
    'Reply-To: ' . $_POST['sender'] . "\r\n" .
    'Content-type: text/plain; charset=utf-8' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

sleep(1);

mail($recipient, $subject, $message . "\n\n----Semesterplanung----\n" . $scheduling, $header);
?>

