# https://huggingface.co/facebook/detr-resnet-50

import sys
from transformers import DetrImageProcessor, DetrForObjectDetection
import torch
from PIL import Image
import requests
import os

input_file = sys.argv[-2]
output_path = sys.argv[-1]

image = Image.open(input_file).convert("RGB")

# you can specify the revision tag if you don't want the timm dependency
processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-50", revision="no_timm")
model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-50", revision="no_timm")

inputs = processor(images=image, return_tensors="pt")
outputs = model(**inputs)

# convert outputs (bounding boxes and class logits) to COCO API
# let's only keep detections with score > 0.9
target_sizes = torch.tensor([image.size[::-1]])
results = processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.9)[0]

labels = []
for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
    labels.append(model.config.id2label[label.item()])
    box = [round(i, 2) for i in box.tolist()]
    print(
            f"Detected {model.config.id2label[label.item()]} with confidence "
            f"{round(score.item(), 3)} at location {box}"
    )

ou = os.open(output_path + '\output.txt', os.O_WRONLY | os.O_CREAT)
os.write(ou, str(labels).encode())
os.close(ou)

