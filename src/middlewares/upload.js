import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Apenas imagens jpeg,jpg e png são permitidas"));
    }
  },
});
