import { SalatGuide } from '../types';

// Custom generated illustrations for Salat steps
const IMG_NIYYAH = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAsMjBDMjcuOSwyMCwxMCwzNy45LDEwLDYwYzAsNS41LDIuMiwxMC41LDUuOSwxNC4xbDEuNSwzLjUgNS4yLTIuN2MyLjgtMS41LDUuOS0yLjMsOS4xLTIuM2gxNi42YzMuMiwwLDYuMywwLjgsOS4xLDIuM2w1LjIsMi43LDEuNS0zLjVjMy43LTMuNiw1LjktOC42LDUuOS0xNC4xQzkwLDM3LjksNzIuMSwyMCw1MCwyMFoiIGZpbGw9IiNjY2MiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIxMiIgZmlsbD0iI2FhYSIvPjxwYXRoIGQ9Ik0zNSw4NWw1LDVoMTBsNS01di0xMEgzNVY4NXoiIGZpbGw9IiNjY2MiLz48L3N2Zz4=';
const IMG_TAKBIR = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAsMjBDMjcuOSwyMCwxMCwzNy45LDEwLDYwYzAsNS41LDIuMiwxMC41LDUuOSwxNC4xbDEuNSwzLjUgNS4yLTIuN2MyLjgtMS41LDUuOS0yLjMsOS4xLTIuM2gxNi42YzMuMiwwLDYuMywwLjgsOS4xLDIuM2w1LjIsMi43LDEuNS0zLjVjMy43LTMuNiw1LjktOC42LDUuOS0xNC4xQzkwLDM3LjksNzIuMSwyMCw1MCwyMFoiIGZpbGw9IiNjY2MiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIxMiIgZmlsbD0iI2FhYSIvPjxwYXRoIGQ9Ik0zNSw4NWw1LDVoMTBsNS01di0xMEgzNVY4NXoiIGZpbGw9IiNjY2MiLz48cGF0aCBkPSJNMzUsNjBoLTExbC00LDhWNTJsNC04aDExVjYweiIgZmlsbD0iI2FhYSIvPjxwYXRoIGQ9Ik02NSw2MGgxMWw0LDhWNTJsLTQtOGgtMTFWMjB2NDB6IiBmaWxsPSIjYWFhIi8+PC9zdmc+';
const IMG_QIYAM = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAsMjBDMjcuOSwyMCwxMCwzNy45LDEwLDYwYzAsNS41LDIuMiwxMC41LDUuOSwxNC4xbDEuNSwzLjUgNS4yLTIuN2MyLjgtMS41LDUuOS0yLjMsOS4xLTIuM2gxNi42YzMuMiwwLDYuMywwLjgsOS4xLDIuM2w1LjIsMi43LDEuNS0zLjVjMy43LTMuNiw1LjktOC42LDUuOS0xNC4xQzkwLDM3LjksNzIuMSwyMCw1MCwyMFoiIGZpbGw9IiNjY2MiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIxMiIgZmlsbD0iI2FhYSIvPjxwYXRoIGQ9Ik0zNSw4NWw1LDVoMTBsNS01di0xMEgzNVY4NXoiIGZpbGw9IiNjY2MiLz48cGF0aCBkPSJNNDAsNjVoMjB2MTBIMzBWNTlMNDAsNjV6IiBmaWxsPSIjYWFhIi8+PC9zdmc+';
const IMG_RUKU = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNzAsNDVjMC0xMS05LTIwLTIwLTIwcy0yMCw5LTIwLDIwYzAsNS41LDIuMiwxMC41LDUuOSwxNC4xbDEuNSwzLjUgNS4yLTIuN2MyLjgtMS41LDUuOS0yLjMsOS4xLTIuM2g1LjljMy4yLDAsNi4zLDAuOCw5LjEsMi4zbDUuMiwyLjcsMS41LTMuNWMzLjctMy42LDUuOS04LjYsNS45LTE0LjFaIiBmaWxsPSIjY2NjIi8+PGNpcmNsZSBjeD0iNzAiIGN5PSI0NSIgcj0iMTIiIGZpbGw9IiNhYWEiLz48cGF0aCBkPSJNNDUsODFsMy4yLTYuNGw2LjQtMy4yaDkuNmwxMS4yLDExLjJ2OS42bC0xMS4yLDQuOEg1NmwzLjItOS42aC0xMS4yTDQ1LDgxek02NSw1MGwtNS01aC0xMGwtNSw1djEwaDIwVjUweiIgZmlsbD0iI2FhYSIvPjxwYXRoIGQ9Ik0yMCw5MGg0MHY1SDIwVjkweiIgZmlsbD0iI2NjYyIvPjwvc3ZnPg==';
const IMG_QAWMAH = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAsMjBDMjcuOSwyMCwxMCwzNy45LDEwLDYwYzAsNS41LDIuMiwxMC41LDUuOSwxNC4xbDEuNSwzLjUgNS4yLTIuN2MyLjgtMS41LDUuOS0yLjMsOS4xLTIuM2gxNi42YzMuMiwwLDYuMywwLjgsOS4xLDIuM2w1LjIsMi43LDEuNS0zLjVjMy43LTMuNiw1LjktOC42LDUuOS0xNC4xQzkwLDM3LjksNzIuMSwyMCw1MCwyMFoiIGZpbGw9IiNjY2MiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1IiByPSIxMiIgZmlsbD0iI2FhYSIvPjxwYXRoIGQ9Ik0zNSw4NWw1LDVoMTBsNS01di0xMEgzNVY4NXoiIGZpbGw9IiNjY2MiLz48cGF0aCBkPSJNMzUsNjBIMjVsLTUsNWgxMHYxMEgxNVY2MGgxMFY1MEgzMFY0MGgxMFYyMEgzNkwzNSw2MHoiIGZpbGw9IiNhYWEiLz48cGF0aCBkPSJNNjUsNjBINzVsNSw1SDY1VjYwSDgwVjYwaC0xMHYxMEg4MFY2MEg3MFY1MGg1VjQwaC01VjIwSDY1bC01LDBWNjB6IiBmaWxsPSIjYWFhIi8+PC9zdmc+';
const IMG_SUJUD = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTUsNjVjMC01LjUsMi4yLTEwLjUsNS45LTE0LjFsMS41LTMuNWw1LjItMi43YzIuOC0xLjUsNS45LTIuMyw5LjEtMi4zaDE2LjZjMTIuMSwwLDIyLDkuOSwyMiwzMGMwLDExLTksMjAtMjAsMjBzLTIwLTktMjAtMjBaIiBmaWxsPSIjY2NjIi8+PGNpcmNsZSBjeD0iOTAiIGN5PSI4MCIgcj0iMTIiIGZpbGw9IiNhYWEiLz48cGF0aCBkPSJNNDUsODhsMy4yLTYuNGw2LjQtMy4yaDkuNmwxMS4yLDExLjJ2OS42bC0xMS4yLDQuOEg1NmwzLjItOS42aC0xMS4yTDQ1LDg4ek0yMCw5NWg2MHY1SDIwVjk1eiIgZmlsbD0iI2NjYyIvPjxwYXRoIGQ9Ik0yNSw2NWg0MHYxMEgyNVY2NXoiIGZpbGw9IiNhYWEiLz48L3N2Zz4=';
const IMG_JALSA = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAsMzBDMjcuOSwzMCwxMCw0Ny45LDEwLDcwYzAsNS41LDIuMiwxMC41LDUuOSwxNC4xbDEuNSwzLjUgNS4yLTIuN2MyLjgtMS41LDUuOS0yLjMsOS4xLTIuM2gxNi42YzMuMiwwLDYuMywwLjgsOS4xLDIuM2w1LjIsMi43LDEuNS0zLjVjMy43LTMuNiw1LjktOC42LDUuOS0xNC4xQzkwLDQ3LjksNzIuMSwzMCw1MCwzMFoiIGZpbGw9IiNjY2MiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjU1IiByPSIxMiIgZmlsbD0iI2FhYSIvPjxwYXRoIGQ9Ik0zMCw5MGgxMHY1SDMwVjkwem0yMCwwaDEwdjVINTBWOTB6TTMwLDgwaDQwdjVIMzBWODB6IiBmaWxsPSIjY2NjIi8+PHBhdGggZD0iTTM1LDcwaDMwdjVIMzVWNzB6IiBmaWxsPSIjYWFhIi8+PC9zdmc+';
const IMG_TASHAHHUD = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAsMzBDMjcuOSwzMCwxMCw0Ny45LDEwLDcwYzAsNS41LDIuMiwxMC41LDUuOSwxNC4xbDEuNSwzLjUgNS4yLTIuN2MyLjgtMS41LDUuOS0yLjMsOS4xLTIuM2gxNi42YzMuMiwwLDYuMywwLjgsOS4xLDIuM2w1LjIsMi43LDEuNS0zLjVjMy43LTMuNiw1LjktOC42LDUuOS0xNC4xQzkwLDQ3LjksNzIuMSwzMCw1MCwzMFoiIGZpbGw9IiNjY2MiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjU1IiByPSIxMiIgZmlsbD0iI2FhYSIvPjxwYXRoIGQ9Ik0zMCw5MGgxMHY1SDMwVjkwem0yMCwwaDEwdjVINTBWOTB6TTMwLDgwaDQwdjVIMzBWODB6IiBmaWxsPSIjY2NjIi8+PHBhdGggZD0iTTM1LDcwaDE1djVIMzVWNzB6IiBmaWxsPSIjYWFhIi8+PHBhdGggZD0iTTU1LDY1djEwaDVsNS01VjYwTDYwLDYwSDU1djV6IiBmaWxsPSIjYWFhIi8+PC9zdmc+';
const IMG_TASLIM = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAsMzBDMjcuOSwzMCwxMCw0Ny45LDEwLDcwYzAsNS41LDIuMiwxMC41LDUuOSwxNC4xbDEuNSwzLjUgNS4yLTIuN2MyLjgtMS41LDUuOS0yLjMsOS4xLTIuM2gxNi42YzMuMiwwLDYuMywwLjgsOS4xLDIuM2w1LjIsMi43LDEuNS0zLjVjMy43LTMuNiw1LjktOC42LDUuOS0xNC4xQzkwLDQ3LjksNzIuMSwzMCw1MCwzMFoiIGZpbGw9IiNjY2MiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjU1IiByPSIxMiIgZmlsbD0iI2FhYSIvPjxwYXRoIGQ9Ik0zMCw5MGgxMHY1SDMwVjkwem0yMCwwaDEwdjVINTBWOTB6TTMwLDgwaDQwdjVIMzBWODB6IiBmaWxsPSIjY2NjIi8+PHBhdGggZD0iTTM1LDcwaDMwdjVIMzVWNzB6IiBmaWxsPSIjYWFhIi8+PHBhdGggZD0iTTgwLDUwYTEwLDEwLDAsMSwxLTIwLDAsMTAsMTAsMCwxLDEsMjAsMHptLTMwLDVhMTAsMTAsMCwxLDEtMjAsMCwxMCwxMCwwLDEsMSwyMCwweiIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMC4yIi8+PC9zdmc+';


export const SALAT_GUIDES: Record<string, SalatGuide> = {
    '2 Rakat (Fajr/Sunnah)': {
        title: 'How to Perform a 2 Rakat Prayer',
        introduction: 'This guide covers the steps for a 2 Rakat (unit) prayer, such as Fajr, or Sunnah prayers. Follow each step carefully to ensure your prayer is correct.',
        steps: [
            { step: 1, instruction: 'Make Niyyah (Intention): Stand facing the Qibla and make the intention in your heart to pray the specific 2 Rakat prayer (e.g., Fajr).', imageUrl: IMG_NIYYAH },
            { step: 2, instruction: 'Takbir al-Ihram: Raise your hands to your ears and say "Allahu Akbar" (God is the Greatest) to begin the prayer.', imageUrl: IMG_TAKBIR },
            { step: 3, instruction: 'Qiyam (Standing): Place your right hand over your left on your chest. Recite Surah Al-Fatihah, followed by another short Surah or some verses from the Quran.', imageUrl: IMG_QIYAM },
            { step: 4, instruction: 'Ruku (Bowing): Say "Allahu Akbar" and bow down, placing your hands on your knees. Keep your back straight and say "Subhana Rabbiyal Adheem" (Glory be to my Lord, the Almighty) three times.', imageUrl: IMG_RUKU },
            { step: 5, instruction: 'Qawmah (Standing from Bowing): Rise from bowing and say "Sami Allahu liman hamidah" (God hears those who praise Him). Then say "Rabbana wa lakal hamd" (Our Lord, and to You is all praise).', imageUrl: IMG_QAWMAH },
            { step: 6, instruction: 'First Sujud (Prostration): Say "Allahu Akbar" and go into prostration. Your forehead, nose, palms, knees, and toes should touch the ground. Say "Subhana Rabbiyal A\'la" (Glory be to my Lord, the Most High) three times.', imageUrl: IMG_SUJUD },
            { step: 7, instruction: 'Jalsa (Sitting): Say "Allahu Akbar" and rise to a sitting position. Sit on your left foot with your right foot upright.', imageUrl: IMG_JALSA },
            { step: 8, instruction: 'Second Sujud: Say "Allahu Akbar" and perform a second prostration just like the first.', imageUrl: IMG_SUJUD },
            { step: 9, instruction: 'Stand for Second Rakat: Say "Allahu Akbar" and rise for the second Rakat. Repeat steps 3 to 8.', imageUrl: IMG_QIYAM },
            { step: 10, instruction: 'Tashahhud (Sitting): After the second prostration of the second Rakat, remain seated and recite the Tashahhud.', imageUrl: IMG_TASHAHHUD },
            { step: 11, instruction: 'Taslim (Salutation): Turn your face to the right and say "Assalamu Alaikum wa Rahmatullah" (Peace and mercy of God be upon you), then turn to the left and repeat the same.', imageUrl: IMG_TASLIM },
        ],
    },
    '3 Rakat (Maghrib)': {
        title: 'How to Perform a 3 Rakat Prayer',
        introduction: 'This is the guide for the 3 Rakat Maghrib prayer. It is similar to a 2 Rakat prayer, but with an additional Rakat.',
        steps: [
             { step: 1, instruction: 'Perform the first two Rakats exactly as described in the "2 Rakat Prayer" guide (Steps 1-9).', imageUrl: IMG_QIYAM },
             { step: 2, instruction: 'First Tashahhud: After the second prostration of the second Rakat, you will sit and recite only the first part of the Tashahhud.', imageUrl: IMG_TASHAHHUD },
             { step: 3, instruction: 'Stand for Third Rakat: Say "Allahu Akbar" and rise for the third Rakat. Place your hands on your chest.', imageUrl: IMG_QIYAM },
             { step: 4, instruction: 'Recite Al-Fatihah Only: In the third Rakat, you only recite Surah Al-Fatihah quietly.', imageUrl: IMG_QIYAM },
             { step: 5, instruction: 'Perform Ruku and Sujud: Perform the Ruku, Qawmah, and two Sujuds as you did in the previous Rakats.', imageUrl: IMG_RUKU },
             { step: 6, instruction: 'Final Tashahhud: After the second prostration, sit for the final Tashahhud and recite it completely, followed by sending blessings upon the Prophet (Salawat).', imageUrl: IMG_TASHAHHUD },
             { step: 7, instruction: 'Taslim: Complete the prayer with the Taslim to the right and left.', imageUrl: IMG_TASLIM },
        ],
    },
    '4 Rakat (Dhuhr/Asr/Isha)': {
        title: 'How to Perform a 4 Rakat Prayer',
        introduction: 'This guide is for the 4 Rakat Fardh prayers: Dhuhr, Asr, and Isha. It builds upon the 2 and 3 Rakat prayer structures.',
        steps: [
            { step: 1, instruction: 'Perform the first two Rakats exactly as described in the "2 Rakat Prayer" guide (Steps 1-9).', imageUrl: IMG_QIYAM },
            { step: 2, instruction: 'First Tashahhud: After the second prostration of the second Rakat, sit and recite the first part of the Tashahhud.', imageUrl: IMG_TASHAHHUD },
            { step: 3, instruction: 'Stand for Third Rakat: Say "Allahu Akbar" and rise for the third Rakat.', imageUrl: IMG_QIYAM },
            { step: 4, instruction: 'Third Rakat: Recite only Surah Al-Fatihah, then perform Ruku and two Sujuds.', imageUrl: IMG_RUKU },
            { step: 5, instruction: 'Stand for Fourth Rakat: Say "Allahu Akbar" and rise for the fourth Rakat.', imageUrl: IMG_QIYAM },
            { step: 6, instruction: 'Fourth Rakat: Recite only Surah Al-Fatihah, then perform Ruku and two Sujuds.', imageUrl: IMG_SUJUD },
            { step: 7, instruction: 'Final Tashahhud: After the second prostration of the fourth Rakat, sit for the complete Tashahhud and Salawat.', imageUrl: IMG_TASHAHHUD },
            { step: 8, instruction: 'Taslim: Conclude the prayer with the Taslim to the right and left.', imageUrl: IMG_TASLIM },
        ],
    },
    'Eid Salat': {
        title: 'How to Perform Eid Prayer',
        introduction: 'Eid prayer is offered on the mornings of Eid al-Fitr and Eid al-Adha. It consists of two Rakats with extra Takbirs.',
        steps: [
            { step: 1, instruction: 'Niyyah and First Takbir: Make the intention for Eid prayer. The Imam will say "Allahu Akbar" to start. Follow him.', imageUrl: IMG_NIYYAH },
            { step: 2, instruction: 'Extra Takbirs (First Rakat): After the opening supplication, there will be 7 extra Takbirs. Raise your hands for each one. After the 7th Takbir, the Imam will recite Al-Fatihah and another Surah aloud.', imageUrl: IMG_TAKBIR },
            { step: 3, instruction: 'Complete First Rakat: The rest of the first Rakat is performed as usual with Ruku and two Sujuds.', imageUrl: IMG_RUKU },
            { step: 4, instruction: 'Extra Takbirs (Second Rakat): In the second Rakat, after rising from Sujud, there will be 5 extra Takbirs before the Imam recites Al-Fatihah. Raise your hands for each.', imageUrl: IMG_TAKBIR },
            { step: 5, instruction: 'Complete Second Rakat: The rest of the second Rakat is performed as usual.', imageUrl: IMG_QIYAM },
            { step: 6, instruction: 'Tashahhud and Taslim: After the second prostration, sit for the Tashahhud and conclude the prayer with Taslim.', imageUrl: IMG_TASHAHHUD },
            { step: 7, instruction: 'Listen to the Khutbah (Sermon): After the prayer, it is Sunnah to stay and listen to the Eid sermon delivered by the Imam.', imageUrl: IMG_JALSA },
        ]
    }
};