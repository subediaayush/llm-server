import open_clip
import torch
from PIL import Image
import os
import sys

model, _, transform = open_clip.create_model_and_transforms(
  model_name="coca_ViT-L-14",
  pretrained="mscoco_finetuned_laion2B-s13B-b90k"
)

args = sys.argv

input_file = args[-2].replace('"', '')
output_path = args[-1].replace('"', '')

print("Loading " + input_file)

im = Image.open(input_file).convert("RGB")
im = transform(im).unsqueeze(0)

with torch.no_grad(), torch.cuda.amp.autocast():
  generated = model.generate(im)

output = open_clip.decode(generated[0]).split("<end_of_text>")[0].replace("<start_of_text>", "")
print("obtained output " + output)
print("writing to file " + output_path + "\output.txt")

ou = os.open(output_path + '\output.txt', os.O_WRONLY | os.O_CREAT | os.O_TRUNC)
os.write(ou, output.encode())
os.close(ou)
