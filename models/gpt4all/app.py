# https://gpt4all.io/index.html

import sys
import os
from gpt4all import GPT4All

output_path = sys.argv[-1]
prompt = sys.argv[-2]

model = GPT4All("orca-mini-3b-gguf2-q4_0.gguf")
output = model.generate(prompt, max_tokens=30)
ou = os.open(output_path + '\output.txt', os.O_WRONLY | os.O_CREAT)
os.write(ou, output.encode())
os.close(ou)

print(output)