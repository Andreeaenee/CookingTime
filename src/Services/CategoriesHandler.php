<?php
require_once 'database.php';

class CategoriesHandler {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getCategoryName($categoryId) {
        $query = "SELECT name FROM categories WHERE id = :categoryId";
        $stmt = $this->db->prepare($query);
        $stmt->execute(array(':categoryId' => $categoryId));
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['name'] : 'Unknown Category';
    }
}

// Example usage:
$handler = new CategoriesHandler();
$categoryId = $_GET['categoryId']; // Assuming the categoryId is passed as a query parameter
$categoryName = $handler->getCategoryName($categoryId);
echo json_encode(array('name' => $categoryName));
