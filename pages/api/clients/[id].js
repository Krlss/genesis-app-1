import { pool } from "../../../config/db";

export default async function handler(req, res) {
    switch (req.method) {
        case "DELETE":
            return await deleteUser(req, res);
        case "PUT":
            return await updateUser(req, res);
        default:
            return res.status(400).json({ message: "bad request" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.query;

        const result = await pool.query("DELETE FROM clients WHERE id = ?", [id]);

        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.query;
        const { cedula, nombre, apellido } = req.body;

        const result = await pool.query(
            "UPDATE clients SET cedula = ?, nombre = ?, apellido = ? WHERE id = ?",
            [cedula, nombre, apellido, id]
        );

        return res.status(200).json({ message: "User updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}