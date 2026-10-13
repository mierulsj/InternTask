/**
 * Exploria Spelling Bee - Robust Audio Pronunciation Service
 * 
 * Solves browser-specific SpeechSynthesis failures (e.g. Chrome/macOS cancel bugs,
 * garbage collection bugs, paused speech bugs, and autoplay blocks) by combining:
 * 1. High-fidelity native English audio dictionary stream (Youdao / Oxford phonetics MP3)
 * 2. Hardened Web Speech API with GC persistence and resume() protection
 * 3. Secondary Google Translate TTS audio fallback
 */

let activeAudioElement = null;
let activeUtterance = null;
let voicesLoaded = false;
let englishVoices = [];

// Initialize voices eagerly if available
if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const updateVoices = () => {
        try {
            const all = window.speechSynthesis.getVoices() || [];
            englishVoices = all.filter(
                (v) => v.lang && (v.lang.startsWith("en") || v.lang.includes("US") || v.lang.includes("GB"))
            );
            voicesLoaded = true;
        } catch {
            // Ignore
        }
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
    }
}

/**
 * Prime audio context / user gesture unlock
 */
export function primeAudio() {
    if (typeof window === "undefined") return;
    try {
        if ("speechSynthesis" in window && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
    } catch {
        // Ignore
    }
}

/**
 * Stop any ongoing pronunciation audio
 */
export function stopSpellingAudio() {
    if (typeof window === "undefined") return;

    if (activeAudioElement) {
        try {
            activeAudioElement.pause();
            activeAudioElement.currentTime = 0;
            activeAudioElement.src = "";
        } catch {
            // Ignore
        }
        activeAudioElement = null;
    }

    if ("speechSynthesis" in window) {
        try {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        } catch {
            // Ignore
        }
    }

    activeUtterance = null;
    if (typeof window !== "undefined") {
        window.__activeSpellingUtterance = null;
    }
}

/**
 * Play English word pronunciation using high-reliability multi-tier pipeline.
 * 
 * @param {string} word - The English word to pronounce
 * @param {object} options - Callbacks { onStart, onEnd, onError }
 * @returns {Promise<boolean>}
 */
export function playSpellingAudio(word, { onStart, onEnd, onError } = {}) {
    if (typeof window === "undefined" || !word) {
        if (onEnd) onEnd();
        return Promise.resolve(false);
    }

    const cleanWord = String(word).trim().toLowerCase();
    if (!cleanWord) {
        if (onEnd) onEnd();
        return Promise.resolve(false);
    }

    // Stop previous audio without breaking next
    stopSpellingAudio();

    let hasEnded = false;
    const triggerStart = () => {
        if (onStart) onStart();
    };
    const triggerEnd = () => {
        if (hasEnded) return;
        hasEnded = true;
        if (onEnd) onEnd();
    };
    const triggerError = (err) => {
        if (hasEnded) return;
        hasEnded = true;
        if (onError) onError(err);
        else if (onEnd) onEnd();
    };

    // Tier 1: Authentic Audio stream (Native US English pronunciation MP3)
    const tryAudioElement = (audioUrl, fallbackFn) => {
        try {
            const audio = new Audio(audioUrl);
            activeAudioElement = audio;
            audio.preload = "auto";

            let playStarted = false;
            const timeoutTimer = setTimeout(() => {
                if (!playStarted) {
                    audio.pause();
                    audio.src = "";
                    fallbackFn();
                }
            }, 2500);

            audio.onplay = () => {
                playStarted = true;
                clearTimeout(timeoutTimer);
                triggerStart();
            };

            audio.onended = () => {
                clearTimeout(timeoutTimer);
                activeAudioElement = null;
                triggerEnd();
            };

            audio.onerror = () => {
                clearTimeout(timeoutTimer);
                activeAudioElement = null;
                fallbackFn();
            };

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    clearTimeout(timeoutTimer);
                    activeAudioElement = null;
                    fallbackFn();
                });
            }
        } catch (e) {
            fallbackFn();
        }
    };

    // Tier 2: Hardened Web Speech API
    const tryWebSpeech = () => {
        if (!("speechSynthesis" in window)) {
            tryGoogleTTS();
            return;
        }

        try {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }

            const utter = new SpeechSynthesisUtterance(cleanWord);
            utter.lang = "en-US";
            utter.rate = 0.88;

            // Pick English voice if available
            if (englishVoices.length > 0) {
                const preferredVoice = englishVoices.find((v) => v.lang === "en-US" || v.name.includes("US")) || englishVoices[0];
                if (preferredVoice) utter.voice = preferredVoice;
            }

            // CRITICAL: Retain in module & window scope to avoid V8 garbage-collection mid-utterance
            activeUtterance = utter;
            window.__activeSpellingUtterance = utter;

            let speechTimeout = setTimeout(() => {
                // If speech synthesis hung or failed to start
                tryGoogleTTS();
            }, 1500);

            utter.onstart = () => {
                clearTimeout(speechTimeout);
                triggerStart();
            };

            utter.onend = () => {
                clearTimeout(speechTimeout);
                activeUtterance = null;
                window.__activeSpellingUtterance = null;
                triggerEnd();
            };

            utter.onerror = (e) => {
                clearTimeout(speechTimeout);
                activeUtterance = null;
                window.__activeSpellingUtterance = null;
                // If interrupted by new speak, don't cascade error
                if (e.error === "interrupted" || e.error === "canceled") {
                    triggerEnd();
                } else {
                    tryGoogleTTS();
                }
            };

            window.speechSynthesis.speak(utter);
        } catch {
            tryGoogleTTS();
        }
    };

    // Tier 3: Secondary Google TTS stream
    const tryGoogleTTS = () => {
        try {
            const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(cleanWord)}`;
            const audio = new Audio(googleUrl);
            activeAudioElement = audio;

            audio.onplay = () => triggerStart();
            audio.onended = () => {
                activeAudioElement = null;
                triggerEnd();
            };
            audio.onerror = () => {
                activeAudioElement = null;
                triggerError(new Error("Unable to play pronunciation"));
            };

            const p = audio.play();
            if (p !== undefined) {
                p.catch((err) => triggerError(err));
            }
        } catch (err) {
            triggerError(err);
        }
    };

    // Start with Tier 1 (Native audio MP3), falling back to Web Speech API, then Google TTS
    const primaryUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanWord)}&type=2`;
    tryAudioElement(primaryUrl, tryWebSpeech);

    return Promise.resolve(true);
}
