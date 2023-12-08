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

// Recupera i regali dal database
$sql = "SELECT * FROM gifts ORDER BY id DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<li>{$row['username']} wants: {$row['gift']}</li>";
    }
} else {
    echo "<li>No gifts yet</li>";
}

$conn->close();
?>
