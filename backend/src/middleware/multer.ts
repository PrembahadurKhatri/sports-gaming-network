/*
npm install multer
npm install -D @types/multer

Express ले image directly पढ्न सक्दैन।
त्यसैले:
Frontend
    │
    ▼
Multer
    │
    ▼
req.file

Multer ले image लाई req.file मा राखिदिन्छ।
*/


import multer from"multer";//import multer

const storage=multer.memoryStorage();//upload object memoryStorage() भनेको के? यसले uploaded file लाई RAM (Memory) मा राख्छ।

const upload=multer({//Multer को configuration हो। यसले Express लाई भन्छ: "File आयो भने memoryStorage प्रयोग गर।" यसले एउटा middleware return गर्छ।
    storage,
});

export default upload;//अब यो middleware लाई route मा प्रयोग गर्न सक्छौ।
