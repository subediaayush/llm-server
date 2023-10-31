# https://gpt4all.io/index.html

import sys
import os
from gpt4all import GPT4All

output_path = sys.argv[-1].replace('"', '')
prompt = sys.argv[-2]

print('prompt:', prompt)

model = GPT4All("orca-mini-3b-gguf2-q4_0.gguf")
output = prompt + ' ' + model.generate(prompt, max_tokens=30)
print('obtained output ', output)
print('writing to directory ', output_path + '\output.txt')
ou = os.open(output_path + '\output.txt', os.O_WRONLY | os.O_CREAT | os.O_TRUNC)
os.write(ou, output.encode())
os.close(ou)