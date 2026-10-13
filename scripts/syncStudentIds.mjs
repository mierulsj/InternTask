import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2RwNM-WkOyPTefcF2hjdX1E0XkhLsKGM",
  authDomain: "exploriademo.firebaseapp.com",
  projectId: "exploriademo",
  storageBucket: "exploriademo.firebasestorage.app",
  messagingSenderId: "17561345333",
  appId: "1:17561345333:web:63f3eb13ec1fbfcb68407c",
  measurementId: "G-EKRFZE5PVP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function syncAllStudentIds() {
    console.log("🚀 Memulakan semakan dan kemas kini ID Pelajar (STU-XXXXX) ke pangkalan data Firestore...");
    try {
        const querySnapshot = await getDocs(collection(db, "pelajar"));
        console.log(`📊 Dijumpai ${querySnapshot.size} rekod murid dalam koleksi 'pelajar'.`);

        let updatedCount = 0;
        let skippedCount = 0;

        for (const docSnap of querySnapshot.docs) {
            const data = docSnap.data();
            const ic = docSnap.id;
            const cleanIC = ic.replace(/\D/g, "");
            
            // Format ID: STU-XXXXX berasaskan 5 digit terakhir
            const studentId = `STU-${cleanIC.length >= 5 ? cleanIC.slice(-5) : cleanIC.padStart(5, "0")}`;

            if (data.studentId === studentId) {
                console.log(`ℹ️ [Sudah Wujud] ${data.nama || "Pelajar"} (${ic}): ${studentId}`);
                skippedCount++;
            } else {
                console.log(`🔄 [Mengemaskini...] ${data.nama || "Pelajar"} (${ic}) -> ${studentId}`);
                await setDoc(doc(db, "pelajar", ic), {
                    studentId: studentId
                }, { merge: true });
                updatedCount++;
            }
        }

        console.log(`\n🎉 Selesai!`);
        console.log(`✅ Berjaya dikemaskini dalam pangkalan data: ${updatedCount} pelajar.`);
        console.log(`✨ Sudah mempunyai ID yang betul: ${skippedCount} pelajar.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Ralat mengemaskini Firestore:", err);
        process.exit(1);
    }
}

syncAllStudentIds();
