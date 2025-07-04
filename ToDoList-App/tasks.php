<?php
$filename = "tasks.json";

// Create file if it doesn't exist
if (!file_exists($filename)) {
    file_put_contents($filename, json_encode([]));
}

$tasks = json_decode(file_get_contents($filename), true);

// Handle POST actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if ($input["action"] === "add") {
        $tasks[] = [
            "text" => $input["text"],
            "completed" => false
        ];
    }

    if ($input["action"] === "toggle") {
        $index = $input["index"];
        if (isset($tasks[$index])) {
            $tasks[$index]["completed"] = !$tasks[$index]["completed"];
        }
    }

    file_put_contents($filename, json_encode($tasks));
    echo json_encode(["status" => "success"]);
    exit;
}

// For GET requests: return all tasks
echo json_encode($tasks);
