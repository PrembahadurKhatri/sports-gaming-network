import express from 'express'
import upload from "../middleware/multer"
import cloudinary from "../config/cloudinary"

const router=express.Router();

router.post("/upload", upload.single("image"),
async (req, res) => {
    try {
        // Fix 1: Guard against req.file being undefined
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "sports_gaming_network" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                })
                .end(req.file!.buffer); // Multer stored the image in RAM
        });
        res.json(result); // You send it back to React.
    } catch (err) {
        // Fix 2: Narrow the unknown error type
        const message = err instanceof Error ? err.message : "Upload failed";
        res.status(500).json({ message });
    }
}
)

export default router;
