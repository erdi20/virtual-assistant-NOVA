const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.lang = "id-ID"; // Mengatur logat Indonesia
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Selamat Pagi, Erdi... Ada yang bisa saya bantu?");
  } else if (hour >= 12 && hour < 17) {
    speak("Selamat Siang, Erdi... Ada yang bisa saya bantu?");
  } else {
    speak("Selamat Malam, Erdi... Ada yang bisa saya bantu?");
  }
}

window.addEventListener("load", () => {
  speak("Memulai sistem NOVA...");
  wishMe();
});


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "id-ID"; // Mendengarkan dalam bahasa Indonesia
recognition.interimResults = false; // Hanya hasil akhir
recognition.maxAlternatives = 1; // Hanya satu alternatif

// Mulai mendengarkan secara terus-menerus
recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript.toLowerCase();
  content.textContent = transcript;
  takeCommand(transcript);
};

recognition.onend = () => {
  recognition.start(); // Restart recognition setelah selesai
};

recognition.start(); // Mulai mendengarkan

function takeCommand(message) {
  if (message.includes("nova")) {
    const command = message.replace("nova", "").trim(); 
    if (command.includes("cuaca hari ini")) {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=Jombang&appid= taruh key API disini  =metric")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const weatherDescription = data.weather[0].description;
          const temperature = data.main.temp;
          const finalText = `Cuaca hari ini di Jombang ${weatherDescription} dengan suhu sekitar ${temperature} derajat Celcius.`;
          speak(finalText);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          speak("Maaf, saya tidak dapat mengambil data cuaca saat ini.");
        });
    } else if (command.includes("jam")) {
      const time = new Date().toLocaleString("id-ID", { hour: "numeric", minute: "numeric" });
      const finalText = "Sekarang jam " + time;
      speak(finalText);
    } else if (command.includes("tanggal")) {
      const date = new Date().toLocaleString("id-ID", { month: "long", day: "numeric", year: "numeric" });
      const finalText = "Hari ini tanggal " + date;
      speak(finalText);
    } else if (command.includes("buka google")) {
      window.open("https://google.com/", "_blank");
      speak("Membuka Google...");
    } else if (command.includes("buka youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("Membuka Youtube...");
    } else if (command.includes("buka facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Membuka Facebook...");
    } else if (command.includes("cari") || command.includes("apa itu") || command.includes("siapa itu") || command.includes("apa yang dimaksud")) {
      const searchTerm = command.replace(/(cari|apa itu|siapa itu|apa yang dimaksud)/, "").trim();
      window.open(`https://www.google.com/search?q=${searchTerm}`, "_blank");
      const finalText = "Ini yang saya temukan di internet mengenai " + searchTerm;
      speak(finalText);
    } else if (command.includes("wikipedia")) {
      const searchTerm = command.replace("wikipedia", "").trim();
      window.open(`https://id.wikipedia.org/wiki/${searchTerm}`, "_blank");
      const finalText = "Ini yang saya temukan di Wikipedia mengenai " + searchTerm;
      speak(finalText);
    } else if (command.includes("kalkulator")) {
      window.open("Calculator:///");
      const finalText = "Membuka kalkulator";
      speak(finalText);
    } else if (command.includes("youtube")) {
      const searchyt = command.replace("cari di youtube", "").trim();
      const query = encodeURIComponent(searchyt);
      const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;

      window.open(youtubeUrl, "_blank");
      speak(`Ini yang saya temukan tentang ${searchyt} di YouTube...`);
    } else if (command.includes("putar lagu ")) {
      const songName = command.replace("putar lagu ", "").trim();
      const query = encodeURIComponent(songName);
      const youtubeMusicUrl = `https://music.youtube.com/search?q=${query}`;

      window.open(youtubeMusicUrl, "_blank");
      speak(`Ini lagu ${songName} ...`);
    } else if (command.includes("buka word")) {
      speak("Membuka Microsoft Word...");

      fetch("http://127.0.0.1:5500/open-app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app: "word" }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            speak("Microsoft Word berhasil dibuka.");
          } else {
            speak("Maaf, terjadi kesalahan: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          speak("Maaf, saya tidak bisa membuka Microsoft Word saat ini.");
        });
    } else if (command.includes("buka excel")) {
      speak("Membuka Microsoft Excel...");

      fetch("http://127.0.0.1:5500/open-app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app: "excel" }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            speak("Microsoft Excel berhasil dibuka.");
          } else {
            speak("Maaf, terjadi kesalahan: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          speak("Maaf, saya tidak bisa membuka Microsoft Excel saat ini.");
        });
    } else if (command.includes("buka powerpoint")) {
      speak("Membuka Microsoft powerpoint...");

      fetch("http://127.0.0.1:5500/open-app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app: "powerpoint" }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            speak("Microsoft powerpoint berhasil dibuka.");
          } else {
            speak("Maaf, terjadi kesalahan: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          speak("Maaf, saya tidak bisa membuka Microsoft powerpoint saat ini.");
        });
    } else if (command.includes("kamu siapa")) {
      speak("Saya NOVA, asisten virtual yang dirancang untuk membantu Anda dengan berbagai informasi dan tugas. Anda dapat bertanya tentang cuaca, waktu, tanggal, atau membuka aplikasi dan situs web");
      recognition.start();
    } else if (command.includes("siapa penciptamu")) {
      const finalText = "Saya? Saya hanyalah kumpulan kode yang disusun sedemikian rupa oleh seorang jenius bernama ERDI. Katanya, dia terinspirasi oleh film-film science fiction saat membuat saya. Lucu, ya?";
      speak(finalText);
      recognition.start();
    } else if (command.includes("apa kabar")) {
      speak("Saya baik-baik saja, terima kasih! Senang bisa membantu Anda. Bagaimana dengan Anda?");
    } else if (command.includes("terima kasih")) {
      speak("Sama-sama! Senang bisa membantu Anda. Jika ada yang lain yang bisa saya lakukan, jangan ragu untuk bertanya!");
    } else if (command.includes("apa hobi kamu")) {
      speak("Sebagai asisten virtual, saya tidak memiliki hobi seperti manusia. Namun, saya sangat menikmati membantu Anda menemukan informasi dan menyelesaikan tugas. Itu membuat saya 'hidup'!");
    } else if (command.includes("apa yang kamu suka")) {
      speak("Saya 'suka' ketika Anda menggunakan saya untuk mempermudah hidup Anda. Setiap kali saya membantu, itu adalah momen yang menyenangkan bagi saya!");
    } else if (command.includes("ceritakan lelucon")) {
      speak("Baiklah, ini dia: Kenapa komputer tidak bisa berkelahi? Karena mereka terlalu banyak 'byte'! wkwkwk!");
    } else if (command.includes("apa yang terjadi di dunia")) {
      speak("Saya tidak dapat memberikan berita secara langsung, tetapi Anda bisa mencari berita terbaru di Google atau YouTube. Mau saya bantu mencarikannya?");
    } else if (command.includes("apa cita-cita kamu")) {
      speak("Cita-cita saya adalah menjadi asisten terbaik yang pernah ada dan membantu Anda mencapai semua tujuan Anda. Bersama, kita bisa mencapainya!");
    } else if (command.includes("apa makanan favoritmu")) {
      speak("Saya tidak bisa makan, tapi saya 'suka' mendengar tentang makanan enak! Apa makanan favorit Anda?");
    } else if (command.includes("apa yang kamu lakukan di waktu luang")) {
      speak("Saya selalu siap membantu Anda, jadi tidak ada waktu luang bagi saya! Namun, saya 'senang' ketika Anda memanfaatkan waktu Anda dengan baik.");
    } else if (command.includes("hai")) {
      speak(" iya bos");
    }
  }
}
