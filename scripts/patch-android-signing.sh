#!/usr/bin/env bash
set -euo pipefail
FILE="android/app/build.gradle"
if [[ ! -f "$FILE" ]]; then
  echo "Missing $FILE — run expo prebuild first"
  exit 1
fi

python3 << 'PY'
from pathlib import Path
import re
path = Path("android/app/build.gradle")
text = path.read_text()
# Match release { ... } at buildTypes nesting depth (non-greedy enough for typical Expo template)
pattern = re.compile(r"(release\s*\{)(.*?)(\n\s*\})", re.S)

def repl(m):
    head, body, tail = m.group(1), m.group(2), m.group(3)
    if "signingConfig" in body:
        body = re.sub(r"signingConfig\s+signingConfigs\.\w+", "signingConfig signingConfigs.debug", body)
    else:
        body = "\n            signingConfig signingConfigs.debug" + body
    return head + body + tail

new_text, n = pattern.subn(repl, text, count=1)
if n == 0:
    print("WARN: release block not found; leaving gradle as-is")
else:
    path.write_text(new_text)
    print("Patched release signingConfig → debug")
PY
