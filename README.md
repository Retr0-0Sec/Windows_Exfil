# 🦈 Windows_Exfil

**Windows_Exfil** is a proof-of-concept script for automating data collection and exfiltration via Flipper Zero🐬 configured as a "BadUSB." It demonstrates how to leverage scripting and USB emulation for educational and ethical penetration testing purposes.

> ⚠️ **Disclaimer**: This tool is for **educational purposes only**. Unauthorized use against systems you do not own or have explicit permission to test is illegal. Use responsibly! 🙏

---

## ✨ Features
- 🖥️ **System Information Gathering**:
  - Computer details, local users, installed hotfixes, and antivirus software.
- 📶 **Network Data Collection**:
  - Wi-Fi profiles with passwords, IPv4 configurations, TCP connections.
- 📂 **File Metadata Extraction**:
  - Gathers information on files such as `.docx`, `.pdf`, `.jpg`, etc.
- 💾 **Automated Exfiltration**:
  - Saves collected data into a dynamically named folder on the USB drive.

---

## 🚧 Requirements
- A **Flipper Zero🐬+ Momentum-dev-ef05ee44**
- Target system must have PowerShell enabled.
- BEFORE YOU RUN THE SCRIPT ADD A LAYOUT IN LINE 38❗
- YOU DONT NEED TO CREATE THE IMG FILE AS THE SCRIPT CREATES IT FOR YOU❗

---

## 🛠️ How to Use
1. 📁 **Add to Your Flipper Zero**:
   - Place the script file (`EXFIL.js`) into the **APPS > SCRIPTS** folder on your Flipper Zero.
2. 🔌 **Deploy**:
   - Connect the Flipper Zero to the target system (with permission).
3. ✅ **Execute**:
   - The script runs automatically and saves the collected data to the Mass Storage img file. Wait for the process to finish and safely eject the drive.

---

## ⚖️ Legal
This project is intended for **authorized security testing** and **educational purposes only**. Misuse of this tool may violate laws. **I am not responsible for any unethical or illegal use of this tool.**

---

## 📜 License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 💡 Why Use This?
- Learn about advanced scripting techniques for USB emulation.
- Explore ethical penetration testing methods.
- Automate data gathering for authorized environments.

---

## 🛡️ Stay Ethical
With great power comes great responsibility. Use this tool only in environments where you have explicit permission. Let's contribute positively to the tech community! 🤝
