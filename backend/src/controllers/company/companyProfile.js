import db from "../../config/db.js";



// ==================================== GET ==========================================

export const getCompanyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await db.promise().query(
            `SELECT * FROM company_profiles WHERE user_id = ?`,
            [userId]
        );

        const profile = rows[0];

        if (!profile) {
            return res.json(null);
        }

        // Convert logo buffer to base64
        if (profile.logo) {
            profile.logo = profile.logo.toString("base64");
        }

        res.status(200).json(profile);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ============================== CREATE / UPDATE ==============================

export const createCompanyProfile = async (req, res) => {
    try {

        const userId = req.user.id;
        const {
            company_name,
            industry,
            description,
            website
        } = req.body;


        const logo = req.file ? req.file.buffer : null;
        const [existing] = await db.promise().query(

            "SELECT * FROM company_profiles WHERE user_id=?",

            [userId]

        );



        // -----------------------------------------------update-----------------------------------
        if(existing.length > 0){
            await db.promise().query(
                `UPDATE company_profiles
                 SET company_name=?,
                     industry=?,
                     description=?,
                     website=?,
                     logo=?
                 WHERE user_id=?`,

                [
                    company_name,
                    industry,
                    description,
                    website,
                    logo,
                    userId
                ]

            );


            return res.json({
                message:"Profile updated"
            });

        }




        // ------------------------------------------------create-------------------------------
        await db.promise().query(

            `INSERT INTO company_profiles
            (
                user_id,
                company_name,
                industry,
                description,
                website,
                logo
            )

            VALUES(?,?,?,?,?,?)`,

            [

                userId,
                company_name,
                industry,
                description,
                website,
                logo

            ]

        );


        res.status(201).json({

            message:"Profile created"

        });


    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};