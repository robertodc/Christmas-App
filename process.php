<?php
// Connessione al database (sostituisci con le tue credenziali)
$servername = "sql11.freesqldatabase.com";
$username = "sql11668820";
$password = "FDNQMExMI1";
$dbname = "sql11668820";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Recupera i dati dalla richiesta POST
$username = $_POST['username'];
$password = $_POST['password'];
$gift = $_POST['gift'];

// Inserisci il regalo nel database
$sql = "INSERT INTO gifts (username, gift) VALUES ('$username', '$gift')";

if ($conn->query($sql) === TRUE) {
    echo "Gift added successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
