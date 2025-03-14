<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM users";
        $result = $conn->query($sql);
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $sql = "INSERT INTO users (name, email) VALUES ('{$data['name']}', '{$data['email']}')";
        echo json_encode(["success" => $conn->query($sql)]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $sql = "UPDATE users SET name='{$data['name']}', email='{$data['email']}' WHERE id={$data['id']}";
        echo json_encode(["success" => $conn->query($sql)]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $sql = "DELETE FROM users WHERE id={$data['id']}";
        echo json_encode(["success" => $conn->query($sql)]);
        break;
}

$conn->close();
