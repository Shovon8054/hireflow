import db from "../../config/db.js";

// create and update student profile
export const createStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { university, skills, education } = req.body;

    const [existing] = await db.promise().query(
      "SELECT * FROM student_profiles WHERE user_id = ?",
      [userId]
    );

    if (existing.length > 0) {
      // update
      await db.promise().query(
        `UPDATE student_profiles 
         SET university=?, skills=?, education=? 
         WHERE user_id=?`,
        [university, skills, education, userId]
      );

      return res.json({ message: "Profile updated" });
    }

    // create
    await db.promise().query(
      `INSERT INTO student_profiles 
      (user_id, university, skills, education) 
      VALUES (?, ?, ?, ?)`,
      [userId, university, skills, education]
    );

    return res.status(201).json({ message: "Profile created" });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ==============================================================================
export const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.promise().query(
      "SELECT * FROM student_profiles WHERE user_id = ?",
      [userId]
    );

    return res.json(rows[0]);

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};