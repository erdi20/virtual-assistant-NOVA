from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

# Path ke aplikasi
APP_PATHS = {
    "word": r"C:\Program Files\Microsoft Office\Office16\WINWORD.EXE",
    "excel": r"C:\Program Files\Microsoft Office\Office16\EXCEL.EXE",
    "powerpoint": r"C:\Program Files\Microsoft Office\Office16\POWERPNT.EXE",
}

@app.route('/open-app', methods=['POST'])
def open_app():
    try:
        data = request.json
        app_name = data.get("app")  # Nama aplikasi yang diminta
        
        if app_name in APP_PATHS:
            app_path = APP_PATHS[app_name]
            
            # Periksa apakah path aplikasi ada
            if os.path.exists(app_path):
                subprocess.Popen([app_path], shell=True)
                return jsonify({"status": "success", "message": f"{app_name.capitalize()} berhasil dibuka"})
            else:
                return jsonify({"status": "error", "message": f"File {app_name} tidak ditemukan di path yang diberikan"})
        else:
            return jsonify({"status": "error", "message": "Aplikasi tidak dikenal"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5500, debug=True)
